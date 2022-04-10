// const {
//     Worker, isMainThread, parentPort, workerData
//   } = require('worker_threads');
  
//   if (isMainThread) {
//     module.exports = function parseJSAsync(script) {
//       return new Promise((resolve, reject) => {
//         const worker = new Worker(__filename, {
//           workerData: script
//         });
//         worker.on('message', resolve);
//         worker.on('error', reject);
//         worker.on('exit', (code) => {
//           if (code !== 0)
//             reject(new Error(`工作线程使用退出码 ${code} 停止`));
//         });
//       });
//     };
//   } else {
//     const { parse } = require('一些 js 解析库');
//     const script = workerData;
//     parentPort.postMessage(parse(script));
//   }

//worker.isMainThread
/*如果此代码不在 Worker 线程内运行，则为 true。 */
// const { Worker, isMainThread } = require('worker_threads');
// if (isMainThread) {
//   // 这会在工作线程实例中重新加载当前文件。
//   new Worker(__filename);
//   console.log(isMainThread);
// } else {
//   console.log('在工作线程中');
//   console.log(isMainThread);  // 打印 'false'。
// }

// worker.parentPort
/*线程之间的通信
如果当前线程为Worker工作线程, 该MessagePort端口作用于与主线交换信息。
通过该端口parentPort.postMessage()发送的消息在主线程中将可以通过worker.on('message')接收。
主线程中通过worker.postMessage()发送的消息将可以在工作线程中通过parentPort.on('message')接收。 
*/
// const { Worker, isMainThread, parentPort } = require('worker_threads');
// if (isMainThread) {
//   const worker = new Worker(__filename);
//   worker.once('message', (message) => {
//     console.log(message);  // 打印 'Hello, world!'.
//   });
//   worker.postMessage('Hello, world!');// 主进程发送给子线程
// } else {
//   // When a message from the parent thread is received, send it back:
//   parentPort.once('message', (message) => {
//     parentPort.postMessage("子线程发送给主线程的："+message);
//     console.log(message);
//   });
// }

//worker.receiveMessageOnPort(port)
/*从给定的MessagePort接收一条消息。 如果没有可用消息，返回undefined，否则返回一个具有单个message属性的对象，
该属性包含消息有效负载，对应于MessagePort队列中最早的消息。*/
// const { MessageChannel, receiveMessageOnPort } = require('worker_threads');
// const { port1, port2 } = new MessageChannel();
// port1.postMessage({ hello: 'world' });

// console.log(receiveMessageOnPort(port2));
// // Prints: { message: { hello: 'world' } }
// console.log(receiveMessageOnPort(port2));
// // Prints: undefined

//worker.SHARE_ENV
//传递给构造函数Worker选项对象env属性的值，用以指定主线程与工作线程将可共享环境变量的读写。
// const { Worker, SHARE_ENV } = require('worker_threads');
// new Worker('process.env.SET_IN_WORKER = "foo"', { eval: true, env: SHARE_ENV })
// .on('exit', () => {
//     console.log(process.env.SET_IN_WORKER);  // 打印 'foo'.
// });

// worker.threadId
/*当前线程的ID，同时在工作线程上，每个worker实例也都有唯一的ID。*/

// worker.workerData
/*（工作线程中可用）指代通过主线程中传递过来的数据。 它可以是任意的JavaScript值，通过主线程构造函数中的选项对象的workerData传递。
 这个数据类似Web Worker中postMessage()机制，它是拷贝传递的（所以如果是较大数据里，不建议通过此方法）。 */
// const { Worker, isMainThread, workerData } = require('worker_threads');
// if (isMainThread) {
//   const worker = new Worker(__filename, { workerData: 'Hello, world!' });
// } else {
//   console.log(workerData);  // Prints 'Hello, world!'.
// }

//MessageChannel 类
/*worker.MessageChannel类的实例表示一个异步的双向通信通道。 MessageChannel没有自己的方法。
新的MessageChannel（）产生一个具有port1和port2属性的对象，该属性引用链接的MessagePort实例。*/
// const { MessageChannel } = require('worker_threads');
// const { port1, port2 } = new MessageChannel();
// port1.on('message', (message) => console.log('received', message));
// port2.postMessage({ foo: 'bar' });
// // Prints: received { foo: 'bar' } from the `port1.on('message')` listener

