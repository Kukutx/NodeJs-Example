const express=require('express');
const router=express.Router();
const multer=require('multer');
var storage=multer.diskStorage({
    //设置上传后文件路径，uploads文件夹自动创建
    destination:function(req,file,cb){
        cb(null,'./uploads');
    },
    //给上传文件重命名，获取添加后缀名
    filename:function(req,file,cb){
        cb(null,'aaa.jpg');
    },
});
var upload=multer({
    storage:storage
});
router.post('/upload',upload.single('hehe'),(req,res)=>{
    console.log(res.file);
    let {size,mimetype,path}=req.file;
    let types=['jpg','jpeg','png','gif'];   //允许上传的数据类型
    let tmpType=mimetype.split('/')[1]
    if (size>500000) {
        return res.send({err:-1,msg:'尺寸过大'})
    }else if (types.indexOf(tmpType==-1)) {
        return res.send({err:-2,msg:'类型错误'})
    }else{
         res.send('上传ok');
    } 
})
module.exports=router;
