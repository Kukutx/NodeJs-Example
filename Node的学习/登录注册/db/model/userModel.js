const mongoose=require('mongoose');
var Schema = mongoose.Schema;
var userSchema=new Schema({
    us:{type:String,required:true},
    ps:{type:String,required:true},
    age:Number,
    sex:{type:Number,default:0} 

});
//schema  对象转化为数据模型
var User=mongoose.model('user',userSchema);  //该数据对象和集合关联
module.exports=User;