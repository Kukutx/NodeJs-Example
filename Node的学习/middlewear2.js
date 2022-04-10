const express=require('express');
const app=express();
//内置局部中间件 ，像这种局部中间件可以写无数个  
app.get('/test1',(req,res,next)=>{
    console.log('fun1');
    next();   //加了可以跳转到下一个函数
},
(req,res)=>{
    console.log('fun2');
    res.send("test1");
})
app.listen(3000,()=>{
     console.log('server start');
})