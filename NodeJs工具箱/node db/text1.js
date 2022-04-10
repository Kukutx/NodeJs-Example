var MongoClient = require('mongodb').MongoClient;
// var url = 'mongodb://localhost:27017/runoob';

// 创建数据库
/*要在 MongoDB 中创建一个数据库，首先我们需要创建一个 MongoClient 对象，然后配置好指定的 URL 和 端口号。
如果数据库不存在，MongoDB 将创建数据库并建立连接。*/
// 创建连接
// MongoClient.connect(url, function(err, db) {
//     if (err) throw err;
//     console.log("数据库已创建!");
//     db.close();
// });

//创建集合
// MongoClient.connect(url,(err, db)=> {
//     if (err) throw err;
//     console.log('数据库已创建');
//     var dbase = db.db("runoob");
//     dbase.createCollection('site1',(err, res) =>{
//         if (err) throw err;
//         console.log("创建集合!");
//         db.close();
//     });
// });

//数据库操作( CURD )
/*MongoClient.connect(url,{ useUnifiedTopology: true },(err, db)=> {
    if (err) throw err;
    var dbo = db.db("runoob");
    var myobj = { name: "菜鸟教程", url: "www.runoob" };
    var myobj1 =  [
        { name: '菜鸟工具', url: 'https://c.runoob.com', type: 'cn'},
        { name: 'Google', url: 'https://www.google.com', type: 'en'},
        { name: 'Facebook', url: 'https://www.google.com', type: 'en'}
    ];
    var whereStr = {"name":'菜鸟教程'};  // 查询条件
    var updateStr = {$set: { "url" : "https://www.runoo.com" }};
    var mysort = { type: 1 };
    //插入数据(单个)
    // dbo.collection("site").insertOne(myobj,(err, res)=> {
    //     if (err) throw err;
    //     console.log("插入的文档数量为: " + res.insertedCount);
    //     db.close();
    // });
    //插入数据(多个)
    // dbo.collection("site").insertMany(myobj1,(err, res)=>{
    //     if (err) throw err;
    //     console.log("插入的文档数量为: " + res.insertedCount);//res.insertedCount 为插入的条数。
    //     db.close();
    // });
    //查询数据
    /*可以使用 find() 来查找数据, find() 可以返回匹配条件的所有数据。 如果未指定条件，find() 返回集合中的所有数据。 */
    // dbo.collection("site"). find({}).toArray((err, result)=>{ // 返回集合中所有数据
    //     if (err) throw err;
    //     console.log(result);
    //     db.close();
    // });
    //查询指定条件的数据
    // dbo.collection("site").find(whereStr).toArray((err, result)=>{
    //     if (err) throw err;
    //     console.log(result);
    //     db.close();
    // });
    //更新数据（单个）
    // dbo.collection("site").updateOne(whereStr, updateStr,(err, res)=> {
    //     if (err) throw err;
    //     console.log("文档更新成功");
    //     db.close();
    // });
    //更新数据（多个）
    // dbo.collection("site").updateMany(whereStr, updateStr,(err, res) => {
    //     if (err) throw err;
    //      console.log(res.result.nModified + " 条文档被更新"); //result.nModified 为更新的条数。
    //     db.close();
    // });
    //删除数据（单个）
    // dbo.collection("site").deleteOne(whereStr,(err, obj) => {
    //     if (err) throw err;
    //     console.log("文档删除成功");
    //     db.close();
    // });
    //删除数据（多个）
    // dbo.collection("site").deleteMany(whereStr,(err, obj)=>{
    //     if (err) throw err;
    //     console.log(obj.result.n + " 条文档被删除");   //obj.result.n 删除的条数。
    //     db.close();
    // });
    // 排序
    /*排序 使用 sort() 方法，该方法接受一个参数，规定是升序(1)还是降序(-1)。*/
    // dbo.collection("site").find().sort(mysort).toArray((err, result) =>{
    //     if (err) throw err;
    //     console.log(result);
    //     db.close();
    // });
    //查询分页
    /* 如果要设置指定的返回条数可以使用 limit() 方法，该方法只接受一个参数，指定了返回的条数。*/
    // dbo.collection("site").find().limit(2).toArray((err, result)=>{   //limit()：读取两条数据
    //     if (err) throw err;
    //     console.log(result);
    //     db.close();
    // });
    /*如果要指定跳过的条数，可以使用 skip() 方法 */
    // dbo.collection("site").find().skip(2).limit(2).toArray((err, result)=> {
    //     if (err) throw err;
    //     console.log(result);
    //     db.close();
    // });


    // 连接操作
    /*mongoDB 不是一个关系型数据库，但我们可以使用 $lookup 来实现左连接。例如我们有两个集合数据分别为：   
      集合1：orders   
      [
        { _id: 1, product_id: 154, status: 1 }
      ]
      集合2：products
      [
        { _id: 154, name: '笔记本电脑' },
        { _id: 155, name: '耳机' },
        { _id: 156, name: '台式电脑' }
      ]
    */ 
    // dbo.collection('orders').aggregate([
    //  { $lookup:
    //     {
    //       from: 'products',            // 右集合
    //       localField: 'product_id',    // 左集合 join 字段
    //       foreignField: '_id',         // 右集合 join 字段
    //       as: 'orderdetails'           // 新生成字段（类型array）
    //     }
    //   }
    //  ]).toArray(function(err, res) {
    //  if (err) throw err;
    //  console.log(JSON.stringify(res));
    //  db.close();
    //});
    //删除集合
    /*我们可以使用 drop() 方法来删除集合 */
    // dbo.collection("site").drop(function(err, delOK) {  // 执行成功 delOK 返回 true，否则返回 false
    //     if (err) throw err;
    //     if (delOK) console.log("集合已删除");
    //     db.close();
    // });    
