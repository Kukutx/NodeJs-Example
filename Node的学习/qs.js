const qs=require("querystring");
// let string="name=wangyi&pass=123&sex=0";
// let obj=qs.parse(string);
// let obj=qs.parse(string,'&','=');//切分键值对
// let string="name-wangyi#pass-123#sex-0";
// let obj=qs.parse(string,'#','-');//切分键值对
// //将query字符串变成query对象
// console.log(obj);

// //stringfy
// let obj={ name: 'wangyi', pass: '123', sex: '0' };
// let string=qs.stringify(obj,'^','?');    //设置键值对
// console.log(string);

// //编码
// let strinfg="w=你好&foo=bar";
// let result=qs.escape(strinfg);
// console.log(result);
//解码  url编码
let escape="w%3D%E4%BD%A0%E5%A5%BD%26foo%3Dbar";
console.log(qs.unescape(escape));

