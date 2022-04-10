/*摘抄自百度：MQTT（MessageQueuing Telemetry Transport，消息队列遥测传输）是IBM开发的一个即时通讯协议，有可能成为物联网的重要组成部分。

所谓物联网，就是“万物互联”，我们的电脑、工控机、开发板什么的也是“物体”，当然也可以加入“物联网”。

远程控制电脑，有很多种方法，如Mstsc、TeamViewer、VNC、SSH、QQ远程等。在我参与过的几个物联网项目中，有这么一个共性需求：远程执行一些命令，主要是查看主机状态、资源占用情况、下载文件、重启、查看日志等。想想看，如果在本地，不就是执行控制台命令吗？那么可以远程发送命令，待其执行后，返回控制台回显字符串，这个过程模拟了本地执行控制台的全过程。当然，这种方式有一定局限性，最好只用于单步命令。

Nodejs跨平台、插件丰富的特性，使得它特别适合做驻机服务。另外，q.emqtt.com是网上找到的一个免费MQTT服务。下面是利用Nodejs+MQTT插件实现的驻机控制端: */
var mqtt =require('mqtt');

var client= mqtt.connect('mqtt://user:psw@q.emqtt.com:1883');

client.on('connect', function () {

   var id = '/user007';

   client.subscribe(id);

   var cmd = {"from": id, "cmd": "dir d:\\" };

   client.publish('/luoc83', JSON.stringify(cmd));

});

 

client.on('message', function (topic, message) {

   console.log(message.toString());

});