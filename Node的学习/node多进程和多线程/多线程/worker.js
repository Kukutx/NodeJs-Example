// const { Worker, isMainThread } = require("worker_threads");
// if (isMainThread) {
//   // 主线程处理逻辑
//   const worker = new Worker(__filename);
// } else {
//   // worker 线程处理逻辑
//   console.log("1111");
// }

// const { parentPort } = require("worker_threads");
// const { randomBytes } = require("crypto");
// parentPort.on("message", size => {
//   const response = {
//     error: null,
//     data: null
// };
// randomBytes(size, (err, buf) => {
//     if (err) {
//       response.err = err;
//     } else {
//       response.data = buf;
//     }
//     parentPort.postMessage(response);
//   });
// });

// test.js 测试调用
// const random = require("./thread");
// (async () => {
//   console.time("Worker mode");
//   const result = await random(32);
//   result.toString("hex");
//   console.timeEnd("Worker mode");
// })().catch(console.error);


const { randomBytes } = require("crypto");
console.time("Normal mode");
randomBytes(32, (err, buf) => {
  if (err) {
    console.error(err);
  } else {
    buf.toString("hex");
  }
  console.timeEnd("Normal mode");
});