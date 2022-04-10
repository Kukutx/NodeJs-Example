// 聊天室server
// 建立一个Socket服务端
const net = require('net');
let util = require('util')
// 用于存储所有的客户端连接
// 键值对集合，用用户名去索引客户端socket
let clients = {};

let server = net.createServer((socket) => {
    server.maxConnections = 30; // 设置最大连接数，超过数量不能连接
    socket.setEncoding('utf-8')
    // 客户端登入
    function signin(clientDataContent) {
        let username = clientDataContent.from;
        if (Object.keys(clients).length) {
            // 如果clients（客户端socket 集合）中有1个以上的成员，广播通知所有人谁谁上线了，除了他本身
            let onlineNotice = {  // 组成通知消息数据格式
                protocol: 'online',
                onlinemaxConnections: server.maxConnections,
                online: username,
                onlineCount: Object.keys(clients).length + 1
            };
            for (let username in clients) {
                if (clients.hasOwnProperty(username)) {
                    let noticeClient = clients[username];
                    noticeClient.write(JSON.stringify(onlineNotice));
                }
            }
        }
        // 将新连接的客户端socket存储于clients
        clients[username] = socket;
        console.log(`欢迎 ${socket.remoteAddress}:${socket.remotePort}【${username}】，加入聊天室，当前在线：${Object.keys(clients).length}`);
    }
    // 广播消息通信
    function broadcast(clientDataContent) {
        // 广播出去消息数据格式 json
        let sendClientData = clientDataContent;
        // 遍历clients对象（for in），给所有的客户端socket广播消息
        for (let username in clients) {
            if (clients.hasOwnProperty(username)) {
                let client = clients[username];
                client.write(JSON.stringify(sendClientData));//将客户端的数据已json格式传输
            }
        }
    }
    // p2p 点对点通信
    function p2p(clientDataContent) {
        let p2pClientData = clientDataContent;
        // 给指定的客户端发送消息
        clients[p2pClientData.to].write(JSON.stringify(p2pClientData));
    }

    //用户验证
    function isSignin(clientDataContent) {
        //判断用户名称是否重名   
        let errerrutente = {
            protocol: 'errutente',
            errute: `您的昵称' ${clientDataContent.from}'被占用了，请您更换新的昵称\r\n`
        };
        if (clients[clientDataContent.from]) {
            socket.write(JSON.stringify(errerrutente));   //要json格式
        } else {
            //获取连接数
            server.getConnections((err, count) => {
                try {
                    signin(clientDataContent);
                    console.log(`客户端地址是${util.inspect(socket.address())}`);
                    console.log(`当前用户 ${count},总容纳 ${server.maxConnections}\r\n`);
                } catch {
                    console.log(err)
                }
            })
        }
    }

    //指令//有点问题需要思考
    function instruction(clientDataContent) {
        //指令，可能有必要做个json文本转载错误信息
        let end = {
            protocol: 'end',
            end: `退出`
        };
        clientDataContent = clientDataContent.message.trim().split(/\s+/);
        switch (clientDataContent[0]) {
            case 'q':
                return socket.write(JSON.stringify(end)) // 关闭客户端
            case 'l':
                for (let username in clients) {
                    let notification = {
                        protocol: 'notification',
                        message: username
                    };
                    socket.write(JSON.stringify(notification));//将客户端的数据已json格式传输   
                }
                break;
        }
    }
    // 给每一个连接服务端的客户端socket注册data事件
    socket.on('data', (chunk) => {
        try {
            // 对客户端传过来的数据chunk（json数据）进行序列化
            let clientDataContent = JSON.parse(chunk.toString().trim());
            // 获取协议
            let protocol = clientDataContent.protocol;
            switch (protocol) {
                case 'signin':
                    isSignin(clientDataContent);
                    break;
                case 'broadcast':
                    // instruction()
                    broadcast(clientDataContent);
                    break;
                case 'p2p':
                    p2p(clientDataContent);
                    break;
                default:
                    
                    socket.write(clientDataContent);
                    break;
            }
        } catch (error) {
            clientDataContent.message=error;
            socket.write(clientDataContent);
            throw error;
        }
    });

    // 给每一个连接服务端的客户端socket注册error事件，如果连接中断，则触发此事件
    socket.on('error', (error) => {
        // 在客户端对象中，将连接中断的那个客户端删除
        let deletekey = null;

        // 遍历clients对象，找到下线的socket，并将其删除
        for (let username in clients) {
            if (clients.hasOwnProperty(username)) {
                let client = clients[username];
                if (socket === client) deletekey = username;
            }
        }
        delete clients[deletekey];

        // 广播通知所有人，谁谁下线了
        let offlineNotice = {  // 组成下线通知消息数据格式
            protocol: 'offline',
            offline: deletekey,
            onlineCount: Object.keys(clients).length
        };
        for (let username in clients) {
            if (clients.hasOwnProperty(username)) {
                let noticeClient = clients[username];
                noticeClient.write(JSON.stringify(offlineNotice));
            }
        }

        // server 消息
        console.log(`${deletekey} 下线了，当前在线：${Object.keys(clients).length}`);
    });
});

// 监听指定端口
let port = 2021;
server.listen(port, (error) => {
    if (error) {
        console.log(`${port}端口被占用！`);
    } else {
        console.log(`服务器端正常启动，正在监听${port}端口`);
        console.log(`tcp聊天室已启动，地址是${util.inspect(server.address())}`);
    }
});