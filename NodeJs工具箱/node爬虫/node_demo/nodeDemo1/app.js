
//导入express框架
var express = require("express");
var app = express();
//解决跨域问题
const cors = require('cors');
// 中间件 获取参数的
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());
//获取json数据
var data = require('./data.json')
app.all("*", function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OP0TIONS");
    res.header("X-Powered-By", "3.2.1");
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});


app.post('/123', function(req, res) {
	console.log(5555,req.query,666,req.params,888,req.body)
    res.status(200),
	//json格式
    res.json(data)
	//传入页面
	// res.send(data)
});

var server = app.listen(3000, function() {
    var host = server.address().address;
    var port = server.address().port;

    console.log("服务器启动成功了端口是", port);
})