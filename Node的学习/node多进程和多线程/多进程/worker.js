//子进程
// console.log('Worker-' + process.pid + ': Hello world.');
// console.log("进程 " + process.argv[2] + " 执行。" );
//父子进程之间的通信
//接收主进程发来的消息
// process.on('message', (msg) => {
//     console.log('Received message from master:' + msg);
//     // 子进程向主进程发送消息
//     process.send('Hi master.');
// });

//Master实现对Worker的请求进行分发
// 接收主进程发来的消息
// process.on('message', (msg, socket) => {
//     if (msg === 'socket' && socket) {
//       // 利用setTimeout 模拟异步请求
//       setTimeout(() => {
//         socket.end('Request handled by worker-' + process.pid);
//       },100);
//     }
// });

// Worker监听同一个端口
// 接收主进程发来的消息
// process.on('message', (msg, tcpServer) => {
//     if (msg === 'tcpServer' && tcpServer) {
//       tcpServer.on('connection', (socket) => {
//         setTimeout(() => {
//           socket.end('Request handled by worker-' + process.pid);
//         }, 100);
//       })
//     }
// });

// 实现进程重启
// 接收主进程发来的消息
// process.on('message', (msg, tcpServer) => {
//     if (msg === 'tcpServer' && tcpServer) {
//       tcpServer.on('connection', (socket) => {
//         setTimeout(() => {
//           socket.end('Request handled by worker-' + process.pid);
//         }, 100);
//       })
//     }
// });