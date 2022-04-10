const cheerio=require('cheerio');
let $=cheerio.load('<div><p>你好</p><img src="http://www.baidu.com"><img src="http://www.baidu11.com"></div>');
//抓取文件
// console.log($('img').attr('src'));
// console.log($('p').text());

//批量抓取图片
$('img').each((index,el)=>
{
    // console.log(el);
    console.log($(el).attr('src'));
})