

const fs = require('fs');

// var data = fs.readFileSync('user.json');
// const user = JSON.parse(data.toString());
// console.log(user);


class json {
    constructor(path) {
        this.path = path;
        fs.stat(path, function (error, stats) {
            if (error) {
                fs.writeFile(path, '', function (error) {
                    if (error) {
                        console.log(error);
                        return false;
                    }
                })
            }
            // console.log('文件：'+stats.isFile());
            // console.log('目录：'+stats.isDirectory());
        })
    }
    //查询数据
    select() {
        let path = this.path;
        fs.readFile(path, function (err, data) {
            if (err) {
                return console.error(err);
            }
            var person = data.toString();//将二进制的数据转换为字符串
            person = JSON.parse(person);//将字符串转换为json对象
            console.log(`数据 ：${person.total}`);
            console.log(person.data);
            console.log('----------查询成功-------------');
        })
    }
    //增json文件中的选项
    // writeJson(params) {
    //     //现将json文件读出来
    //     let path = this.path;
    //     fs.readFile(path, function (err, data) {
    //         if (err) {
    //             return console.error(err);
    //         }
    //         var person = data.toString();//将二进制的数据转换为字符串
    //         person = JSON.parse(person);//将字符串转换为json对象
    //         person.data.push(params);//将传来的对象push进数组对象中
    //         person.total = person.data.length;//定义一下总条数，为以后的分页打基础
    //         console.log(person.data);
    //         var str = JSON.stringify(person, null, 4);//因为nodejs的写入文件只认识字符串或者二进制数，所以把json对象转换成字符串重新写入json文件中
    //         fs.writeFile(path, str, function (err) {
    //             if (err) {
    //                 console.error(err);
    //             }
    //             console.log('----------新增成功-------------');
    //         })
    //     })
    // }

    //增json文件中的选项
    writeJson(id, string) {
        //现将json文件读出来
        let path = this.path;
        fs.readFile(path, function (err, data) {
            if (err) {
                return console.error(err);
            }
            var person = data.toString();//将二进制的数据转换为字符串
            person = JSON.parse(person);//将字符串转换为json对象
            person.data.push({
                "id": id,
                "name": string
            });//将传来的对象push进数组对象中
            person.total = person.data.length;//定义一下总条数，为以后的分页打基础
            console.log(person.data);
            var str = JSON.stringify(person, null, 4);//因为nodejs的写入文件只认识字符串或者二进制数，所以把json对象转换成字符串重新写入json文件中
            fs.writeFile(path, str, function (err) {
                if (err) {
                    console.error(err);
                }
                console.log('----------新增成功-------------');
            })
        })
    }
    // 删除json文件中的选项
    deleteJson(id) {
        let path = this.path;
        fs.readFile(path, function (err, data) {
            if (err) {
                return console.error(err);
            }
            var person = data.toString();
            person = JSON.parse(person);
            //把数据读出来删除
            for (var i = 0; i < person.data.length; i++) {
                if (id == person.data[i].id) {
                    console.log(person.data[i])
                    person.data.splice(i, 1);
                }
            }
            console.log(person.data);
            person.total = person.data.length;
            var str = JSON.stringify(person);
            //然后再把数据写进去
            fs.writeFile(path, str, function (err) {
                if (err) {
                    console.error(err);
                }
                console.log("----------删除成功------------");
            })
        })
    }
    // 修改json文件中的选项
    changeJson(id, params) {
        let path = this.path;
        fs.readFile(path, function (err, data) {
            if (err) {
                console.error(err);
            }
            var person = data.toString();
            person = JSON.parse(person);
            //把数据读出来,然后进行修改
            for (var i = 0; i < person.data.length; i++) {
                if (id == person.data[i].id) {
                    console.log('id一样的');
                    console.log(person.data[i].name);
                    person.data[i].name = params;

                    //json方式进行更改
                    /*  var params = {
                          "id": 14,
                          "name": "白眉鹰王9"
                      }*/
                    // for(var key in params){
                    //     // console.log(key)
                    //     if(person.data[i][key]){
                    //         console.log(person.data[i][key])
                    //         person.data[i][key] = params[key];
                    //     }
                    // }
                }
            }
            person.total = person.data.length;
            var str = JSON.stringify(person, null, 4);
            //console.log(str);
            fs.writeFile(path, str, function (err) {
                if (err) {
                    console.error(err);
                }
                console.log('--------------------修改成功----------------');
                console.log(person.data);
            })
        })
    }
    // 查json文件中的选项
    //单个查询
    // 删除json文件中的选项
    Singlequery(id) {
        let path = this.path;
        fs.readFile(path, function (err, data) {
            if (err) {
                return console.error(err);
            }
            var person = data.toString();
            person = JSON.parse(person);
            //把数据读出来删除
            for (var i = 0; i < person.data.length; i++) {
                if (id == person.data[i].id) {
                    console.log(person.data[i])
                    return console.log("----------查询成功------------");
                }
            }
            console.log("----------查询失败------------");
            return
        })
    }
    //通过传回来的页数，进行分页模拟
    pagination(p, s) {
        //p为页数，比如第一页传0，第二页传1,s为每页多少条数据
        fs.readFile(this.path, function (err, data) {
            if (err) {
                console.error(err);
            }
            var person = data.toString();
            person = JSON.parse(person);
            //把数据读出来
            // console.log(person.data);

            var length = person.data.length;
            var pagePerson = person.data.slice(s * p, (p + 1) * s);
            console.log('------------------------查询成功pagePerson----------');
            console.log(pagePerson);
        })
    }
}
// var params = {
//     "id": 14,
//     "name": "白眉鹰王9"
// }
// var paras = {
//     name: '嘤嘤嘤'
// }
var json1 = new json('./mock/person.json');
// json1.writeJson(params)
// json1.writeJson(1, '嘤嘤嘤')
// json1.deleteJson(1)
// json1.Singlequery(11)
// json1.changeJson(7, '嘤嘤嘤')
// json1.pagination(0, 6)
json1.select();


//排序
// var ob = { 
//             "fff": {
//                      "name": "user1",
//                       "score": "10" 
//                     },
//              "bbbb": {
//                      "name": "user4",
//                      "score": "14" 
//                     },
//              "dddd": { 
//                      "name": "user2",
//                       "score": "99" 
//                     },
//              "cccc": {
//                      "name": "user5",
//                      "score": "40" 
//                     },
//                "aaaa": { 
//                       "name": "user3",
//                        "score": "7" 
//                       } 
//           };
// Object.keys(ob).map(key => ({ key: key, value: ob[key] }))
//   .sort((first, second) => (first.value.name < second.value.name) ? -1 : (first.value.name > second.value.name) ? 1 : 0)
//   .forEach((sortedData) => console.log(JSON.stringify(sortedData)));
