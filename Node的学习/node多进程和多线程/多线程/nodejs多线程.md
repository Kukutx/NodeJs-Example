# [nodejs多线程](https://www.cnblogs.com/mengff/p/12815198.html)

Nodejs一直以单线程异步IO著称，擅长IO密集型操作，不擅长CPU密集型操作。但是，新版的Nodejs，在不断弥补这方面的短板。

在 Node 10.5.0，官方给出了一个实验性质的模块 worker_threads 给 Node 提供了真正的多线程能力

在 Node.js 12.11.0，worker_threads 模块正式进入稳定版

至此，Nodejs算是了真正的多线程能力。进程是资源分配的最小单位，线程是CPU调度的最小单位。

**1. Nodejs多线程种类**

Node.js 中有三类线程 (child_process 和 cluster 的实现均为进程)

\1. event loop的主线程

\2. libuv的异步I/O线程池

\3. worker_threads的线程

**2. worker_threads的作用**

worker_thread 相比进程的方案，他们与父线程公用一个进程 ID，可轻松与另一个线程共享内存（ArrayBuffer 或 SharedArrayBuffer），从而避免了额外的序列化和反序列化开销。

但是 Worker Threads 对于 I/O 密集型操作是没有太大的帮助的，因为异步的 I/O 操作比 worker 更有效率，Wokers 的主要作用是用于提升对于 CPU 密集型操作的性能。

**3. worker_threads的线程**

**3.1 线程的基本用法**

worker_threads也是master-work模型，有主线程和工作线程之分。

```js
const { Worker, isMainThread, parentPort, workerData } = require('worker_threads');

if (isMainThread) {
  module.exports = function parseJSAsync(script) {
    return new Promise((resolve, reject) => {
      const worker = new Worker(__filename, {
        workerData: script
      });
      worker.on('message', resolve);
      worker.on('error', reject);
      worker.on('exit', (code) => {
        if (code !== 0)
          reject(new Error(`工作线程使用退出码 ${code} 停止`));
      });
    });
  };
} 
else {
  const { parse } = require('一些 js 解析库');
  const script = workerData;
  parentPort.postMessage(parse(script));
}
```

**3.2 线程间的通信**

**1. 共享内存**

与child_process和cluster的进程不同，线程之间可以共享内存。使用ArrayBuffer或SharedArrayBuffer

**2. parentPort**

主要用于主子线程通信，通过经典的 on('message'), postMessage形式

```js
if (isMainThread) {
  const worker = new Worker(__filename);
  worker.once('message', (message) => {
    console.log(message);  // Prints 'Hello, world!'.
  });
  worker.postMessage('Hello, world!');
} else {
  // When a message from the parent thread is received, send it back:
  parentPort.once('message', (message) => {
    parentPort.postMessage(message);
  });
}
```

**3. MessageChannel**

与 Web 工作线程和 cluster 模块一样，可以通过线程间的消息传递来实现双向通信。 在内部，一个 Worker 具有一对内置的 MessagePort，在创建该 Worker 时它们已经相互关联。 虽然父端的 MessagePort 对象没有直接公开，但其功能是通过父线程的 Worker 对象上的 worker.postMessage() 和 worker.on('message') 事件公开的。
要创建自定义的消息传递通道（建议使用默认的全局通道，因为这样可以促进关联点的分离），用户可以在任一线程上创建一个 MessageChannel 对象，并将该 MessageChannel 上的 MessagePort 中的一个通过预先存在的通道传给另一个线程，例如全局的通道。

```js
const assert = require('assert');
const {
  Worker, MessageChannel, MessagePort, isMainThread, parentPort
} = require('worker_threads');
if (isMainThread) {
  const worker = new Worker(__filename);
  const subChannel = new MessageChannel();
  worker.postMessage({ hereIsYourPort: subChannel.port1 }, [subChannel.port1]);
  subChannel.port2.on('message', (value) => {
    console.log('接收到:', value);
  });
} else {
  parentPort.once('message', (value) => {
    assert(value.hereIsYourPort instanceof MessagePort);
    value.hereIsYourPort.postMessage('工作线程正在发送此消息');
    value.hereIsYourPort.close();
  });
}
```