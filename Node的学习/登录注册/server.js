// const express=require('express');
// const db=require('./db/connect');
// const app=express();
// const mail=require('./utils/mail');
// console.log(mail);
// //express实例化
// const bodyparser=require('body-parser');
// app.use(bodyparser.urlencoded({extended:false}))
// app.use(bodyparser.json());
// //路由
// const userRouter=require('./router/userRouter');
// const { patch } = require('./router/userRouter');
// app.use('/user',userRouter);
// //发生邮件验证码
// app.post('/getMailCode',(req,res)=>{
//     let {mail}=req.body;
//     let code=parseInt(Math.random()*10000);
//     Mail.send(mail,code)
//     .then(()=>{
//         res.send({er:0,msg:'验证码发送成功'})
//     })
//     .catch((err)=>{
//         res.send({err:-1,msg:"验证码发送no ok"})
//     })
// })
// app.listen(3000,()=>{
//     console.log('server start');
// })


const express=require('express');
const db=require('./db/connect');
const path=require('path');
const app=express();
const mail=require('./utils/mail');
console.log(mail);
//express实例化
const bodyparser=require('body-parser');
app.use(bodyparser.urlencoded({extended:false}))
app.use(bodyparser.json());
app.use('/public',express.static(path.join(__dirname,'./heihei')))
//路由
const userRouter=require('./router/userRouter');
const foodRouter=require('./router/foodRouter');
app.use('/user',userRouter);
app.use('/food',foodRouter);
app.listen(3000,()=>{
    console.log('server start');
})