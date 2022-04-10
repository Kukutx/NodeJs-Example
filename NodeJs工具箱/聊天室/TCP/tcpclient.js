let net = require('net')
const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
//创建一个TCP客户端连接到刚创建的服务器上，该客户端向服务器发送一串消息，并在得到服务器的反馈后关闭连接。

var client = new net.Socket()
let PORT = 8082
let HOST = 'localhost'
// let HOST = '192.168.1.4'
client.connect(PORT, HOST, () => {
	console.log('connect to ' + HOST + ':' + PORT)
	client.write('I am happyGloria.') //建立连接后立即向服务器发送数据，服务器将收到这些数据
})
client.on('data', (data) => {
	console.log('DATA: ' + data)
    rl.question(`我说： `, (data) => {
            client.write(data);
    });
	// client.destroy() // 完全关闭连接,销毁流
})
client.on('close', function () {
	console.log('Connection closed')
})



// var net = require("net");
// var client = net.createConnection({port:9000},()=> {
//     console.log("开始连接服务器");
// });

// const readline = require('readline');
// const rl = readline.createInterface({
//     input: process.stdin,
//     output: process.stdout
// });

// client.write("你好，服务端");

// client.on("data",function(data){

//     // // client.end();
//     client.write("你好，服务端"+"111");

//     // /*输入输出*/

//     // // process.stdin.on('data',(data)=>{
//     // //     client.write(data);
//     // //     // console.log("接收到来自别的客户端端的数据:",data.toString());
//     // // }); 

//     rl.question(`What `, (data) => {
//         client.write(data);
//         // rl.close();          // close the stream
//         /*rl.on('close', () => {
//                 console.log("Goodbye 👋");
//                 process.exit(0);// exit the process
//             });*/
//     });

//     // console.log("接收到服务端的数据:",data.toString());
//     //console.log(data.toString());
// });

// client.on("end",()=>{
//     console.log("客户端断开连接");
// });



// var net = require('net');
// var port = 8000;
// var host = '127.0.0.1';
// var client= new net.Socket();
// //创建socket客户端
// client.setEncoding('binary');
// //连接到服务端
// client.connect(port,host,function(){
//   client.write('hello server');
//   //向端口写入数据到达服务端
// });
// client.on('data',function(data){
//   console.log('from server:'+ data);
//   //得到服务端返回来的数据
// });
// client.on('error',function(error){
// //错误出现之后关闭连接
//   console.log('error:'+error);
//   client.destory();
// });
// client.on('close',function(){
// //正常关闭连接
//   console.log('Connection closed');
// });
