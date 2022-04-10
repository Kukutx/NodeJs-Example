// // 简单的多线程 demo
// const {
//   isMainThread,
//   parentPort,
//   workerData,
//   threadId,
//   MessageChannel,
//   MessagePort,
//   Worker
// } = require('worker_threads');
// //主线程
// function mainThread() {
//   for (let i = 0; i < 5; i++) {
//     const worker = new Worker(__filename, { workerData: i });   //Worker构造函数创建工作线程实例，workerData工作线程数据

//     console.log(`嘤嘤嘤：${__filename}+${{ workerData: i }}`);
    
//     worker.on('exit', code => { console.log(`main: worker stopped with exit code ${code}`); });
//     worker.on('message', msg => {             //接收数据
//       console.log(`main: receive ${msg}`);           //打印接收的数据
//       worker.postMessage(msg + 1);                  //跟线程之间通信，发送数据
//     });
//   }
// }
// function workerThread() {
//   console.log(`worker: workerDate ${workerData}`);
//   parentPort.on('message', msg => {
//     console.log(`worker: receive ${msg}`);
//     console.log(`threadId: ${threadId}`);           //打印接收的数据
//   }),
//   parentPort.postMessage(workerData);              //发送数据
// }
// //判断是否主线程
// if (isMainThread) {
//   console.log(isMainThread);
//   mainThread();  //主线程
// } else {
//   console.log("嘤嘤嘤");
//   workerThread();  //子线程
// }


// 进程通信的例子
// const assert = require('assert');
// const {
//   Worker,
//   MessageChannel,
//   MessagePort,
//   isMainThread,
//   parentPort
// } = require('worker_threads');
// if (isMainThread) {
//   const worker = new Worker(__filename);
//   const subChannel = new MessageChannel();
//   worker.postMessage({ hereIsYourPort: subChannel.port1 }, [subChannel.port1]);
//   subChannel.port2.on('message', (value) => {
//     console.log('received:', value);
//   });
// } else {
//   parentPort.once('message', (value) => {
//     assert(value.hereIsYourPort instanceof MessagePort);
//     value.hereIsYourPort.postMessage('the worker is sending this');
//     value.hereIsYourPort.close();
//   });
// }

// /*Worker构造函数第一个参数默认是执行的js文件路径，或者当第二个可选参数eval为true时，可以行内执行。
// 按照node文档样例就是下面这样。传递的数据通过第二个参数的workerData传入。在工作线程中，直接取workerData即可。*/
const {
  isMainThread,
  Worker, 
  parentPort, // 表示父进程的 MessagePort 类型的对象，在主线程里为 null
  workerData // 主线程传递过来的数据// 在主线程为null，工作线程中为主线程传递的值 
} = require('worker_threads');
// 主线程
if (isMainThread) {
  const worker = new Worker(__filename, {
    workerData: "q"// 传递的数据，可以是任意合法js值，会深拷贝一份过去
  });
  worker.on('message', (data)=>{
    console.log(data) // 接收工作线程数据并打印
  });
  worker.postMessage('hello') // 向工作线程发送数据
} else {
  // 工作线程
parentPort.postMessage('hello') // 向父线程发送数据
parentPort.on('message', (data)=>{
  console.log(data) // 接收主线程数据并打印
});
}




