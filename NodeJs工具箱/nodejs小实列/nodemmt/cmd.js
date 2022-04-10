const child_process = require('child_process');

var mqtt =require('mqtt');

 

var client= mqtt.connect('mqtt://user:psw@q.emqtt.com:1883');

 

client.on('connect', function () {

   client.subscribe('/luoc83');//任意订阅一个主题，注意不要与其它客户端冲突

});

 

client.on('message', function (topic, message) {//接收到消息推送并处理

   console.log(message.toString());

   var msgObj= JSON.parse(message.toString());

   var from =msgObj["from"];

   var cmd =msgObj["cmd"];

 

   var workerProcess = child_process.exec(cmd,

      function (error,stdout, stderr) {

          client.publish(from, stdout);

      });

});