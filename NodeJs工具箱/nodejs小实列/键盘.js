var ks = require('node-key-sender');
setInterval(()=>{ks.sendKey('c');ks.sendKey('enter')},100)
ks.sendText('11323131')

// var robot = require("robotjs");
// // Type user's password or something. 
// robot.typeString("abc123");
// // 响应@Venryx。没错，robotjs会有延迟，特别是如果您必须先加载节点，但是，如果您已经有节点加载器，则值得尝试
// robot.setKeyboardDelay(0)
// // 延迟的默认设置为10ms。这极大地帮助了我。