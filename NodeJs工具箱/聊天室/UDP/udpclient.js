// 例子：UDP客户端
var PORT = 33333;
var HOST = '127.0.0.1';

var dgram = require('dgram');
var message = Buffer.from('My KungFu is Good!');

var client = dgram.createSocket('udp4');

client.send(message, PORT, HOST, function(err, bytes) {
    if (err) throw err;
    console.log('UDP message sent to ' + HOST +':'+ PORT);
    client.close();
});





/*2 广播*/
// var dgram = require('dgram');
// var client = dgram.createSocket('udp4');
// var msg = Buffer.from('hello world');
// var port = 33333;
// var host = '255.255.255.255';

// client.bind(function(){
//     client.setBroadcast(true);
//     client.send(msg, port, host, function(err){
//         if(err) throw err;
//         console.log('msg has been sent');
//         client.close();
//     });
// });