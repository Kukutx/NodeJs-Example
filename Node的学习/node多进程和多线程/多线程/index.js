// const { Worker } = require("worker_threads");
// const worker = new Worker(`${__dirname}/worker.js`);

// //如果要向 worker 线程传递数据的话，可以通过事件通知的方式来传递数据
// worker.postMessage(value);
// // 相应的主线程接收数据则可以通过 worker.on("message", ...) 接收数据
// worker.on("message", resp => {
//     // ...
// });

// 相应的 Worker 线程收发数据和主线程基本一致，不过这里的事件对象换成了 parentPort，而这个对象可以直接从 worker 包获取
// 那么 worker 线程可以使用 parentPort.on("message", ...) 接收数据
// const { parentPort } = require("worker_threads");
// // receive from main thread
// parentPort.on("message", buf => {
//     // post to main thread
//     parentPort.postMessage(buf);
// });

// // 主线程除了可以直接 postMessage 传递数据，另外也可以创建 worker 的时候传递。
// const worker = new Worker(__filename, {
//   workerData: "data"
// });
// // 相应的 worker 线程接受则换成了 workerData
// const { workerData } = require("worker_threads");

/*最基本的 API 介绍完毕后就可以写一个简单的 demo ，从 worker 线程中获取随机数据。
index.js 暴露随机数据接口*/
// const { Worker } = require("worker_threads");
// const random = (size /** number */) => {
//   return new Promise((resolve, reject) => {
//     const worker = new Worker(`${__dirname}/worker.js`);
//     // copy
//     worker.postMessage(size);
//     worker.on("message", (resp /** { error: Error; data: Buffer } */) => {
//       const { data, error } = resp;
//       if (error) {
//         reject(err);
//       } else {
//         resolve(data);
//       }
//       // exit thread
//       worker.terminate();
//     });
//     // The 'error' event is emitted if the worker thread throws an uncaught exception.
//     // In that case, the worker will be terminated.
//     worker.on("error", (err /* Error*/) => {
//       reject(err);
//       // exit thread
//       worker.terminate();
//     });
//   });
// };
// module.exports = random;



// 线程池 Demo
const EventEmitter = require("events");
const { Worker } = require("worker_threads");
// 线程状态
const WorkerStates = {
  TODO: 0,
  READY: 1,
  DOING: 2,
  OFF: 3
};
// 线程池状态
const WorkerPoolStates = {
  TODO: 0,
  READY: 1,
  OFF: 2
};
class SHA256 {
  constructor() {
    this.size = 10;
    this.workers = [];
    this.state = WorkerPoolStates.TODO;
  }
  // 每次使用线程池都必须运行
  // `await init()` 初始化
  init() {
    return new Promise((resolve, reject) => {
      if (this.state == WorkerPoolStates.READY) {
        resolve();
        return;
      }

      let successCount = 0;
      let failedCount = 0;

      const event = new EventEmitter();
      event.on("spawning", (isSuccess, ErrorReason) => {
        if (isSuccess) {
          ++successCount;
        } else {
          ++failedCount;
        }

        // 如果所有线程都创建失败，那么直接抛出
        if (failedCount == this.size) {
          this.state = WorkerPoolStates.OFF;
          reject(new Error(ErrorReason));
        }
        // 至少一个线程创建成功即可
        else if (successCount != 0 && successCount + failedCount == this.size) {
          this.state = WorkerPoolStates.READY;
          resolve();
        }
      });

      for (let i = 0; i < this.size; ++i) {
        const worker = new Worker(`${__dirname}/worker.js`);
        this.workers.push({
          state: WorkerStates.TODO,
          instance: worker
        });

        // 当线程执行代码后悔触发 online 事件
        worker.on(
          "online",
          (index => () => {
            // 线程执行完代码后再更改线程状态
            this.workers[index].state = WorkerStates.READY;
            this.workers[index].instance.removeAllListeners();
            event.emit("spawning", true);
          })(i)
        );

        worker.on(
          "error",
          (index => ErrorReason => {
            this.workers[index].state = WorkerStates.OFF;
            this.workers[index].instance.removeAllListeners();
            event.emit("spawning", false, ErrorReason);
          })(i)
        );
      }
    });
  }
  digest(data = "") {
    return new Promise((resolve, reject) => {
      if (this.state != WorkerPoolStates.READY) {
        reject(new Error("Create threads failed or not ready yet"));
      }

      let curAvaWorker = null;
      let curAvaWorkerIndex = 0;

      // 这里有 bug
      // 如果所有线程都是空闲的返回结果了
      // 处理方式应该使用 promise 进行回调
      for (let i = 0; i < this.size; ++i) {
        const curWorker = this.workers[i];
        if (curWorker.state == WorkerStates.OFF) {
          recreate(i);
        }
        if (curAvaWorker == null && curWorker.state == WorkerStates.READY) {
          curWorker.state = WorkerStates.DOING;
          curAvaWorker = curWorker.instance;
          curAvaWorkerIndex = i;
        }
      }

      if (curAvaWorker == null) {
        return;
      }

      curAvaWorker.on("message", msg => {
        this.free(curAvaWorkerIndex, false);
        if (!msg.error) {
          resolve(msg.data);
          return;
        }
        reject(msg.error);
      });

      curAvaWorker.once("error", error => {
        this.free(curAvaWorkerIndex, true);
        reject(error);
      });

      curAvaWorker.postMessage(data);
    });
  }
  // 重新恢复线程
  recreate(i) {
    const worker = new Worker(`${__dirname}/worker.js`);
    const deadWorker = this.workers[i];
    deadWorker.state = WorkerStates.TODO;
    deadWorker.instance = worker;

    worker.once("online", () =>
      process.nextTick(() => {
        deadWorker.state = WorkerStates.READY;
        worker.removeAllListeners();
      })
    );

    worker.once("error", error => {
      console.error(error);
      deadWorker.state = WorkerStates.OFF;
      worker.removeAllListeners();
    });
  }
  // 切换线程状态
  free(i, hasError) {
    this.workers[i].status = hasError ? WorkerStates.READY : WorkerStates.OFF;
    this.workers[i].instance.removeAllListeners();
  }
  // 停止所有线程
  terminate() {
    this.state = WorkerPoolStates.OFF;
    return new Promise((resolve, reject) => {
      for (let i = 0; i < this.size; ++i) {
        this.workers[i].instance.terminate(err => {
          if (!err && i == this.size) {
            resolve();
          } else {
            reject(err);
          }
        });
      }
    });
  }
}
module.exports = new SHA256();