// });

// 使用 Promise
/*Promise 是一个 ECMAScript 6 提供的类，目的是更加优雅地书写复杂的异步任务。*/
// MongoClient.connect(url,{ useUnifiedTopology: true }).then((conn) => {
//     console.log("数据库已连接");
//     var dbase = conn.db("runoob");
//     dbase.createCollection("site").then((res) => {
//         console.log("已创建集合");
//     }).catch((err) => {
//         console.log("数据库操作错误");
//     }).finally(() => {
//         conn.close();
//     });
//     }).catch((err) => {
//     console.log("数据库连接失败");
// });

// Promise 数据操作
/*现在我们在一个程序中实现四个连续操作：增加 、查询 、更改 、删除。 */
const url = "mongodb://localhost/";

/*MongoClient.connect(url).then((conn) => {
    console.log("数据库已连接");
    const test = conn.db("testdb").collection("test");
    // 增加
    test.insertOne({ "site": "runoob.com" }).then((res) => {
        // 查询
        return test.find().toArray().then((arr) => {
            console.log(arr);
        });
    }).then(() => {
        // 更改
        return test.updateMany({ "site": "runoob.com" },
            { $set: { "site": "example.com" } });
    }).then((res) => {
        // 查询
        return test.find().toArray().then((arr) => {
            console.log(arr);
        });
    }).then(() => {
        // 删除
        return test.deleteMany({ "site": "example.com" });
    }).then((res) => {
        // 查询
        return test.find().toArray().then((arr) => {
            console.log(arr);
        });
    }).catch((err) => {
        console.log("数据操作失败" + err.message);
    }).finally(() => {
        conn.close();
    });
}).catch((err) => {
    console.log("数据库连接失败");
});*/

// 用异步函数实现相同的数据操作
async function dataOperate() {
    var conn = null;
    try {
        conn = await MongoClient.connect(url);
        console.log("数据库已连接");
        const test = conn.db("testdb").collection("test");
        // 增加
        await test.insertOne({ "site": "runoob.com" });
        // 查询
        var arr = await test.find().toArray();
        console.log(arr);
        // 更改
        await test.updateMany({ "site": "runoob.com" },
            { $set: { "site": "example.com" } });
        // 查询
        arr = await test.find().toArray();
        console.log(arr);
        // 删除
        await test.deleteMany({ "site": "example.com" });
        // 查询
        arr = await test.find().toArray();
        console.log(arr);
    } catch (err) {
        console.log("错误：" + err.message);
    } finally {
        if (conn != null) conn.close();
    }
}
 
dataOperate();