const express = require('express')
// 引入处理 dom 模块 基于 jquery
const cheerio = require('cheerio')
const http = require('http')
const https = require('https')
const app = express()
// 创建路由 
app.get('/get_title', (req, res) => {
    const url = req.query.url
    // const url = "https://translate.google.com/"; 
    // 判断是否传递了 url
    if (!url) {
        res.send('请传递网站地址')       
        return
    }
    const urlType = url.split(':')[0] == 'http' ? http : https
    try {
        let web = urlType.request(url, (result) => {
            let chunks = []
            // 拼接请求片段数据
            result.on('data', c => chunks.push(c))
            // 拼接完成
            result.on('end', () => {
                // 拼接所有的 chunks，并且转换为字符串
                let data = Buffer.concat(chunks).toString('utf-8')
                let $ = cheerio.load(data)
                res.send($('title').text())
            })
        })
        web.end()
    } catch {
        res.send('请正确的填写网站地址!')
    }
})
app.listen(3000);
