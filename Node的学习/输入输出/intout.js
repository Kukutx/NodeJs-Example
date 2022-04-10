// const readline = require('readline');
// var sleep = require('sleep');

// const rl = readline.createInterface({
//     input: process.stdin,
//     output: process.stdout
// });
// // ask user for the anme input
// rl.question(`What's your name? `, (name) => {

//     // ask for nationality
//     rl.question(`What are you from? `, (country) => {
//         // log user details
//         console.log(`${name} is from ${country}`);

//         // 这将打印类似：“数据保留：100％”......并且通过使用它，您将在每次迭代后清除屏幕。
//         // process.stdout.write(`\x1Bc\rData left: ${currentPercentage}%`)

//         //使用\\e[K清除光标位置到行尾的所有字符。
//         // process.stdout.write("000");
//         // process.stdout.write("\n111");
//         // process.stdout.write("\n222");
//         // process.stdout.write("\r\x1b[K")
//         // process.stdout.write("333");



//         /*自定义暂停器 */
//         // var a=0
//         // var b=setInterval(()=>{
//         //     console.log(`嘤嘤嘤${a++}`);
//         //     setTimeout(() => {
//         //         console.clear();
//         //     }, 500); 
//         // },1000)
//         for (let i = 0; i < 100; i++) {

//             // b; 
//             //进度条
//             process.stdout.write(`\x1Bc\rData left: ${i}%`)
//             sleep.sleep(1);
//         }

//         /*自定义sleep */
//         // function sleep(d){
//         //     for(var t = Date.now();Date.now() - t <= d;);
//         // }
//         // sleep(5000);

//         // process.stdout.write(
//         //     process.platform === 'win32' ? '\x1B[2J\x1B[0f' : '\x1B[2J\x1B[3J\x1B[H'
//         // );
//         // function sleep(ms){
//         //     Promise((resolve)=>setTimeout(resolve,ms));
//         // }
//         // async function test(){
//         //   var temple=await sleep(1000);
//         //   console.log(1111)
//         //   return temple
//         // }
//         // test();











//         // close the stream
//         rl.close();
//     });

// });

/*清空运行窗口 */
// var process = require('process');
// console.log("\33[2J");
// process.stdin.on('readable', () => {
//   var chunk = process.stdin.read();
//   if (chunk !== null) {
//     process.stdout.write(`data: ${chunk}`);
//   }
// });
// process.stdin.on('end', () => {
//   process.stdout.write('end');
// });




/* */
// var readline = require('readline'); 
// var rl = readline.createInterface(process.stdin, process.stdout);
// rl.setPrompt('Test> '); 
// rl.prompt();
// rl.on('line', function(line) { 
//  switch(line.trim()) {
//   case 'copy':
//    console.log("复制");
//    break;
//   case 'hello':
//    console.log('world!');
//    break;
//   case 'close':
//    rl.close();
//    break;
//   default:
//    console.log('没有找到命令！');
//    break;
//  }
//  rl.prompt();
// });
// rl.on('close', function() { 
//  console.log('bye bye!');
//  process.exit(0);
// });


/**
 * Created by Administrator on 2015/9/10.
 */
// 引入readline模块
// var readline = require('readline');
// var rl = readline.createInterface({ 
//  input: process.stdin,
//  output: process.stdout
// });
// rl.on('line', function(line){ 
//  switch(line.trim()) {
//   case 'copy':
//    console.log("复制");
//    break;
//   case 'hello':
//    rl.write("Write");
//    console.log('world!');
//    break;
//   case 'close':
//    rl.close();
//    break;
//   default:
//    console.log('没有找到命令！');
//    break;
//  }
// });
// rl.on('close', function() { 
//  console.log('bye bye');
//  process.exit(0);
// });



/**
 * Created by Administrator on 2015/9/10.
 */
// 引入readline模块
// var readline = require('readline');
// //创建readline接口实例
// var rl = readline.createInterface({ 
//  input:process.stdin,
//  output:process.stdout
// });
// // question方法
// rl.question("你叫什么？",function(answer){ 
//  console.log("名字是："+answer);
//  // 不加close，则不会结束
//  rl.close();
// });
// // close事件监听
// rl.on("close", function(){ 
//  // 结束程序
//  process.exit(0);
// });



