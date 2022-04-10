const fs=require('fs');
// //同步读取文件
// let dirs=fs.readdirSync('./');
// console.log(dirs);             //读取我当前目录下的文件信息

// //异步读取
// fs.readdir('./',(err,data)=>{
//     console.log(err);
//     console.log(data);
// });
//错误的回调优先,在回调函数中第一个参数表示错误对象，默认为null

// //mikdir创建文件夹
// fs.mkdir("./test",(err)=>
// {
//     console.log(err);
// })
//更改
// fs.rename('./test','./test01',(err)=>{
//     if(err)
//     {
//         console.log("更改失败");
//     }else{
//         console.log("ok");
//     }
// })
//删除 只能删除空文件
fs.rmdir('./test01',(err)=>{
    if (err) {
        console.log("删除失败");
        console.log(err);
    }else{
        console.log("成功");
    }
})
