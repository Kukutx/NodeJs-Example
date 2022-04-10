const express=require('express');
const app=express()
// app.get('/user/add',(req,res)=>{
//     res.send('user/add ok');
// })
// app.get('/user/del',(req,res)=>{
//     res.send('user/del ok');
// })

let userRouter=require('./router/userRouter.js');    //分成调用 自定义模块
let foodRouter=require('./router/foodRouter.js');
app.use('/user',userRouter);
app.use('/food',foodRouter);
app.listen(3000,()=>{
    //监听3000端口开启服务器
    console.log('server start express');
});


