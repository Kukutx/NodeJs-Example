const addon = require('./build/Release/greet.node')
console.log(addon.greetHello("嘤嘤嘤"))

//打包成外包引用
// const addon = require('./build/Release/greet.node')
// module.exports = addon.greetHello