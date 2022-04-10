/*
nodejs 是单进程的，因此无法使用多核cpu，node提供了child_process模块来实现子进程。从而会实现一个广义上的多进程模式，通过child_process模块，可以实现一个主进程，多个子进程模式，主进程叫做master进程，子进程叫做worker(工作)进程，
在子进程中不仅可以调用其他node程序，我们还可以调用非node程序及shell命令等。执行完子进程后，我们可以以流或回调形式返回给主进程。
child_process提供了4个方法，用于创建子进程，这四个方法分别为 spawn, execFile, exec 和 fork. 所有的方法都是异步的。
该如上4个方法的区别是什么？
spawn: 子进程中执行的是非node程序，提供一组参数后，执行的结果以流的形式返回。
execFile: 子进程中执行的是非node程序, 提供一组参数后，执行的结果以回调的形式返回。
exec: 子进程执行的是非node程序，提供一串shell命令，执行结果后以回调的形式返回，它与 execFile不同的是，exec可以直接执行一串shell命令。
fork: 子进程执行的是node程序，提供一组参数后，执行的结果以流的形式返回，它与spawn不同的是，fork生成的子进程只能执行node应用。
2.1 execFile 和 exec
该两个方法的相同点和不同点如下：
相同点：执行的都是非node应用，且执行的结果以回调函数的形式返回。
不同点：execFile执行的是一个应用，exec执行的是一段shell命令。
*/

// const cp = require('child_process');
// // 通过exec来实现：
// console.log(cp);
// cp.exec('echo hello world', function(err, res) {
//   console.log(res);
// });

// const child_process = require('child_process');
// for(var i=0; i<3; i++) {
//     var workerProcess = child_process.exec('node worker.js '+i, function (error, stdout, stderr) {
//         if (error) {
//             console.log(error.stack);
//             console.log('Error code: '+error.code);
//             console.log('Signal received: '+error.signal);
//         }
//         console.log('stdout: ' + stdout);
//         console.log('stderr: ' + stderr);
//     });
//     workerProcess.on('exit', function (code) {
//         console.log('子进程已退出，退出码 '+code);
//     });   
// }

//通过execFile实现
/*cp.execFile('echo', ['hello', 'world'], function(err, res) {
    console.log(res);
});*/

//通过spawn实现
// const child_process = require('child_process');
// for(var i=0; i<3; i++) {
//    var workerProcess = child_process.spawn('node', ['worker.js', i]);
//    workerProcess.stdout.on('data', function (data) {
//       console.log('stdout: ' + data);
//    });
//    workerProcess.stderr.on('data', function (data) {
//       console.log('stderr: ' + data);
//    });
//    workerProcess.on('close', function (code) {
//       console.log('子进程已退出，退出码 '+code);
//    });
// }
/*fork
在node中提供了fork方法，通过使用fork方法在单独的进程中执行node程序，通过使用fork新建worker进程，
上下文都复制主进程。并且通过父子之间的通信，子进程接收父进程的信息，并执行子进程后结果信息返回给父进程。降低了大数据运行的压力。
现在我们来理解下使用fork()方法来创建子进程，fork()方法只需要指定要执行的javascript文件模块，即可创建Node的子进程。
下面我们是简单的hello world的demo，master进程根据cpu的数量来创建出相应数量的worker进程，worker进程利用进程ID来标记*/
const childProcess = require('child_process');
const cpuNum = require('os').cpus().length;//获取cpu核数
for (let i = 0; i < cpuNum; ++i) {
  childProcess.fork('./worker.js');
}
console.log('Master: xxxx');

//父子进程之间的通信
// const childProcess = require('child_process');
// const worker = childProcess.fork('./worker.js');
// // 主进程向子进程发送消息
// worker.send('Hello World');
// // 监听子进程发送过来的消息
// worker.on('message', (msg) => {
//   console.log('Received message from worker:' + msg);
// });

//Master实现对Worker的请求进行分发
/*如上只是简单的父进程和子进程进行通信的demo实列，现在我们继续来看一个更复杂一点的demo。我们知道master进程最主要是创建子进程，
及对子进程进行管理和分配，而子进程最主要做的事情是处理具体的请求及业务。
进程通信除了使用到上面的send()方法，发送一些普通对象以外，我们还可以发送句柄，什么是句柄呢，句柄是一种引用，可以用来标识资源。
比如通过句柄可以标识一个socket对象等。我们可以利用该句柄实现请求的分发。
现在我们通过master进程来创建一个TCP服务器来监听一些特定的端口，master进程会收到客户端的请求，我们会得到一个socket对象，
通过这个socket对象就可以和客户端进行通信，从而我们可以处理客户端的请求。
比如如下demo实列，master创建TCP服务器并且监听8989端口，收到该请求后会将请求分发给worker处理，worker收到master发来的socket以后，
通过socket对客户端的响应*/
// const childProcess = require('child_process');
// const net = require('net');
// // 获取cpu的数量
// const cpuNum = require('os').cpus().length;
// let workers = [];
// let cur = 0;
// for (let i = 0; i < cpuNum; ++i) {
//   workers.push(childProcess.fork('./worker.js'));
//   console.log('worker process-' + workers[i].pid);
// }
// // 创建TCP服务器
// const tcpServer = net.createServer();
// /*
//  服务器收到请求后分发给工作进程去处理
// */
// tcpServer.on('connection', (socket) => {
//   workers[cur].send('socket', socket);
//   cur = Number.parseInt((cur + 1) % cpuNum);
// });
// tcpServer.listen(8989, () => {
//   console.log('Tcp Server: 127.0.0.8989');
// });

