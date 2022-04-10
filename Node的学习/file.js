const fs=require("fs");
// //创建文件且写入     如果文件存在就写入如果不存在创建且写入
// fs.writeFile("name.txt","今天天气不错",(err)=>{
//     console.log(err);
// });
// //写入且追加文件内容    后面追加
// fs.appendFile("name.txt","你好韩梅梅",(err)=>{
//     console.log(err);
// })
//读取文件
// fs.readFile("name.txt",(err,msg)=>{
//     console.log(err);
//     console.log(msg.toString("utf8"));
//     //默认读取二进制数据流，转成utf8字符编码个数
// })
// fs.readFile("name.txt",'utf8',(err,msg)=>{   //设置为utf8格式
//     console.log(err);
//     console.log(msg);
// })
//删除文件
fs.unlink("./name.txt",(err)=>{   
    console.log(err);
})