/* */
// var scanf=require('scanf');
// var arr=new Array();
// var str;
// //str=scanf("%s");
// //使用“%s”只能匹配連續的字元串，如果想要輸入數組“12 26 35 48 78”形式的字元串，使用“%s”只能獲取到“12”，後面內容會自動忽略
// //需要使用“%S”匹配一整行
// str=scanf("%S");
// arr=str.split(' ');
// for(var i=0;i<arr.length;i++){
// 	arr[i]=parseInt(arr[i]);   //強制轉換為number類型
// }
// console.log("arr",arr);






/*node.js | 从控制台获得输入并输出（同步方式）*/
// process.stdin.setEncoding('utf8');
// // This function reads only one line on console synchronously. After pressing `enter` key the console will stop listening for data.
// function readlineSync() {
//     return new Promise((resolve, reject) => {
//         process.stdin.resume();
//         process.stdin.on('data', function (data) {
//             process.stdin.pause(); // stops after one line reads
//             resolve(data);
//         });
//     });
// }
// // entry point
// async function main() {
//     let inputLine1 = await readlineSync();
//     console.log('inputLine1 = ', inputLine1);
//     let inputLine2 = await readlineSync();
//     console.log('inputLine2 = ', inputLine2);
//     console.log('bye');
// }
// main();


/*与readline模块相比，使用prompt` 相对容易。 您无需显式配置可读和可写流。 */
// const prompt = require('prompt');
// // start the prompt
// prompt.start();
// // ask user for the input
// prompt.get(['name', 'country'], (err, result) => {
//     if (err) {
//         throw err;
//     }
//     // print user details
//     console.log(`${result.name} is from ${result.country}`);
// });


/*处理密码提示模块可以更轻松地安全地要求用户输入密码。 它将屏蔽输入，而不显示密码的实际字符： */
// const prompt = require('prompt');
// // start the prompt
// prompt.start();
// // define properties schema
// var schema = {
//     properties: {
//         name: {
//             pattern: /^[a-zA-Z\s\-]+$/,
//             message: 'Name must be only letters, spaces, or dashes',
//             required: true
//         },
//         password: {
//             hidden: true
//         }
//     }
// };
////注意上例中的pattern属性。 它确保在移至下一个属性输入之前，正确验证了我们从用户那里收到的name`属性输入
// // ask user for the input
// prompt.get(schema, (err, result) => {
//     if (err) {
//         throw err;
//     }
//     // print user credentials
//     console.log(`${result.name} / ${result.password}`);
// });



/* 向对象添加属性提示模块提供了另一个名为addProperties()的便捷方法，可通过从命令行添加属性数据来扩展现有对象：*/
// const prompt = require('prompt');
// // start the prompt
// prompt.start();
// // create an object
// const user = {
//     name: 'John Doe',
//     country: 'USA'
// };
// // extend `user` object
// prompt.addProperties(user, ['email', 'age'], (err) => {
//     if (err) {
//         throw err;
//     }
//     // print modified object
//     console.dir(user);
// });


// 'abc'.padStart(10, "foo");  // "foofoofabc"
// 'abc'.padStart(6,"123465"); // "123abc"
// 'abc'.padStart(8, "0");     // "00000abc"
// 'abc'.padStart(1);          // "abc" 

// 'abc'.padEnd(10);          // "abc       "
// 'abc'.padEnd(10, "foo");   // "abcfoofoof"
// 'abc'.padEnd(6, "123456"); // "abc123"
// console.log('abc'.padEnd(1));           // "abc"
// // 命令终端输出当前宽高，可以尝试改变终端窗口尺寸以得到不同的结果
// // 获取终端高： process.stdout.columns
// // 获取终端宽： process.stdout.rows
// console.log(`Terminal size: ${process.stdout.columns} * ${process.stdout.rows}`);

// 这里用到一个很实用的 npm 模块，用以在同一行打印文本
// var slog = require('single-line-log').stdout;
//  slog("111");
// // 封装的 ProgressBar 工具
// function ProgressBar(description, bar_length){
//  // 两个基本参数(属性)
//  this.description = description || 'Progress';    // 命令行开头的文字信息
//  this.length = bar_length || 25;           // 进度条的长度(单位：字符)，默认设为 25

