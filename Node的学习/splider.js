const http=require('http');
const fs=require('fs');
const cheerio=require('cheerio');
let url='http://www.baidu.com/';
let url1='https://www.bilibili.com/';
let url2='http://www.uzxun-acg.live/';
let json='http://nodejs.org/dist/index.json';

http.get(url2,(res)=>{
    //安全判断
    const {statusCode}=res;            //状态码
    const contentType=res.headers['content-type'];    //文件类型
    console.log(statusCode,contentType);
    let err=null;
    if (statusCode!=200) {
        err=new Error("请求状态错误");
    }else if(!/^text\/html/.test(contentType))
    {
        //格式类型是网页文件
        err=new Error("请求类型错误");
    }
    if (err) {
        console.log(err);
        res.resume();//重置缓存
        return false;
    }
    

    //数据的处理
    //数据分段，只要接受数据就会触发data事件chunk每次接受的数据片段
    let rawData='';
    res.on('data',(chunk)=>{
        // console.log('数据传输');
        console.log('------');
        rawData +=chunk.toString('utf8');
        console.log(rawData);
    })
    //数据流传输完毕
    res.on('end',(chunk)=>{
        //将请求的数据保存到本地
        // fs.writeFileSync('./baidu.html',rawData);
        fs.writeFileSync('C:/Users/liuzh/Desktop/宝库/1.html',rawData);
        console.log('数据传输完毕');
        //通过cheerio分析
        let $=cheerio.load(rawData);    //将请求的网页数据进行转化
        $('img').each((index,el)=>{
            console.log($(el).attr('src'));
        })
    })
}).on('error',(err)=>{
    console.log('请求错误');
});

/*
let obj={name:123,age:456}
let name=obj.name;
let {name}=obj    这个等价于上一个
*/
