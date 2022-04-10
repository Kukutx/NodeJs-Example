/*
协议匹配规则:常见URL协议有http、https等等，所以这里就做针对http和https的URL地址匹配。
匹配规则 ：^（https?:\/\/）

主机名匹配规则:主机名格式为：xxx.xxx.xxx 或 xxx.xxx 2种形式 由字母或数字组成。
如：www.baidu.com  baidu.com  127.0.0.1
匹配规则为：([0-9a-zA-z.]+)  或者/^[a-zA-Z0-9]{3}(\.[a-zA-Z0-9]{3}){2}$/ig

端口匹配:端口部分是由冒号开头后接数值两部分组成而且web默认端口80是不显示在后面的，所以就有2种情况存在或不存在。
如：127.0.0.1:8080  127.0.0.0
匹配规则为：(:[0-9]+)?

路径匹配:路径是由字母、数字、斜杠、点组成。在访问网站首页时后面没有路径地址，所以这块如果存在就匹配。
如：/xxx/xxxx/xxx.html 、 /xxx/xxx
匹配规则为：([/0-9a-zA-Z.]+)?

查询字符串匹配:查询字符串的格式为：?xxx=1&ddd=2 或 ?xx=2。由于这块不是必须项所以在匹配时，如果存在就匹配，不存在就算了。
匹配规则为：(\?[0-9a-zA-Z&=]+)?

信息片断匹配:信息片断是由#、字母、数值组成。由于这块不是必须项所以在匹配时，如果存在就匹配，不存在就算了。
匹配规则为：(#[0-9-a-zA-Z]+)?

组合匹配规则:采用i不区别大小写模式，来简化一下匹配规则
/^(https?:\/\/)([0-9a-z.]+)(:[0-9]+)?([/0-9a-z.]+)?(\?[0-9a-z&=]+)?(#[0-9-a-z]+)?/i
*/
'use strict';

https://www.baidu.com
// url="https://www.baidu.com"
// console.log(/^https?:\/\//g.test(url));

// {
//     // URL地址匹配格式： protocol :// hostname[:port] / path / [;parameters][?query]#fragment
//     // [;parameters]：这都没见过这东西，就不匹配了。
//     let url = [
//         'https://www.baidu.com/',
//         'http://192.168.1.1',
//         'http://192.168.1.1:8080',
//         'https://news.163.com/18/1224/15/E3Q6EJDA0001875N.html#top',
//         'https://baidu.com:80/?wd=wq&url=ksks#ddsx2',
//         'http://192.168.1.1/p/#name',
//         'https://neets.cc/subcriberlist?recommendInventoryId=QNZfMjCRQtS4z8MQrFa7qo'
//     ]
//         , result = null
//         , matcht = /^(https?:\/\/)([0-9a-z.]+)(:[0-9]+)?([/0-9a-z.]+)?(\?[0-9a-z&=]+)?(#[0-9-a-z]+)?/i
//         , info = ['完整URL', '协议', '地址', '端口', '路径', '查询', '锚点']
//     url.forEach((value) => {
//         result = matcht.exec(value);
//         console.log('---------------------------------------------------------------------------------');
//         for (let i = 0; i < result.length; i++) {
//             console.log(`${info[i]} = ${result[i]}`);
//         }
//     })
// }

var text = "你好，我是一段文本。我链接到https://leeiio.me/这是一篇测试.html 请大家多多指教。";
var regexp = /((http|ftp|https|file):\/\/([\w\-]+\.)+[\w\-]+(\/[\w\u4e00-\u9fa5\-\.\/?\@\%\!\&=\+\~\:\#\;\,]*)?)/ig.exec(text);

console.log(regexp[0]);


// module.exports = (function () {
//     'use strict';
//     var http = require('http')
//       , https = require('https')
//       , EventEmitter = require('events').EventEmitter
//       , URL = require('url')
//       , urlReg = /^(https?):\/\//;

//     /**
//      * Valid
//      * @class
//      */
//     function Valid(url, callback) {
//       var that = this;
//       this.url = url;
//       this.emitter = new EventEmitter();
//       process.nextTick(function () {
//         that.get(url);
//       });
//       this.fetch = false;
//       callback && this.emitter.on('check', callback);
//     }
//     Valid.prototype = {
//       constructor: Valid,
//       /**
//        * get
//        * @param {String} url
//        */
//       get: function (url) {
//         var match = url.match(urlReg)
//           , that = this;
//         if (match) {
//           var httpLib = (match[1].toLowerCase() === 'http') ? http : https
//             , opts = URL.parse(url)
//             , req;
//           opts.agent = false;
//           opts.method = 'GET';
//           req = httpLib.request(opts, function (res) {
//             var statusCode = res.statusCode;
//             if (statusCode === 200) {
//               that.emitter.emit('check', null, true);
//               that.fetch ?
//                 (res.on('data', function (data) {
//                   that.emitter.emit('data', null, data);
//                 }) && res.on('end', function () {
//                   that.emitter.emit('end');
//                 })) :
//                 (req.abort() || that.emitter.emit('end'));
//             } else if (300 < statusCode && statusCode < 304) {
//               req.abort();
//               var emitter = that.emitter
//                 , valid = one(URL.resolve(url, res.headers.location), function (err, valid) {
//                   emitter.emit('check', err, valid);
//                 });
//               that.fetch && valid.on('data', function (err, data) {
//                 emitter.emit('data', err, data);
//               });
//               valid.on('error', function (err) {
//                 that.emitter.emit('error', err);
//               });
//               valid.on('end', function () {
//                 that.emitter.emit('end');
//               });
//             } else {
//               that.emitter.emit('check', null, false);
//             }
//             res.on('error', function (err) {
//               req.abort();
//               that.emitter.emit('data', err);
//             });
//           });
//           req.on('error', function (err) {
//             req.abort();
//             return that.emitter.emit('check', null, false);
//           });
//           req.end();
//         } else {
//           return that.emitter.emit('check', null, false);
//         }
//       },
//       /**
//        * on
//        * @param {Stirng} event
//        * @param {Function} callback
//        */
//       on: function (event, callback) {
//         (event === 'data') && (this.fetch = true);
//         this.emitter.on(event, callback);
//         return this;
//       },
//       /**
//        * destroy
//        */
//       destroy: function () {
//         this.emitter.removeAllListeners();
//         this.url = undefined;
//         this.emitter = null;
//         this.fetch = undefined;
//       },
//       /**
//        * removeAllListeners
//        * @param
//        */
//       removeAllListeners: function (event) {
//         event ?
//           this.emitter.removeAllListeners(event) :
//           this.emitter.removeAllListeners();
//         return this;
//       },
//       /**
//        * listeners
//        * @param
//        */
//       listeners: function (event) {
//         if (event) {
//           return this.emitter.listeners(event);
//         } else {
//           var res = []
//             , that = this
//             , _push = Array.prototype.push;
//           Object.keys(this.emitter._events).forEach(function (key) {
//             _push.apply(res, that.emitter.listeners(key));
//           });
//           return res;
//         }
//       }
//     }
//     /**
//      * one
//      * @param {String} url
//      * @param {Function} callback
//      * @return {Valid}
//      */
//     function one(url, callback) {
//       return (new Valid(url, callback));
//     }
//     one.one = one;
//     return one;
//   })();