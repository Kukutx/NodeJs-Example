const { text } = require('body-parser');
const express=require('express');
const app=express();
app.use('/',(req,res,next)=>{  //类似拦截器(原因是加了请求访问'/'根路径所以所有请求都会执行) ，如果继续往下走就加next//如果是根路径可以直接不写
    console.log('中间件');
    let {token}=req.query;
    if(token){
        next();
    }else
    {
        res.send("缺少token");
    }

    // next();  //是否继续往下执行(如果不加就不会继续往下执行下去了)      
    // 如果当前中间件函数没有结束请求/响应循环，那么它必须调用 next()，以将控制权传递给下一个中间件函数。否则，请求将保持挂起状态 
})


app.get('/test1',(req,res)=>{
    console.log('text1');
    // let {token}=req.query;
    // if (token) {
    //     res.send('ok');
    // }else{
    //     res.send('no ok');
    // }

    res.send("test1");
})
app.get('/test2',(req,res)=>{
    // console.log('text2');
    // let {token}=req.query;
    // if (token) {
    //     res.send('ok');
    // }else{
    //     res.send('no ok');
    // }

    res.send("test2");
})
app.listen(3000,()=>{
     console.log('server start');
})