// const fs = require('fs');
// fs.readFile('Jay.txt', 'utf8', function (err, data) {
//     if (err) throw err;
//     console.log(data);
//     fs.readFile('Angela.txt', 'utf8', function (err, data) {
//         if (err) throw err;
//         console.log(data);
//         fs.readFile('Henry.txt', 'utf8', function (err, data) {
//             if (err) throw err;
//             console.log(data);
//         });
//     });
// });
// console.log("finish");

// Promise对象
/* Promise对象能够表示一个异步操作的状态和结果，使用其提供的.then()方法可以将多个多个异步操作“串联”起来，.then()方法本身也返回一个Promise对象。*/
// var readFilePromise = require('fs-readfile-promise');
// readFilePromise('Jay.txt', 'utf8')
//     .then(function(data) {
//         console.log(data);
//         return readFilePromise('Angela.txt', 'utf8');
//     })
//     .then(function(data) {
//         console.log(data);
//         return readFilePromise('Henry.txt', 'utf8');
//     })
//     .then(function(data) {
//         console.log(data);
//     })
//     .catch(function(err) {
//         console.log(err);
//     });
// console.log("finish");

// Generator函数
/*Generator函数（生成器函数）使用 function* 关键字定义，函数中使用yield关键字进行流程控制
，yield后面可以跟任何表达式（普通同步表达式、Promise对象、Generator函数）。
需要特别注意的是，yield关键字必须放在Generator函数当中，否则运行时会报错！
Generator函数的返回值叫做 Generator对象（生成器对象），Generator对象有一个 .next() 方法，
每执行一次.next()方法，就会迭代执行至Generator函数的下一个yield语句位置，并返回一个对象。
该对象包含两个属性：value和done，value存储了yield后面表达式的值；done是一个布尔值，表示Generator函数是否执行完毕。*/
// var readFilePromise = require('fs-readfile-promise');
// function* generator() {
//     yield readFilePromise('Jay.txt', 'utf8');
//     yield readFilePromise('Angela.txt', 'utf8');
//     yield readFilePromise('Henry.txt', 'utf8');
// }
// let gen = generator();
// gen.next().value.then(function(data) {
//     console.log(data);
//     gen.next().value.then(function(data) {
//         console.log(data);
//         gen.next().value.then(function(data) {
//             console.log(data);
//             gen.next();  
//             /* 返回：{ value: undefined, done: true }，表示生成器函数执行结束,
//             generator()是一个生成器函数，其返回值gen是一个生成器对象。gen.next()返回的对象结构如下
//             其中，gen.next().value是一个Promise，表示yield后面的readFilePromise()函数所返回的是一个Promise对象。
//             需要注意的是，生成器函数本身包含的各个异步操作并不能按照顺序串行执行，想要实现串行执行的话，
//             还是需要配合Promise对象及其.then()函数来实现，如本例所示*/
//         });
//     });
// });
// console.log("finish");


//co函数库
/*co函数库是干什么的？co函数库是Generator函数的一种执行器。简单来讲，co函数库用来将上一节中手动执行Generator函数的过程自动化，
这样一来，就使得采用同步思维写异步代码的想法成为现实。作为曾经是完全同步思维的程序员终于看到了曙光。*/
// var co = require('co');
// var readFilePromise = require('fs-readfile-promise');
// //generator()是一个生成器函数
// function* generator() {
//     let data = yield readFilePromise('Jay.txt', 'utf8');
//     console.log(data);
//     data = yield readFilePromise('Angela.txt', 'utf8');
//     console.log(data);
//     data = yield readFilePromise('Henry.txt', 'utf8');
//     console.log(data);
// }
// let gen = generator();  // gen是一个生成器对象
// co(generator()).then(function() {
//     console.log('Generator function is finished!');
// });
// console.log("finish");


// async函数
/*
co库函数已经将Generator函数的执行简化了很多，还能更简单一点吗？答案是：有，那就是async函数。
async函数与Generator函数相比，可以简单地理解为：将Generator函数中的*改为async，将yield改为await，就成了async函数。
async函数与Generator函数相比：
* async函数本身内置了执行器，无需再像Generator函数一样需要引入额外的执行器（如：co执行器）；
* async...await与function*...yield相比，语义更加清晰明了：async表示函数中有异步操作，await表示需要等待异步操作返回结果；
* await后面除了可以跟Promise对象之外，也可以跟基础类型的值，如：数字、字符串、布尔值，而yield后面必须要跟Promise对象；
* async函数的返回值也是
*/
// var readFilePromise = require('fs-readfile-promise');
// async function asyncReadFile() {
//     let data = await readFilePromise('Jay.txt', 'utf8');
//     console.log(data);
//     data = await readFilePromise('Angela.txt', 'utf8');
//     console.log(data);
//     data = await readFilePromise('Henry.txt', 'utf8');  //await 可以将promise对象转换成string
//     console.log(data);