//  // 刷新进度条图案、文字的方法
//  this.render = function (opts){
//   var percent = (opts.completed / opts.total).toFixed(4);  // 计算进度(子任务的 完成数 除以 总数)
//   var cell_num = Math.floor(percent * this.length);       // 计算需要多少个 █ 符号来拼凑图案

//   // 拼接黑色条
//   var cell = '';
//   for (var i=0;i<cell_num;i++) {
//    cell += '█';
//   }

//   // 拼接灰色条
//   var empty = '';
//   for (var i=0;i<this.length-cell_num;i++) {
//    empty += '░';
//   }

//   // 拼接最终文本
//   var cmdText = this.description + ': ' + (100*percent).toFixed(2) + '% ' + cell + empty + ' ' + opts.completed + '/' + opts.total;

//   // 在单行输出文本
//   slog(cmdText);
//  };
// }
// // 初始化一个进度条长度为 50 的 ProgressBar 实例
// var pb = new ProgressBar('下载进度', 50);

// // 这里只是一个 pb 的使用示例，不包含任何功能
// var num = 0, total = 200;
// function downloading() {
//  if (num <= total) {
//   // 更新进度条
//   pb.render({ completed: num, total: total });

//   num++;
//   setTimeout(function (){
//    downloading();
//   }, 500)
//  }
// }
// downloading();



// const readline = require('readline');
// readline.emitKeypressEvents(process.stdin);
// process.stdin.setRawMode(true);
// process.stdin.on('keypress', (str, key) => {
//   console.log(str)
//   console.log(key)
// })


//密码
// const stdout = process.stdout
// const stdin = process.stdin
// //console.log('isTTY:', stdin.isTTY)
// stdout.write("password:")
// stdin.setRawMode(true)
// let input = ''
// const pn = (chunk) => {
//     const c = chunk.toString()
//     switch (c) {
//         case '\u0004': // ctrl + d
//         case '\r':
//         case '\n':
//             //console.log(1)
//             stdin.removeListener('data', pn)
//             console.log('\nyour password is:', input)
//             stdin.setRawMode(false)
//             stdin.pause()
//             break;
//         case '\u0003': // ctrl + c
//             //console.log(2)
//             stdin.removeListener('data', pn)
//             stdin.setRawMode(false)
//             stdin.pause()
//         default:
//             //console.log(3)
//             const code = c.charCodeAt(0)
//             if (code === 8) { // 如果c是控制字符中的删除字符则执行删除操作
//                 //console.log('delete', code)
//                 if (input.length !== 0) {
//                     stdout.moveCursor(-1)
//                     stdout.clearScreenDown()
//                 }
//                 input = input.slice(0, input.length - 1)
//                 break;
//             } else if(code >= 48 && code <= 126){ //可显字符
//                 input += c
//                 stdout.write('')
//             }
//     }
// }
// stdin.on('data', pn)

//转为原始
// process.stdin.setRawMode(true)
// process.stdin.on("data",(data)=>{
//   console.log(data)
// })



// process.stdin.resume();
// process.stdin.setEncoding("utf-8");
// var input_data = "";
// process.stdin.on("data", function(input) {
//   input_data += input;//Reading input from STDIN
//   if (input === "exit\n") {
//     process.exit();
//   }
// });
// process.stdin.on("end", function() {
//   main(input_data);
// });
// function main(input) {
//   process.stdout.write(input);
// }



