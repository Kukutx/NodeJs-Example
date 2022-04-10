const fs=require('fs');
function delfile()
{
    return new Promise((reslove,reject)=>{
        //异步操作
        fs.unlink('./hehe.js',(err)=>{
            if (err) {
                //失败
                reject('失败了');
            }else{
                reslove('成功了');
            }
        })
    })
}
delfile()
.then((msg)=>{
    console.log('then:'+ msg);
})
.catch((err)=>{
    console.log('err:' + err);
})