//     // await console.log("嘤嘤嘤");
//     // await console.log("嘤嘤嘤");
//     // await console.log("嘤嘤嘤");
//     // await console.log("嘤嘤嘤");

//     return "Async function is finished!"
// }
// asyncReadFile().then(function(data) {
//     console.log(data);
// });
// console.log("finish");

/************************************************************************************************************************ */

//Promise
/* Promise的构造函数接收一个参数，是函数，并且传入两个参数：resolve，reject，
分别表示异步操作执行成功后的回调函数和异步操作执行失败后的回调函数。其实这里用“成功”和“失败”来描述并不准确，
按照标准来讲，resolve是将Promise的状态置为fullfiled，reject是将Promise的状态置为rejected。不过在我们开始阶段可以先这么理解，
后面再细究概念。 */
// var p = new Promise(function(resolve, reject){
//     //做一些异步操作
//     setTimeout(function(){
//         console.log('执行完成');
//         resolve('随便什么数据');
//     }, 2000);
// });
// console.log("嘤嘤嘤");
/* 在上面的代码中，我们执行了一个异步操作，也就是setTimeout，2秒后，输出“执行完成”，并且调用resolve方法。
运行代码，会在2秒后输出“执行完成”。注意！我只是new了一个对象，并没有调用它，我们传进去的函数就已经执行了，
这是需要注意的一个细节。所以我们用Promise的时候一般是包在一个函数中，在需要的时候去运行这个函数 */
// function runAsync(){
//     var p = new Promise(function(resolve, reject){
//         //做一些异步操作
//         setTimeout(function(){
//             console.log('执行完成');
//             resolve('随便什么数据');
//         }, 2000);
//     });
//     return p;            
// }
// runAsync();
// /*这时候你应该有两个疑问：1.包装这么一个函数有毛线用？2.resolve('随便什么数据');这是干毛的？
// 我们继续来讲。在我们包装好的函数最后，会return出Promise对象，也就是说，执行这个函数我们得到了一个Promise对象。
// 还记得Promise对象上有then、catch方法吧？这就是强大之处了，看下面的代码：*/
// runAsync().then(function(data){
//     console.log(data);      //用来接收resolve或者reject的返回值
//     //后面可以用传过来的数据做些其他操作
//     //......
// });
/* 在runAsync()的返回上直接调用then方法，then接收一个参数，是函数，并且会拿到我们在runAsync中调用resolve时传的的参数。
运行这段代码，会在2秒后输出“执行完成”，紧接着输出“随便什么数据”。这时候你应该有所领悟了，
原来then里面的函数就跟我们平时的回调函数一个意思，能够在runAsync这个异步任务执行完成之后被执行。
这就是Promise的作用了，简单来讲，就是能把原来的回调写法分离出来，在异步操作执行完后，用链式调用的方式执行回调函数。
你可能会不屑一顾，那么牛逼轰轰的Promise就这点能耐？我把回调函数封装一下，给runAsync传进去不也一样吗，就像这样： */
// function runAsync(callback){
//     setTimeout(function(){
//         console.log('执行完成');
//         callback('随便什么数据');
//     }, 2000);
// }
// runAsync(function(data){
//     console.log(data);
// });
/* 效果也是一样的，还费劲用Promise干嘛。那么问题来了，有多层回调该怎么办？如果callback也是一个异步操作，
而且执行完后也需要有相应的回调函数，该怎么办呢？总不能再定义一个callback2，然后给callback传进去吧。
而Promise的优势在于，可以在then方法中继续写Promise对象并返回，然后继续调用then来进行回调操作。 */


//链式操作的用法
/* 所以，从表面上看，Promise只是能够简化层层回调的写法，而实质上，Promise的精髓是“状态”，用维护状态、
传递状态的方式来使得回调函数能够及时调用，它比传递callback函数要简单、灵活的多。所以使用Promise的正确场景是这样的： */
// function runAsync(){
//     var p = new Promise(function(resolve, reject){
//         //做一些异步操作
//         setTimeout(function(){
//             console.log('执行完成');
//             resolve('随便什么数据');
//         }, 2000);
//     });
//     return p;            
// }
// runAsync()
// .then(function(data){
//     console.log(data + '1');
//     return runAsync();
// })
// .then(function(data){
//     console.log(data + '2');
//     return runAsync();
// })
// .then(function(data){
//     console.log(data + '3');
// });

