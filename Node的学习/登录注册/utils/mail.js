"use strict";
const nodemailer = require("nodemailer");

  // 创建发送邮件对象
  let transporter = nodemailer.createTransport({
    host: "smtp.qq.email",      //邮件地址
    port: 465,     //端口号
    secure: true, // true for 465, false for other ports
    auth: {
      user: '352186537@qq.com', // 发送者的邮箱地址
      pass: 'kxlfqavqcooabgfd', //mtp 验证码
    },
  });
  function send(mail,code)
  {
    // 邮件信息
    let mailobj = {
        from: '"嘤嘤嘤" <2439699875@qq.com>', 
        to: mail, 
        subject: "1902", 
        text: `您的验证码是${code},有效期五分钟`, 
        // html: "<b>嘤嘤嘤嘤嘤嘤嘤嘤嘤</b>", // html body
    };
    return new Promise((resolve,reject)=>{
        //发送邮件
        transporter.sendMail(mailobj,(err,data)=>{
            if (err) {
                reject();
            }else{ 
                resolve();
            }
        });
    })
    
  }
  
  module.exports={send};
