const express=require('express');
const app=express()
//express实例化
const bodyparser=require('body-parser');
//app.use 使用中间件（插件） ,urlencoded 解析表达数据
app.use(bodyparser.urlencoded({extended:false}))
//解析Json数据
app.use(bodyparser.json())
//api接口
app.get('/user/login',(req,res)=>{

    //接受get 参数 res.query
    console.log(req.query);
    console.log('你好');
    let {us,ps}=req.query;
    //处理数据
    if (us==='wangyi'&&ps=="456") {
        res.send({err:0,msg:'regist ok'});
    }else{
        res.send({err:-1,msg:'us pass no ok'});
    } 
})

app.post('/user/reg',(req,res)=>{
    // console.log(req.query);
    // let {us,ps}=req.query;
    // //处理数据
    // if (us==='wangyi'&&ps=="456") {
    //     res.send({err:0,msg:'regist ok'});
    // }else{
    //     res.send({err:-1,msg:'us pass no ok'});
    // } 

    //接受post 数据 消息体 请求体 req.body
    let {us,ps}=req.body;
    if (us==='wangyi'&&ps=="456") {
        res.send({err:0,msg:'regist ok'});
    }else{
        res.send({err:-1,msg:'us pass no ok'});
    } 

})

app.get('/hehe',(req,res)=>{

    res.send("嘤嘤嘤");
})

app.listen(3000,()=>{
    //监听3000端口开启服务器
    console.log('server start');
})

