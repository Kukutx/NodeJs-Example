"use strict";
const nodemailer = require("nodemailer");

  // 创建发送邮件对象
  let transporter = nodemailer.createTransport({
    host: "smtp.qq.email",      //邮件地址
    port: 465,     //端口号
    secure: true, // 端口号是465就是true，否则其他为false 
    auth: {
      user: '2439699875@qq.com', // 发送者的邮箱地址
      pass: 'kxlfqavqcooabgfd', //mtp 验证码
    },
  });
// 邮箱信息
let mailobj = {
    from: '"Fred Foo 👻" <2439699875@qq.com>', // 发送方的邮箱
    to: "2439699875@qq.com", // 接收方的邮箱
    subject: "通知", // 标题部分
    text: "发送的内容", // 发送的内容
    // html: "<b>嘤嘤嘤嘤嘤嘤嘤嘤嘤</b>", // html body
};
  //发送邮件
  transporter.sendMail(mailobj,(err,data)=>{
      console.log(err);
      console.log(data);
  });

  //轰炸机
  // setInterval(()=>{
  //   transporter.sendMail(mailobj);
  // },1000)

// 发送邮件
// serInterval(() => {
// 	transporter.sendMail(mailObj, (err, data) => {
// 	    if (err) {
// 	        console.log('发送失败，错误信息：' + err);
// 	        return;
// 	    }
// 	    console.log('发送成功');
// 	});
// }, 1000); // 1000代表1000毫秒也就是1秒发送一次，可自行修改，建议不修改



















/*'use strict';
const nodemailer = require('nodemailer');

// Generate test SMTP service account from ethereal.email
// Only needed if you don't have a real mail account for testing
nodemailer.createTestAccount((err, account) => {

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: account.user, // generated ethereal user
            pass: account.pass  // generated ethereal password
        }
    });

    // setup email data with unicode symbols
    let mailOptions = {
        from: '"Fred Foo ?" <foo@blurdybloop.com>', // sender address
        to: 'bar@blurdybloop.com, baz@blurdybloop.com', // list of receivers
        subject: 'Hello ✔', // Subject line
        text: 'Hello world?', // plain text body
        html: '<b>Hello world?</b>' // html body
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
        // Preview only available when sending through an Ethereal account
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@blurdybloop.com>
        // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
    });
});*/