// 新建一个 Worker
/*通过创建一个 Worker 类的实例，我们获得了一个 Worker。Worker 实例的第一个参数 path 是 Workers 的路径，
第二个参数 data 是这个 Worker 在启动时可以读到的数据。正如你所见，Worker 之间的通信基于事件，
因此我们为事件设置了 Listener 和回调。使用回调是因为 Worker 可以发送不止一个 message。当然，
如果你的 Worker 只会发送一个 message，那么用 Promise.resolve 也是可以的。
 */
// const { Worker } = require('worker_threads');
// const worker = new Worker(path/*路径*/, { data }/*读取的数据 */);
// worker.on('message', msg => { /* ... */ });
// worker.on('error', err => { /* ... */ });
// worker.on('exit', exitcode => { /* ... */ });
// worker.on('online', () => { /* ... */ });
/*Worker 支持监听四种事件：
message：Worker 将数据发送到主线程时就会触发 message 事件
error：Worker 中任何没有被 catch 的 Error 都会触发这一事件，同时 Worker 会被中止
exit：Worker 退出时触发。在 Worker 中 process.exit() 得到的 exitCode 是 0，worker.terminate() 得到的 exitCode 是 1
online：当 Worker 解析完毕开始执行时触发
*/


// 进程间通信
/* 如果需要将数据发送到另一个线程，可以使用 postMessage 方法：
 port.postMessage(data[, transferList]);
 第一个参数是一个被「The structured clone algorithm」复制到另一个线程的对象。一般的，这部分内存会被主线程和 Worker 共用。
*/
//一般最常见的用法是将 Worker 的数据发送到主线程：
// // worker.js
// const { parentPort } = require('worker_threads');
// parentPort.postMessage(data);
// // 同样，通过 parentPort 也可以监听从主线程发过来的信息：
// // worker.js
// const { parentPort } = require('worker_threads');
// parentPort.on('message', data => { /* ... */ });
// // 如果要在 Worker 中使用主线程中 new Worker 时第二个参数传入的数据，应该使用 workerData 属性：
// // worker.js
// const { workerData } = require('worker_threads');


// 实现一个 Worker Pool
/*需要注意的是，创建、执行、销毁一个 Worker 的开销是很大的。频繁创建 Worker 消耗的 CPU 算力很快就会抵消多线程带来的好处，
越来越多的监听器甚至可能会导致 OOM。所以为每一个任务创建一个 Workers 是很不现实的，在实践中应该实现一个 Worker Pool，
在初始化时将会创建 有限数量 的 Worker 并加载单一的 worker.js，主线程通过进程间通信的方法将要执行的任务传给 Worker，
而 Worker 也通过进程间通信的方法将任务的结果回传给主线程，当所有任务完成后，这些 Worker 将会被统一销毁。*/
// 编写一个 WorkerPool 类，初始化时它应该做这些事情：
/*
创建指定数量的 Workers
创建一个任务队列
创建一个 Workers 索引，以及用于追踪他们是否处于激活状态的索引
*/
// 获取当前设备的 CPU 线程数目，作为 numberOfThreads 的默认值。
const { length: cpusLength } = require('os').cpus();

class WorkerPool  {
  constructor(workerPath, numberOfThreads = cpusLength) {
    if (numberOfThreads < 1) {
      throw new Error('Number of threads should be greater or equal than 1!');
    }

    this.workerPath = workerPath;
    this.numberOfThreads = numberOfThreads;

    // 任务队列
    this._queue = [];
    // Worker 索引
    this._workersById = {};
    // Worker 激活状态索引
    this._activeWorkersById = {};

    // 创建 Workers
    for (let i = 0; i < this.numberOfThreads; i++) {
      const worker = new Worker(workerPath);

      this._workersById[i] = worker;
      // 将这些 Worker 设置为未激活状态
      this._activeWorkersById[i] = false;
    }
  }

/*在添加 Worker 执行之前，我们还需要做两件事情，检查是否有空闲的 Worker 用于执行任务、以及 Worker 本身的执行。
首先是检查空闲的 Worker，这个并不难：
*/
getInactiveWorkerId() {
    for (let i = 0; i < this.numberOfThreads; i++) {
      if (!this._activeWorkersById[i]) return i;
    }
    return -1;
}

runWorker(workerId, taskObj) {
    const worker = this._workersById[workerId];
  
    // 当任务执行完毕后执行
    const doAfterTaskIsFinished = () => {
      // 去除所有的 Listener，不然一次次添加不同的 Listener 会 OOM 的
      worker.removeAllListeners('message');
      worker.removeAllListeners('error');
      // 将这个 Worker 设为未激活状态
      this._activeWorkersById[workerId] = false;
  
      if (this._queue.length) {
        // 任务队列非空，使用该 Worker 执行任务队列中第一个任务
        this.runWorker(workerId, this._queue.shift());
      }
    };
  
    // 将这个 Worker 设置为激活状态
    this._activeWorkersById[workerId] = true;
    // 设置两个回调，用于 Worker 的监听器
    const messageCallback = result => {
      taskObj.cb(null, result);
      doAfterTaskIsFinished();
    };
    const errorCallback = error => {
      taskObj.cb(error);
      doAfterTaskIsFinished();
    };
  
    // 为 Worker 添加 'message' 和 'error' 两个 Listener
    worker.once('message', messageCallback);
    worker.once('error', errorCallback);
    // 将数据传给 Worker 供其获取和执行
    worker.postMessage(taskObj.data);
}


run(data) {
    // Promise 是个好东西
    return new Promise((resolve, reject) => {
      // 调用 getInactiveWorkerId() 获取一个空闲的 Worker
      const availableWorkerId = this.getInactiveWorkerId();
  
      const taskObj = {
        data,
        cb: (error, result) => {
          // 虽然 Workers 需要使用 Listener 和 Callback，但这不能阻止我们使用 Promise，对吧？
          // 不，你不能 util.promisify(taskObj) 。人不能，至少不应该。
          if (error) reject(error);
          return resolve(result);
        }
      };
      
      if (availableWorkerId === -1) {
        // 当前没有空闲的 Workers 了，把任务丢进队列里，这样一旦有 Workers 空闲时就会开始执行。
        this._queue.push(taskObj);
        return null;
      }
  
      // 有一个空闲的 Worker，用它执行任务
      this.runWorker(availableWorkerId, taskObj);
    })
  }

destroy(force = false) {
    for (let i = 0; i < this.numberOfThreads; i++) {
      if (this._activeWorkersById[i] && !force) {
        // 通常情况下，不应该在还有 Worker 在执行的时候就销毁它，这一定是什么地方出了问题，所以还是抛个 Error 比较好
        // 不过保留一个 force 参数，总有人用得到的
        throw new Error(`The worker ${i} is still runing!`);
      }

      // 销毁这个 Worker
      this._workersById[i].terminate();
    }
  }
};
module.exports=WorkerPool;