// Worker监听同一个端口
/*我们之前已经实现了句柄可以发送普通对象及socket对象外，我们还可以通过句柄的方式发送一个server对象。
我们在master进程中创建一个TCP服务器，将服务器对象直接发送给worker进程，让worker进程去监听端口并处理请求。
因此master进程和worker进程就会监听了相同的端口了。当我们的客户端发送请求时候，我们的master进程和worker进程都可以监听到，
我们知道我们的master进程它是不会处理具体的业务的。
因此需要使用worker进程去处理具体的事情了。因此请求都会被worker进程处理了。
那么在这种模式下，主进程和worker进程都可以监听到相同的端口，当网络请求到来的时候，会进行抢占式调度，
只有一个worker进程会抢到链接然后进行服务，由于是抢占式调度，可以理解为谁先来谁先处理的模式，
因此就不能保证每个worker进程都能负载均衡的问题。下面是一个demo如下：*/
// const childProcess = require('child_process');
// const net = require('net');
// // 获取cpu的数量
// const cpuNum = require('os').cpus().length;
// let workers = [];
// let cur = 0;
// for (let i = 0; i < cpuNum; ++i) {
//   workers.push(childProcess.fork('./worker.js'));
//   console.log('worker process-' + workers[i].pid);
// }
// // 创建TCP服务器
// const tcpServer = net.createServer();
// tcpServer.listen(8989, () => {
//   console.log('Tcp Server: 127.0.0.8989');
//   // 监听端口后将服务器句柄发送给worker进程
//   for (let i = 0; i < cpuNum; ++i) {
//     workers[i].send('tcpServer', tcpServer);
//   }
//   // 关闭master线程的端口监听
//   tcpServer.close();
// });

// 实现进程重启
/*worker进程可能会因为其他的原因导致异常而退出，为了提高集群的稳定性，我们的master进程需要监听每个worker进程的存活状态，
当我们的任何一个worker进程退出之后，master进程能监听到并且能够重启新的子进程。在我们的Node中，子进程退出时候，
我们可以在父进程中使用exit事件就能监听到。如果触发了该事件，就可以断定为子进程已经退出了，因此我们就可以在该事件内部做出对应的处理，
比如说重启子进程等操作。
下面是我们上面监听同一个端口模式下的代码demo，但是我们增加了进程重启的功能。进程重启时，
我们的master进程需要重新传递tcpServer对象给新的worker进程。但是master进程是不能被关闭的。否则的话，句柄将为空，无法正常传递。*/
/**
 * 当运行的时候可以去后台活动监视器关闭进程，如果出某某某进程关闭创建就代表成功
 */
// const childProcess = require('child_process');
// const net = require('net');
// // 获取cpu的数量
// const cpuNum = require('os').cpus().length;
// let workers = [];
// let cur = 0;
// for (let i = 0; i < cpuNum; ++i) {
//   workers.push(childProcess.fork('./worker.js'));
//   console.log('worker process-' + workers[i].pid);
// }
// // 创建TCP服务器
// const tcpServer = net.createServer();
// /*
//  服务器收到请求后分发给工作进程去处理
// */
// tcpServer.on('connection', (socket) => {
//   workers[cur].send('socket', socket);
//   cur = Number.parseInt((cur + 1) % cpuNum);
// });
// tcpServer.listen(8989, () => {
//   console.log('Tcp Server: 127.0.0.8989');
//   // 监听端口后将服务器句柄发送给worker进程
//   for (let i = 0; i < cpuNum; ++i) {
//     workers[i].send('tcpServer', tcpServer);
//     // 监听工作进程退出事件
//     workers[i].on('exit', ((i) => {
//       return () => {
//         console.log('worker-' + workers[i].pid + ' exited');
//         workers[i] = childProcess.fork('./worker.js');
//         console.log('Create worker-' + workers[i].pid);
//         workers[i].send('tcpServer', tcpServer);
//       }
//     })(i));
//   }
//   // 不能关闭master线程的，否则的话，句柄将为空，无法正常传递。
//   // tcpServer.close();
// });

// 理解cluster集群
/*如上我们了解了使用 child_process实现node集群操作，现在我们来学习使用cluster模块实现多进程服务充分利用我们的cpu资源以外，
还能够帮我们更好地进行进程管理。我们使用cluster模块来实现我们上面同样的功能，代码如下*/
// const cluster = require('cluster');
// if (cluster.isMaster) {
//   const cpuNum = require('os').cpus().length;
//   for (let i = 0; i < cpuNum; ++i) {
//     cluster.fork();
//   }
//   // 创建进程完成后输出信息
//   cluster.on('online', (worker) => {
//     console.log('Create worker-' + worker.process.pid);
//   });
//   // 监听子进程退出后重启事件
//   cluster.on('exit', (worker, code, signal) => {
//     console.log('[Master] worker ' + worker.process.pid + ' died with code:' + code + ', and' + signal);
//     cluster.fork(); // 重启子进程
//   });
// } else {
//   const net = require('net');
//   net.createServer().on('connection', (socket) => {
//     setTimeout(() => {
//       socket.end('Request handled by worker-' + process.pid);
//     }, 10)
//   }).listen(8989)
// }
/*如上代码，我们可以使用 cluster.isMaster 来判断是主进程还是子进程，如果是主进程的话，
我们使用cluster创建了和cpu数量相同的worker进程，并且通过监听 cluster中的online事件来判断worker是否创建成功。并且使用了 cluster监听了 
exit事件，当worker进程退出后，会触发master进程中cluster的online事件来判断worker是否创建成功。 */