/*const http = require('http');
const readline = require('readline');
// 创建
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});
// 接口地址
// http://www.weather.com.cn/data/cityinfo/101010100.html
var root_url = 'http://www.weather.com.cn/data/cityinfo/';
// 城市列表
var city_list = {
    '1':{'name':'北京', 'code':'101010100'},
    '2':{'name':'上海', 'code':'101020100'},
    '3':{'name':'广州', 'code':'101280101'},
    '4':{'name':'深圳', 'code':'101280601'},
    '5':{'name':'珠海', 'code':'101280701'},
    '6':{'name':'杭州', 'code':'101210101'},
    '7':{'name':'福州', 'code':'101230101'},
    '8':{'name':'厦门', 'code':'101230201'},
};
// 缓存列表
var cache_list = new Object();
console.log("\n ============ 城市天气查询 ============ \n");
dump_city_list();
// 设置提示信息
rl.setPrompt('请输入城市编号：');
// 打印提示信息
rl.prompt();
// 绑定事件
rl.on('line', (line)=> {
    // 获取输入的字符串  并去掉多余的空格
    var id =  line.trim();
    // 如果是列表
    if(id === 'list'){
        dump_city_list();
        rl.prompt();
        return false;
    }
    // 转换成数字
    id = parseInt(id);
    if(isNaN(id)){
        console.log("\n 请输入正确的城市编号！或者输入 list 获取城市列表！\n");
        rl.prompt();
        return false;
    }
    // 获取城市代码
    var  current_city = city_list[id]
    if(!current_city || !current_city.code){
        console.log("\n 没有找到该城市的天气信息 \n");
        rl.prompt();
        return false;;
    }
    if(cache_list[id.toString()]){
        console.log(cache_list[id.toString()]);
        rl.prompt();
        return true;
    }
    // 组装查询URL
    var url = root_url +  current_city.code +'.html';
    // 发送请求
    http.get(url, function (res) {
        var data = '';
        res.on('data', function (chunk) {
            data += chunk;
        });
        res.on("end", function () {
            data = JSON.parse(data);
            if(!data || !data.weatherinfo){
                console.log("\n 网络错误！请稍后重试！");
                rl.prompt();
                return false;
            }
            data = data.weatherinfo;
            var dump_str = "\n"+"     "+data.city+'     天气：'+data.weather+'     温度：'+data.temp2 +'     更新时间：'+data.ptime+"   \n";
            // 写入缓存
            id = id.toString();
            if(!cache_list[id]){
               cache_list[id] = dump_str;
            }
            console.log(dump_str);
            rl.prompt();
            return true;
        });
     // 出错 返回信息
     }).on("error", function () {
         console.log("\n 网络错误！请稍后重试！");
         rl.prompt();
         return true;
     })
}).on('close', ()=>{
    console.log('已退出！');
    process.exit(0);
})
// 打印城市列表
function dump_city_list(){
  console.log("\n");
  console.log(" === 编号 === 城市名称 === 城市编号 === \n");
  for (var key in city_list){
    console.log('      '+ key+'         '+ city_list[key].name +'       '+ city_list[key].code);
    console.log(" ====================================== \n");
  }
}*/

// //此功能仅同步读取控制台上的一行。 按“ enter”键后，控制台将停止监听数据。
// function readlineSync() {
//     return new Promise((resolve, reject) => {
//         process.stdin.resume();
//         process.stdin.on('data', function (data) {
//             process.stdin.pause(); // stops after one line reads
//             resolve(data);
//         });
//     });
// }
// // entry point
// async function main() {
//     let inputLine1 = await readlineSync();
//     console.log('inputLine1 = ', inputLine1);
//     let inputLine2 = await readlineSync();
//     console.log('inputLine2 = ', inputLine2);
//     console.log('bye');
// }
// main();



/*
const readline = require('readline');
readline.clearScreenDown(process.stdout);
const rl = readline.createInterface({
 input: process.stdin,
 output: process.stdout
});
const imgArr = ['/', '-', '\\'];
let index = 0;
setInterval(() => {
 readline.clearLine(process.stdout, -1);
 readline.moveCursor(process.stdout, -1, 0);
 rl.write(imgArr[index]);
 if(index === 2){
 index=0;
 }else{
 index++;
 }
}, 200);
*/


