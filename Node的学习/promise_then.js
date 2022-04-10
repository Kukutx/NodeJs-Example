const { rejects } = require('assert');
const fs=require('fs');
const { resolve } = require('path');
function isExit()
{
    return new Promise((resolve,rejects)=>{
        fs.stat('./hehe.js',(err,stats)=>{
            if (err) {
                //失败
                rejects('失败了');
            }else{
                resolve('成功了');
            }
        })
    })
}
function delFile() {
    return new Promise((resolve,rejects)=>{
        fs.unlink('./hehe.js',(err)=>{
            if (err) {
                //失败
                rejects('删除失败了');
            }else{
                resolve('删除成功了');
            }
        })
    })   
}

isExit()
.then(()=>{
    console.log("is exit 的成功处理");
    return delFile();   
})
.then(()=>{
    console.log("删除文件的成功处理");
})
.then(()=>{
    console.log("test11");
})
.then(()=>{
    console.log("test222");
})
.catch((err)=>{
    console.log('chatch');
    console.log(err);
})