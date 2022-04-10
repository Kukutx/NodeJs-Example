const express = require('express');
const app = express();
const moment = require('moment')
    //导入cors模块,该模块为跨域所用
const cors = require('cors');
app.use(cors());

//解析表单的插件
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }))


//创建数据库连接对象
const mysql = require('mysql');
const conn = mysql.createConnection({
    host: '127.0.0.1',//数据库地址
    user: 'root',//账号
    password: 'root',//密码
    database: 'mydb_12_9',//库名
    multipleStatements: true //允许执行多条语句
})
//get表中的数据
app.get('/api/getlist', (req, res) => {
    const sqlStr = 'select * from zdcx '
    conn.query(sqlStr, (err, results) => {
        if (err) return res.json({ err_code: 1, message: '资料不存在', affextedRows: 0 })
        res.json({ err_code: 200, message: results, affextedRows: results.affextedRows })
    })
})
//按条件查询
app.get('/api/getlistdetl', (req, res) => {
    const number = req.query.number
    const sqlStr = 'select * from zdcx where number=?'
    conn.query(sqlStr, number, (err, results) => {
        if (err) return res.json({ err_code: 1, message: '资料不存在', affextedRows: 0 })
        res.json({ err_code: 200, message: results, affextedRows: results.affextedRows })
    })
})
//添加数据
app.post('/api/addcard', (req, res) => {
    const user = req.body
    user.ctime = moment().format('YYYY-MM-DD HH:mm:ss')//格式化日期
    const sqlStr = 'insert into bank set ?'
    conn.query(sqlStr, user, (err, results) => {
        if (err) return res.json({ err_code: 1, message: err, affectedRows: 0 })
        res.json({ err_code: 0, message: '恭喜成功', affectedRows: results.affectedRows })
    })
})
//端口监听
app.listen(3000, () => {
    console.log('正在监听端口3000,http://192.168.1.114:3000'); 
    //192.168.1.114换成你的ip,本机ip查询用cmd=>ipconfig
})