//reject的用法
/*到这里，你应该对“Promise是什么玩意”有了最基本的了解。那么我们接着来看看ES6的Promise还有哪些功能。
我们光用了resolve，还没用reject呢，它是做什么的呢？事实上，我们前面的例子都是只有“执行成功”的回调，
还没有“失败”的情况，reject的作用就是把Promise的状态置为rejected，这样我们在then中就能捕捉到，
然后执行“失败”情况的回调。看下面的代码。*/
// function getNumber(){
//     var p = new Promise(function(resolve, reject){
//         //做一些异步操作
//         setTimeout(function(){
//             var num = Math.ceil(Math.random()*10); //生成1-10的随机数
//             if(num<=5){
//                 resolve(num);
//             }
//             else{
//                 reject('数字太大了');
//             }
//         }, 2000);
//     });
//     return p;            
// }
// getNumber()
// .then(
//     function(data){
//         console.log('resolved');
//         console.log(data);
//         console.log(somedata); //此处的somedata未定义,在resolve的回调中，我们console.log(somedata);而somedata这个变量是没有被定义的。如果我们不用Promise，代码运行到这里就直接在控制台报错了，不往下运行了。
//     }, 
//     // function(reason, data){
//     //     console.log('rejected');
//     //     console.log(reason);
//     // }
// //catch的用法
// /* 我们知道Promise对象除了then方法，还有一个catch方法，它是做什么用的呢？其实它和then的第二个参数一样，用来指定reject的回调，用法是这样：*/
// ).catch(function(reason){
//     console.log('rejected');
//     console.log(reason);
//     /* 效果和写在then的第二个参数里面一样。不过它还有另外一个作用：在执行resolve的回调（也就是上面then中的第一个参数）时，如果抛出异常了（代码出错了），那么并不会报错卡死js，而是会进到这个catch方法中。 */
// });;
// /*getNumber函数用来异步获取一个数字，2秒后执行完成，如果数字小于等于5，我们认为是“成功”了，调用resolve修改Promise的状态。
// 否则我们认为是“失败”了，调用reject并传递一个参数，作为失败的原因。运行getNumber并且在then中传了两个参数，then方法可以接受两个参数，
// 第一个对应resolve的回调，第二个对应reject的回调。所以我们能够分别拿到他们传过来的数据。多次运行这段代码，你会随机得到下面两种结果 */


//all的用法
/*Promise的all方法提供了并行执行异步操作的能力，并且在所有异步操作执行完后才执行回调。
我们仍旧使用上面定义好的runAsync1、runAsync2、runAsync3这三个函数，看下面的例子：*/
// function runAsync1(){
//     var p = new Promise(function(resolve, reject){
//         //做一些异步操作
//         setTimeout(function(){
//             console.log('异步任务1执行完成');
//             resolve('随便什么数据1');
//         }, 1000);
//     });
//     return p;            
// }
// function runAsync2(){
//     var p = new Promise(function(resolve, reject){
//         //做一些异步操作
//         setTimeout(function(){
//             console.log('异步任务2执行完成');
//             resolve('随便什么数据2');
//         }, 2000);
//     });
//     return p;            
// }
// function runAsync3(){
//     var p = new Promise(function(resolve, reject){
//         //做一些异步操作
//         setTimeout(function(){
//             console.log('异步任务3执行完成');
//             resolve('随便什么数据3');
//         }, 2000);
//     });
//     return p;            
// }
// // Promise.all([runAsync1(), runAsync2(), runAsync3()])
// // .then(function(results){
// //     console.log(results);
// // });
// /* 用Promise.all来执行，all接收一个数组参数，里面的值最终都算返回Promise对象。这样，三个异步操作的并行执行的，
// 等到它们都执行完后才会进到then里面。那么，三个异步操作返回的数据哪里去了呢？都在then里面呢，
// all会把所有异步操作的结果放进一个数组中传给then，就是上面的results。 */
// // race的用法
// /*all方法的效果实际上是「谁跑的慢，以谁为准执行回调」，那么相对的就有另一个方法「谁跑的快，以谁为准执行回调」，
// 这就是race方法，这个词本来就是赛跑的意思。race的用法与all一样，我们把上面runAsync1的延时改为1秒来看一下：*/
// Promise.race([runAsync1(), runAsync2(), runAsync3()])
// .then(function(results){
//     console.log(results);
// });