const net = require("net");
var server = net.createServer((socket)=>
{   
    /*1 */
    // socket.write("你好，客户端");
    // console.log("一个新的客户端进行连接"); 
    // socket.on("data",(data)=>
    // {
    //     // console.log("接收到来自客户端端的数据:",data.toString());
    //     // socket.write("客户端："+data);
    //     //管道
    //     // socket.pipe(process.stdout);
    // });
    // socket.on("end",function(data)
    // {
    //     console.log("客户端断开连接");
    // });
    // socket.write("Welcome client: " + " \r\n");
    // socket.pipe(socket);
    //目前还不知道这个是干啥用的好像是长连接
    socket.setKeepAlive(true,6000); //1 min = 60000 milliseconds.
    socket.setEncoding('utf8');   //设置utf8编码
    server.maxConnections = 30; // 设置最大连接数，超过数量不能连接
    server.getConnections((err,count)=>{
        socket.write(`欢迎到来，当前用户 ${count},总容纳 ${server.maxConnections}\r\n`);
        console.log(err)
    })
    //缓存客户端信息到 client中，以客户的ip+port作为key值，nickname默认为匿名，并保存回话socket。
    let client = {}
    let key = socket.remoteAddress +':' + socket.remotePort;
    client[key] = {nickname: '匿名',socket};  
    console.log(key);  

    socket.on('data', (chunk)=> {
        chunk = chunk.replace(/\r\n/,'')
        let [command, target, content] = chunk.split(':');  //"2:3:4:5".split(":")	//将返回["2", "3", "4", "5"]
        
        console.log(command);
        // console.log(target);
        // console.log(content);
        
        
        
        switch (command) {
            case 'l':  //查看用户列表
                showList(socket);
                break;
            case 's':  //私聊
                charTo(target,content, client[key].nickname);
                break;
            case 'r': //重命名
                rename(key, target);
                break;
            case 'b': //想其他用户广播
                broadcast(key, target, client[key].nickname);
                break;
            default:
                console.log("请输入以上选项");
                break;
        }
    })

});

server.listen(8000,()=>
{
    console.log("启动服务端，端口为:8000");
})

function showList(socket) {
    let users = []
    Object.values(client).forEach(user => {
        users.push(user.nickname)
    })
socket.write(`当前用户列表：\r\n ${users.join('\r\n')} \r\n`);
}

function charTo(target, content, source) {
    let targetSocket;
    Object.values(client).forEach(user => {
        if(user.nickname === target) {
            targetSocket = user.socket
        }
    })
    targetSocket.write(`${source}：${content}\r\n`)
}

function rename(key, content) {
    client[key].nickname = content;
    client[key].socket.write(`重命名为: ${content}\r\n`)
}

function broadcast(key, content, nickname) {
    Object.keys(client).forEach(user => {
        if(user !== key) {
            client[user].socket.write(`${nickname}: ${content}\r\n`)
        }
    })
}










// server.close(); // 如果触发close事件就不会再接收新的请求了
// server.unref(); // 也表示关闭 ，没有客户端连接会自己关闭(不会触发close事件)
/*sockets.forEach(function(otherSocket) {
            if (otherSocket !== socket) {
                otherSocket.write(data);
            }
        });
 */
 /*socket.remoteAddress 属性，获取客户端的 IP 地址。

socket.remotePort 属性，获取客户端的端口号。

socket.setEncoding 方法，设置编码格式。

socket.write 方法，向客户端写入内容，写入内容的值只能为字符串或 Buffer。

socket.end 方法，断开对应客户端的连接，并返回信息，返回内容的值只能为字符串或 Buffer，soket 可以监听 end 事件，当关闭客户端时触发并执行回调。

socket.destroy 方法，用于销毁当前客户端对应的 socket 对象。

server.maxConnections 属性，是当前服务器允许的最大连接数，数值类型，当连接数超过设定值时，新的客户端将无法连接服务器。

server.getConnetions 方法，获取当前的连接数，参数为回调函数，回调函数有两个参数 err（错误）和 count（当前连接数），异步执行。

server.close 方法，关闭服务器，并没有真的关闭服务器，而是不允许新的连接，直到所有连接都断开后自动关闭服务器。

server.unref 方法，关闭服务器的另一种形式，不阻止新的连接，当所有连接都断开时自动关闭服务器。

server.listen 方法，监听端口号，支持传入回调，在启动服务后执行。

server 的 close 事件，参数为回调函数，异步执行，当服务器关闭时触发。

server 的 error 事件，参数为回调函数，回调函数的参数为 err（错误对象），异步执行，当启动服务器或服务器运行时出现错误触发。
*/
/*
//pipe方法可以将客户端发送的数据写到文件或其它目标中。
//socket.pipe(destinatin,[options]);
//options.end 设置为false时当客户端结束写操作或关闭后并不会关闭目标对象，还可以继续写入数据


let net = require('net');
let path = require('path');
let ws = require('fs').createWriteStream(path.resolve(__dirname, 'msg.txt'));
let server = net.createServer(function (socket) {
    socket.on('data', function (data) {
        console.log(data);
    });
    socket.pipe(ws, { end: false });
    socket.on('end', function () {
        ws.end('over', function () {
            socket.unpipe(ws);
        });
    });
});




//unpipe
const net = require('net');
const path = require('path');
let file = require('fs').createWriteStream(path.join(__dirname, 'msg.txt'));
let server = net.createServer(function (socket) {
    socket.pipe(file, {
        end: false
    });
    setTimeout(function () {
        file.end('bye bye');
        socket.unpipe(file);
    }, 5000);
    // socket.on('end', function () {
    //     file.end('bye bye');
    // });
});
server.listen(8080);
*/


/*
//pause&resume
//pause可以暂停data事件触发，服务器会把客户端发送的数据暂存在缓存区里

const net = require('net');
const net = require('net');
const path = require('path');
let file = require('fs').createWriteStream(path.join(__dirname, 'msg.txt'));
let server = net.createServer(function (socket) {
    socket.pause();
    setTimeout(function () {
        socket.resume();
        socket.pipe(file);
    }, 10 * 1000);
});
server.listen(8080);


//setTimeout
let net = require('net');
let path = require('path');
let ws = require('fs').createWriteStream(path.resolve(__dirname, 'msg.txt'));
let server = net.createServer(function (socket) {
    socket.setTimeout(5 * 1000);
    socket.pause();
    socket.on('timeout', function () {
        socket.pipe(ws);
    });

    //socket.setTimeout(0);取消超时时间的设置
});
server.listen(8080);
 */

