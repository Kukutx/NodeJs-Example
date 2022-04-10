/* http-Api服务器 */
const express = require('express'); // 引入express
const bodyParser = require('body-parser');
const app = express(); //  创建express服务器

// get请求
app.get('/', function (request, response) {
    // console.log(request)
    response.send('get请求成功')
});
// post请求
app.post('/', function (request, response) {
    response.send('post请求成功')
});
//浏览器中输入localhost:9001就可以看到get请求成功了。简单的http服务是这样了。
//如果简单的写一个页面测试的话会有跨域问题：
// 解决跨域
app.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By", ' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
    /*
    Access-Control-Allow-Origin：允许的域，*为任意的域都可以访问
    Access-Control-Allow-Headers：允许的header类型
    Access-Control-Allow-Methods：允许的请求方法
    */
});

//路由：针对不同的路由有不同的处理方式
app.get('/home', function (request, response, next) {
    console.log('获取数据');

    // console.log(request.query.name);
    next();
}, function (request, response) {
    // response.send('get请求成功')

    //get请求参数：request.query会把请求参数包装成字典对象，可通过点运算符获取请求参数
    response.send(`${request.query.name}请求成功`)
});

// /*中间件：发送一个请求给服务器的时候，会被中间件拦截，先由中间件处理，每个中间件都有一个回调函数作为参数，
// 拦截到参数，就会自动执行回调函数。有中间件，会先执行中间件的回调函数，
// 然后才会调用get或者post的回调函数，也就是当监听到请求，先执行中间件，才会到get、post请求。*/
// // 中间件
// // 截取请求、拦截回调
// app.use('/home', function (request, response, next) {
//     console.log('中间件')
//     console.log(request.query.name)
//     response.send(request.query.name)
//     next()
// });

//下载API
const verStr = {versionName : '2.0.0', versionCode : 200};  //版本检查返回的数据，假数据，自行修改
app.get('/checkUpdate', function(req, res){ //版本检查接口
  res.send(JSON.stringify(verStr));
});

app.get('/download', function(req, res){  //新版本文件下载接口
  res.download('./download/new-release.apk');
});




app.use(bodyParser.urlencoded({ extended: true }));  //用于处理URL 编码的表单
//CRUD
require('./app/routes')(app, {});
// 绑定监听端口
app.listen(8000, () => {
    console.log('We are live on ' + 8000);
});
/*如果运行 npm run dev（或 node server.js，如果你没有安装 Nodemon 的话），
应该在终端中看到“We are live on port 8000”的提示。 */
console.log('server启动成功')