const fs=require("fs")
// fs.readdir("../Node的学习",(err,dirs)=>{
//     for (let index = 0; index < dirs.length; index++) {
//         console.log(dirs[index]);
        
//     }
// })

fs.stat("./node01.md",(err,stats)=>{
    if(stats.isFile())
    {
        console.log("is file");
    }else{
        console.log("is dir");
    }
})