// const stdin = process.stdin
const stdout = process.stdout
// stdin.setEncoding('utf-8')
const rows = stdout.rows
// let lineTag = 1
// console.clear()
// //折中
// // for (let i = 0; i < (rows - 2) / 2; i++) {
// //     stdout.write('\n')
// // }
// stdout.write(`-------------chating room---------------`, () => {
//     stdout.cursorTo(0, rows)
// })
// //清除输入记录
// const pn = (chunk) => {
//     let user = 'otirik'
//     const data = `[${lineTag}]${user}: ${chunk}`.trim()
//     stdout.cursorTo(0, rows -3, () => {   //字符出现的位置
//         stdout.write(data, () => {     //开始写入
//             stdout.cursorTo(0, rows -2, () => {     //要清空的位置
//                 stdout.clearLine(1, () => {    //清空
//                     stdout.cursorTo(0, rows)  //最后定位的位置
//                 })
//             })
//         })
//         // stdout.on('line', (data) => {
//         //     stdout.cursorTo(0, rows - 2, () => {
//         //         stdout.clearLine(1, () => {
//         //             stdout.cursorTo(0, rows)
//         //                     console.log(data)
//         //         })
//         //     })
//         // })
//     })
//     lineTag++
// }
// stdin.on('data', pn);  //调用函数



const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
// console.clear()
// console.log('111')
// readline.cursorTo(process.stdout, 0, process.stdout.rows)
// rl.on('line', (data) => {                                          //调用
//     readline.cursorTo(process.stdout, 0, process.stdout.rows - 3, () => {   //字符出现的位置
//         process.stdout.write(data, () => {     //开始写入
//             readline.cursorTo(process.stdout, 0, process.stdout.rows - 2, () => { //要删除字符的位置
//                 readline.clearLine(process.stdout, 0, () => {                //删除字符
//                     readline.cursorTo(process.stdout, 0, process.stdout.rows)   //字符出现的位置
//                 })
//             })
//         })
//     })
// })

console.clear()
console.log('111')
readline.cursorTo(process.stdout, 0, process.stdout.rows)
rl.on('line', (line) => {                                          //调用
    readline.cursorTo(process.stdout, 0, process.stdout.rows - 3, () => {   //字符出现的位置
        // process.stdout.write(data, () => {     //开始写入
            readline.cursorTo(process.stdout, 0, process.stdout.rows - 2, () => { //要删除字符的位置
                readline.clearLine(process.stdout, 0, () => {                //删除字符
                    readline.cursorTo(process.stdout, 0, process.stdout.rows)   //字符出现的位置
                })
            })
        // })
    })
})


// console.clear()
// console.log('111')
// async function asyncReadFile() {
//     readline.cursorTo(process.stdout, 0, process.stdout.rows)
//     await rl.on('line', (data) => {                                          //调用
//         readline.cursorTo(process.stdout, 0, process.stdout.rows - 3, () => {   //字符出现的位置
//             process.stdout.write(data, () => {     //开始写入
//                 readline.cursorTo(process.stdout, 0, process.stdout.rows - 2, () => { //要删除字符的位置
//                     readline.clearLine(process.stdout, 0, () => {                //删除字符
//                         readline.cursorTo(process.stdout, 0, process.stdout.rows)   //字符出现的位置
                      
//                     })
//                 })
//             })
//         })
//     })
//     return 'q';
// }

// asyncReadFile().then(function(data) {
//     readline.cursorTo(process.stdout, 0, 0)
//     console.log(data);
// });

// console.log(asyncReadFile())

// // asyncReadFile()
// // readline.cursorTo(process.stdout, 0, 0)
// // console.log("finish");



// console.clear();
// var p = new Promise(function(resolve, reject){
//     //做一些异步操作
//     process.stdout.cursorTo(0, process.stdout.rows)
//     readline.cursorTo(process.stdout, 0, process.stdout.rows)
//     rl.on('line', (data) => {                                          //调用
//         readline.cursorTo(process.stdout, 0, process.stdout.rows - 3, () => {   //字符出现的位置
//             process.stdout.write(data, () => {     //开始写入
//                 readline.cursorTo(process.stdout, 0, process.stdout.rows - 2, () => { //要删除字符的位置
//                     readline.clearLine(process.stdout, 0, () => {                //删除字符
//                         readline.cursorTo(process.stdout, 0, process.stdout.rows)   //字符出现的位置
//                     })
//                 })
//             })
//         })
//     })
//     console.log("111");   
// });
// readline.cursorTo(process.stdout, 0, 0)
// console.log("嘤嘤嘤");
// setInterval(function(){
//     readline.cursorTo(process.stdout, 0, 0)
//     console.log('执行完成');
// }, 2000);