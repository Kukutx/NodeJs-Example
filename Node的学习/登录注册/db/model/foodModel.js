const mongoose=require('mongoose');
var foodSchema=new mongoose.Schema({
    name:{type:String,required:true},
    price:{type:String,required:true},
    desc:{type:String,required:true},
    typename:{type:String,required:true},
    typeid:{type:Number,required:true},
    img:{type:Number,required:true},
});
//schema  对象转化为数据模型
var Food=mongoose.model('foods',foodSchema);  //该数据对象和集合关联
module.exports=Food;