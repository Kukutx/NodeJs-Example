const express=require('express');
const { dirname } = require('path');
const path=require('path');
const app=express();
// console.log(__dirname);
// console.log(path.join(__dirname,'.hehe'));
app.use(express.static(path.join(__dirname,'.hehe')));
app.listen(3000,()=>{
     console.log('server start');
})