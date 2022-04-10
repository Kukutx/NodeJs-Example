/*
 * @Descripttion: unTitle
 * @Author: yizheng.yuan
 * @Date: 2021-07-19 20:14:18
 * @LastEditors: yizheng.yuan
 * @LastEditTime: 2021-08-23 17:05:40
 */
// c语言指针类型转化 指导链接 https://www.jianshu.com/p/dd9463dead8c

// 不懂的可以微信我号yizheng369

var ffi = require('ffi-napi');

var libm = ffi.Library('./aa.dll', {
  // 函数名 返回类型 传入参数类型2个参数
  add: [ 'int', ['int','int'] ],  // 初始化
  
});

let rel = libm.add(5,4)
console.error('结果：',rel);