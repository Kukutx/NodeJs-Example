// hello.js
const addon = require('./build/Release/addon');
//hello
// console.log(addon.hello());
//函数传参
// console.log('This should be eight:', addon.add(3, 0));
//回调
// addon((msg) => {
//     console.log(msg);
//   // 打印: 'hello world'
// });
//对象工厂
// const obj1 = addon('hello');
// const obj2 = addon('world');
// console.log(obj1.msg, obj2.msg);
// // 打印: 'hello world'
//函数工厂
// const fn = addon();
// console.log(fn());
// // 打印: 'hello world'
// 包装 C++ 对象
// const obj = new addon.MyObject(10);
// console.log(obj.plusOne());
// // 打印: 11
// console.log(obj.plusOne());
// // 打印: 12
// console.log(obj.plusOne());
// // 打印: 13
//包装对象的工厂
/*也可以使用一个工厂模式，避免显式地使用 JavaScript 的 new 操作来创建对象实例
 const obj = addon.createObject(10);// 而不是：// const obj = new addon.Object(); */
// const createObject = require('./build/Release/addon');
// const obj = createObject(10);
// console.log(obj.plusOne());
// // 打印: 11
// console.log(obj.plusOne());
// // 打印: 12
// console.log(obj.plusOne());
// // 打印: 13
// const obj2 = createObject(20);
// console.log(obj2.plusOne());
// // 打印: 21
// console.log(obj2.plusOne());
// // 打印: 22
// console.log(obj2.plusOne());
// // 打印: 23
//传递包装的对象
const obj1 = addon.createObject(10);
const obj2 = addon.createObject(20);
const result = addon.add(obj1, obj2);
console.log(result);
// 打印: 30