// 例子：UDP服务端
var PORT = 33333;
var HOST = '127.0.0.1';
/*使用socket端口的对象的unref方法允许应用程序的正常退出*/
var dgram = require('dgram');
var server = dgram.createSocket('udp4');//udp4为指定UDP通信的协议类型

server.on('listening',(msg, rinfo)=> {
    var address = server.address();
    console.log('已收到客户端发送的数据：'+msg);
    console.log('客户端地址信息为&j',rinfo);
    console.log('UDP Server listening on ' + address.address + ":" + address.port);
    server.send(rinfo.port,rinfo.address);
    //当客户端关闭10秒后关闭服务器
    setTimeout(function () {
        server.unref();
    },10000);
});

server.on('message', function (message, remote) {
    console.log(remote.address + ':' + remote.port +' - ' + message);
});

server.bind(PORT, HOST);

// server.bind(3000,'localhost',function () {
//     //bind方法中也可以不写回调函数，单独监听listening事件
//     var address = server.address();
//     console.log('服务器开始监听。地址信息为&j',address);
// });








/*2 广播*/ 
// var dgram = require('dgram');
// var server = dgram.createSocket('udp4');
// var port = 33333;

// server.on('message', function(message, rinfo){
//     console.log('server got message from: ' + rinfo.address + ':' + rinfo.port);
// });

// server.bind(port);