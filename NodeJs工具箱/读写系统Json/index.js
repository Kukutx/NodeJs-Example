const fs = require('fs');
// // 创建一个JSON对象
// const user = {
//     "id": 3,
//     "name": "John Doe",
//     "age": 22
// };
// // 行形
// // const data = JSON.stringify(user);
// // 树形
// const data = JSON.stringify(user, null, 4);
// 将JSON字符串写入文件
// fs.writeFile()方法将JSON对象异步写入文件
// fs.writeFile('user.json', data, (err) => {
//     if (err) {
//         throw err;
//     }
//     console.log("JSON data is saved.");
// });
// writeFileSync()的方法，用于将数据同步写入文件
// try {
//     fs.writeFileSync('user.json', data);
//     console.log("JSON data is saved.");
// } catch (error) {
//     console.error(err);
// }

// 从文件读取JSON
// fs.readFile异步读取
// fs.readFile('user.json', 'utf-8', (err, data) => {
//     if (err) {
//         throw err;
//     }
//     // Json格式转为字符串
//     const user = JSON.parse(data.toString());
//     console.log(user);
// });

// 从文件读取JSON
// fs.readFileSync 同步读取
// var data = fs.readFileSync('user.json');
// const user = JSON.parse(data.toString());
// console.log(user);

//利用nodejs对本地json文件进行增删改查
// var fs = require('fs');

// //增
// var params = {
//     "id":13,
//     "name":"白眉鹰王8"
// }//在真实的开发中id肯定是随机生成的而且不会重复的，下一篇写如何生成随机切不会重复的随机数，现在就模拟一下假数据
// //写入json文件选项
// function writeJson(params){
//     //现将json文件读出来
//     fs.readFile('./mock/person.json',function(err,data){
//         if(err){
//             return console.error(err);
//         }
//         var person = data.toString();//将二进制的数据转换为字符串
//         person = JSON.parse(person);//将字符串转换为json对象
//         person.data.push(params);//将传来的对象push进数组对象中
//         person.total = person.data.length;//定义一下总条数，为以后的分页打基础
//         console.log(person.data);
//         var str = JSON.stringify(person, null, 4);//因为nodejs的写入文件只认识字符串或者二进制数，所以把json对象转换成字符串重新写入json文件中
//         fs.writeFile('./mock/person.json',str,function(err){
//             if(err){
//                 console.error(err);
//             }
//             console.log('----------新增成功-------------');
//         })
//     })
// }
// writeJson(params)//执行一下;

// 删
//删除json文件中的选项
// function deleteJson(id){
//     fs.readFile('./mock/person.json',function(err,data){
//         if(err){
//             return console.error(err);
//         }
//         var person = data.toString();
//         person = JSON.parse(person);
//         //把数据读出来删除
//         for(var i = 0; i < person.data.length;i++){
//             if(id == person.data[i].id){
//                 //console.log(person.data[i])
//                 person.data.splice(i,1);
//             }
//         }
//         console.log(person.data);
//         person.total = person.data.length;
//         var str = JSON.stringify(person);
//         //然后再把数据写进去
//         fs.writeFile('./mock/person.json',str,function(err){
//             if(err){
//                 console.error(err);
//             }
//             console.log("----------删除成功------------");
//         })
//     })
// }
// deleteJson(5);//执行一下

//改
// var params = {
//     "name":"孙悟空"
// }
// function changeJson(id,params){
//     fs.readFile('./mock/person.json',function(err,data){
//         if(err){
//             console.error(err);
//         }
//         var person = data.toString();
//         person = JSON.parse(person);
//         //把数据读出来,然后进行修改
//         for(var i = 0; i < person.data.length;i++){
//             if(id == person.data[i].id){
//                 console.log('id一样的');
//                 for(var key in params){
//                     if(person.data[i][key]){
//                         person.data[i][key] = params[key];
//                     }
//                 }
//             }
//         }
//         person.total = person.data.length;
//         var str = JSON.stringify(person);
//         //console.log(str);
//         fs.writeFile('./mock/person.json',str,function(err){
//             if(err){
//                 console.error(err);
//             }
//             console.log('--------------------修改成功');
//             console.log(person.data);
//         })
//     })
// }
// changeJson(3,params)//执行一下;


// 查
//通过传回来的页数，进行分页模拟
function pagination(p,s){
    //p为页数，比如第一页传0，第二页传1,s为每页多少条数据
    fs.readFile('./mock/person.json',function(err,data){
        if(err){
            console.error(err);
        }
        var person = data.toString();
        person = JSON.parse(person);
        //把数据读出来
        //console.log(person.data);
        var length = person.data.length;
        var pagePerson = person.data.slice(s*p,(p+1)*s);
        console.log('------------------------查询成功pagePerson');
        console.log(pagePerson);
    })
}
pagination(0,6);//查询第一页，每页的数据条数为6条