//'close' 事件
/*一旦通道的任一侧断开连接，就会发出“关闭”事件。*/
// const { MessageChannel } = require('worker_threads');
// const { port1, port2 } = new MessageChannel();
// // Prints:
// //   foobar
// //   closed!
// port2.on('message', (message) => console.log(message));
// port2.on('close', () => console.log('closed!'));
// port1.postMessage('foobar');
// port1.close();

//port.postMessage(value[, transferList])
/*发送数据，将JavaScript值发送到此通道的接收端。 值将以与HTML结构化克隆算法兼容的方式进行传输。 */
// const { MessageChannel } = require('worker_threads');
// const { port1, port2 } = new MessageChannel();
// port1.on('message', (message) => console.log(message));
// const circularData = {};
// circularData.foo = circularData;
// // Prints: { foo: [Circular] }
// port2.postMessage(circularData);
/*transferList may be a list of ArrayBuffer, MessagePort and FileHandle objects. After transferring,
they will not be usable on the sending side of the channel anymore (even if they are not contained in value).
Unlike with child processes, transferring handles such as network sockets is currently not supported.
If value contains SharedArrayBuffer instances, those will be accessible from either thread. They cannot be listed in transferList.
value may still contain ArrayBuffer instances that are not in transferList; in that case, the underlying memory is copied rather than moved. 
*/
// const { MessageChannel } = require('worker_threads');
// const { port1, port2 } = new MessageChannel();
// port1.on('message', (message) => console.log(message));
// const uint8Array = new Uint8Array([ 1, 2, 3, 4 ]);
// // 这发布了`uint8Array`的副本：
// port2.postMessage(uint8Array);
// // 这不会复制数据，但会导致`uint8Array`无法使用：
// port2.postMessage(uint8Array, [ uint8Array.buffer ]);
// // 可以从两个目录访问“ sharedUint8Array”的内存。
// // 原件和`.on（'message'）`收到的副本：
// const sharedUint8Array = new Uint8Array(new SharedArrayBuffer(4));
// port2.postMessage(sharedUint8Array);
// // 这会将新创建的消息端口传输到接收器。
// // 例如，这可用于在两个之间建立通信通道。
// // 多个`Worker`线程是同一父线程的子代。
// const otherChannel = new MessageChannel();
// port2.postMessage({ port: otherChannel.port1 }, [ otherChannel.port1 ]);

//Worker 类
/*Worker 类代表一个独立的 JavaScript 执行线程。 大多数 Node.js API 都在其中可用。
工作线程环境中的显着差异是：
父线程可以重定向 process.stdin、process.stdout 和 process.stderr。
require('worker_threads').isMainThread 属性被设置为 false。
require('worker_threads').parentPort 消息端口可用。
process.exit() 不会停止整个程序，仅停止单个线程，且 process.abort() 不可用。
process.chdir() 和设置群组或用户标识的 process 方法不可用。
process.env 是父线程的环境变量的副本，除非另外指定。 对一个副本的更改将会在其他线程中不可见，
并且对原生插件也不可见（除非 worker.SHARE_ENV 作为 env 选项传给 Worker 的构造函数）。
process.title 无法被修改。
信号将不会通过 process.on('...') 传递。
调用 worker.terminate() 可能会随时停止执行。
无法访问父进程的 IPC 通道。
不支持 trace_events 模块。
如果原生插件满足特定条件，则只能从多个线程中加载它们。
可以在其他 Worker 实例中创建 Worker 实例。
与 Web 工作线程和 cluster 模块一样，可以通过线程间的消息传递来实现双向通信。 在内部，一个 Worker 具有一对内置的 MessagePort，
在创建该 Worker 时它们已经相互关联。 虽然父端的 MessagePort 对象没有直接公开，但其功能是通过父线程的 Worker 对象上的 worker.postMessage() 和 worker.on('message') 事件公开的。
要创建自定义的消息传递通道（建议使用默认的全局通道，因为这样可以促进关联点的分离），用户可以在任一线程上创建一个 MessageChannel 
对象，并将该 MessageChannel 上的 MessagePort 中的一个通过预先存在的通道传给另一个线程，例如全局的通道。
有关如何传递消息以及可以通过线程屏障成功地传输哪类 JavaScript 值的更多信息，请参见 port.postMessage()。*/

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