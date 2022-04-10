//引入mongod
const mongoose = require('mongoose');
mongoose.connect("mongodb://localhost/1902",{ useNewUrlParser: true });
//连接数据库
var db=mongoose.connection;
db.on("error",console.error.bind(console,'connection error:'));
db.once('open',function(){
    console.log("数据库连接成功");
});

//scheme 对象
//创建一个和集合相关的schema对象
var Schema = mongoose.Schema;
var userSchema=new Schema({
    us:{type:String,required:true},
    ps:{type:String,required:true},
    age:Number,
    sex:{type:Number,default:0} 
});
//schema  对象转化为数据模型
var User=mongoose.model('user',userSchema);  //该数据对象和集合关联
//操作数据库

//插入
// User.insertMany({us:'wangyi',ps:'123',age:16})
// .then((data)=>{
//     console.log(data)
//     console.log('插入成功')
// })
// .catch((err)=>{
//     console.log('插入失败');
// })

// //查询
// User.find()
// .then((data)=>{
//     console.log(data)
//     console.log('查询成功')
// })
// .catch((err)=>{
//     console.log('查询失败');
// })

//删除
User.remove()
.then((data)=>{
    console.log(data)
    console.log('删除成功')
})
.catch((err)=>{
    console.log('删除失败');
})

