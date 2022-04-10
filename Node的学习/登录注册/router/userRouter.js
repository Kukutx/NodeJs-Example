const express=require('express');
const router=express.Router();
const User=require('../db/model/userModel');
const Mail=require('../utils/mail');
let codes={};
/**
 * @api {post} /user/reg 用户注册
 * @apiName registra User
 * @apiGroup User
 *
 * @apiParam {String} us 用户名
 * @apiParam {String} ps 用户密码.
 * @apiParam {String} code 验证码.
 * @apiSuccess {String} firstname Firstname of the User.
 * @apiSuccess {String} lastname  Lastname of the User.
 */
router.post('/reg',(req,res)=>{
    //获取数据
    let {us,ps,code}=req.body;
    if (us&&ps&&code) {
       //判断验证码是否ok
       console.log(codes[us]);
       console.log(code);
       console.log(codes);
       if (codes[us]!=code) {return res.send({err:-4,msg:'验证码错误'})}
       User.find({us})
       .then((data)=>{
           if (data.length===0) {
               User.insertMany({us:us,ps:ps});
           }else{
               res.send({err:-3,msg:'用户名已存在'})
           }
       })   
       .then(()=>{res.send({err:0,msg:'注册成功'});})
       .catch((err)=>{
        res.send({err:-2,msg:'注册失败'});
       })
    }else{
        return res.send({err:-1,msg:'参数错误'});
    }
    console.log(us,ps);
    //数据处理
    //返回数据

})
/**
 * @api {post} /user/login 用户登录
 * @apiName 用户登录
 * @apiGroup User
 * @apiParam {String} us 用户名
 * @apiParam {String} ps 用户密码.
 * @apiSuccess {String} firstname Firstname of the User.
 * @apiSuccess {String} lastname  Lastname of the User.
 */
router.post('/login',(req,res)=>{
    let {us,ps}=req.body;
    if (!us||!ps) {
    return res.send({err:-1,msg:"参数失败"});
    User.find({us:us,ps:ps})
    .then((data)=>{
        if (data.length>0) {
            return res.send({err:0,msg:"登录成功"})
        }else{
            return res.send({err:-2,msg:"用户名或密码不正确"})
        }
        console.log(data)
    })
    .catch((err)=>{
        return res.send({err:-1,msg:"内部失败"})
    })
        
    }
})
/**
 * @api {post} /user/getMailCode 发送邮箱验证码
 * @apiName 发送邮箱验证码
 * @apiGroup User
 * @apiParam {String} mail邮箱
 * @apiSuccess {String} firstname Firstname of the User.
 * @apiSuccess {String} lastname  Lastname of the User.
 */
//发送验证码
router.post('/getMailCode',(req,res)=>{
    console.log(req.body);
    let {mail}=req.body;
    let code=parseInt(Math.random()*10000) //随机码
    console.log(codes);
    Mail.send(mail,code)
    .then(()=>{
        codes[mail]=code;
        //将邮件和邮箱匹配的验证码保存到缓存中
        res.send({err:0,msg:'验证码发送ok'});
    })
    .catch((err)=>{
        res.send({err:-1,msg:"发送失败"})
    })
    
})
module.exports=router;