// "use strict";
// const nodemailer = require("nodemailer");
//   // 创建发送邮件对象
//   let transporter = nodemailer.createTransport({
//     host: "smtp.qq.email",      //邮件地址
//     port: 465,     //端口号
//     secure: true, // 端口号是465就是true，否则其他为false 
//     auth: {
//       user: '2439699875@qq.com', // 发送者的邮箱地址
//       pass: 'kxlfqavqcooabgfd', //mtp 验证码
//     },
//   });
// // 邮箱信息
// let mailobj = {
//     from: '"Fred Foo 👻" <2439699875@qq.com>', // 发送方的邮箱
//     to: "2439699875@qq.com", // 接收方的邮箱
//     subject: "通知", // 标题部分
//     text: "发送的内容", // 发送的内容
//     // html: "<b>嘤嘤嘤嘤嘤嘤嘤嘤嘤</b>", // html body
// };
//   //发送邮件
//   transporter.sendMail(mailobj,(err,data)=>{
//       console.log(err);
//       console.log(data);
//   });

//   //轰炸机
//   // setInterval(()=>{
//   //   transporter.sendMail(mailobj);
//   // },1000)

// // 发送邮件
// // serInterval(() => {
// // 	transporter.sendMail(mailObj, (err, data) => {
// // 	    if (err) {
// // 	        console.log('发送失败，错误信息：' + err);
// // 	        return;
// // 	    }
// // 	    console.log('发送成功');
// // 	});
// // }, 1000); // 1000代表1000毫秒也就是1秒发送一次，可自行修改，建议不修改

/* */


  
//config配套使用
// var nodemailer = require('nodemailer'),
// config = require('./config'),
// smtpTransport = nodemailer.createTransport('SMTP', config.mail.from);

// /**
//  * @param {String} subject：发送的主题
//  * @param {String} html：发送的 html 内容
//  */

// function sendMail(subject, html) {
//     var mailOptions = {
//       from: [config.mail.from.name, config.mail.from.auth.user].join(' '),
//       to: config.mail.to.join(','),
//       subject: subject,
//       html: html
//     };
  
//     smtpTransport.sendMail(mailOptions, function(error, response){
//       if (error) {
//         console.log(error);
//       } else {
//         console.log('Message sent: ' + response.message);
//       }
//       smtpTransport.close();
//     });
// };
// sendMail('测试邮件', '<p>Hello world!</p>');




//index.js配套使用
var nodemailer = require('nodemailer');  
  
var transporter = nodemailer.createTransport({  
service: 'Gmail',  
auth: {  
user: 'liuzhongli.ascii@gmail.com',  
pass: 'a65332120'  
}  
});  
  
exports.send = function(mailOptions) {  
mailOptions = mailOptions ? mailOptions : {  
from: '"Du Peiduo" <zhongli.liu02.studente@istitutopesenti.it>', // login user must equel to this user  
to: 'zhongli.liu02.studente@istitutopesenti.it',  
subject: 'Title Nodejs Send',  
text: 'Some simple words.',  
html: '<b>The main content of the mail. You have successfully logged in to Nodejs.</b>'  
};  
  
transporter.sendMail(mailOptions, function(error, info){  
if(error){  
return console.log(error);  
}  
console.log('Message sent: ' + info.response);  
});  
}  