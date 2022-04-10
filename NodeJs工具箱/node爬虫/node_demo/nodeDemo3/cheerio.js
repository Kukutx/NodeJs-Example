var cheerio = require('cheerio');
var https = require('https');
var http = require('http');
var iconv = require('iconv-lite');

http.createServer(function(req, res){
    var url = '';
    //获取post请求的内容
    req.on('data',function(chunk){
        url += chunk;
    });
    req.on('end',function(){
        getContent(url,function(result){
            //设置响应头，允许跨域和字符集
            res.writeHead(200,{
                'Content-Type': 'text/html;charset=utf-8',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'Content-Type,Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild'
            });
            res.end(result);
        })
    })
}).listen(3000);


/*爬虫函数
参数url是待爬取文章的url，
writeFunc是一个函数，在爬取文章结束后将爬取结果作为参数传给该函数，用于对爬取结果的处理，本例中用于传递给res.end()
*/
function getContent(url,writeFunc){
    https.get(url, function(sres) {
        var chunks = [];
        sres.on('data', function(chunk) {
            chunks.push(chunk);
        });
    
        sres.on('end', function(){
            var article = [];
            var html = iconv.decode(Buffer.concat(chunks),'utf-8');
            var $ = cheerio.load(html, {decodeEntites: false});
            $('.article').each(function(idx,element){
                var $element = $(element);
                //这一步是对简书中图片出现的空白element的处理
                $element.find('.image-container-fill').remove();
                //这一步是提取图片的data-original-src属性，再设置为图片的src
                $element.find('.image-view img').each(function(index,ele){
                    $(ele).attr('src','http:'+$(ele).attr('data-original-src'));
                });
                //这一步对图片的小字名字的处理
                $element.find('.image-caption').each(function(index,ele){
                    $(ele).text('('+$(ele).text()+')');
                });
                //移除作者头像
                $element.find('.author .avatar').remove();
                //将结果传入article，这里用html()的原因是为了保留文章的结构和排版
                article.push($element.html());
            });
            //将爬取结果传给res.end
            writeFunc(article[0]);
        })
    });
}
