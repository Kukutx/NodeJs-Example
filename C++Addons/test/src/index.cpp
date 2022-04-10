#include <napi.h>
#include <string>
#include "greeting.h"

// 定义一个返回类型为 Napi String 的 greetHello 函数, 注意此处的 info
// Napi::String greetHello(const Napi::CallbackInfo& info) {
//   Napi::Env env = info.Env();
//   std::string result = helloUser("Lorry");
//   return Napi::String::New(env, result);
// }

Napi::String greetHello(const Napi::CallbackInfo& info) {
  Napi::Env env = info.Env();
  std::string user = (std::string) info[0].ToString();
  std::string result = helloUser(user);
  return Napi::String::New(env, result);
}

// 设置类似于 exports = {key:value}的模块导出
Napi::Object Init(Napi::Env env, Napi::Object exports) {
  exports.Set(
    Napi::String::New(env, "greetHello"), // key
    Napi::Function::New(env, greetHello)  // value
  );

  return exports;
}

NODE_API_MODULE(greet, Init)

/*
注意这里你看到很多的 Napi:: 这样的书写, 其实这就是在 js 与 C++之间的数据格式桥梁, 定义双方都看得懂的数据类型.
这里经历了以下流程:

导入napi.h头文件, 他会解析到下面会说的 binding.gyp 指定的路径中
导入 string 标准头文件和 greeting.h自定义头文件. 注意使用 ""和<>的区别, ""会查找当前路径, 详情请查看
使用 Napi:: 开头的都是使用的 node-addon-api 的头文件. Napi 是一个命名空间. 因为宏不支持命名空间, 所以 NODE_API_MODULE 前没有
NODE_API_MODULE是一个node-api(N-API)中封装的NAPI_MODULE宏中提供的函数(宏). 它将会在js 使用require导入 Native Addon的时候被调用.
第一个参数为唯一值用于注册进 node 里表示导出模块名. 最好与 binding.gyp 中的 target_name 保持一致, 只不过这里是使用一个标签 label 而不是字符串的格式
第二个参数是 C++的函数, 他会在 Nodejs开始注册这个方法的时候进行调用.分别会传入 env 和 exports参数
env值是Napi::env类型, 包含了注册模块时的环境(environment), 这个在 N-API 操作时被使用. Napi::String::New表示创建一个新的Napi::String类型的值.这样就将 helloUser的std:string转换成了Napi::String
exports是一个module.exports的低级 API, 他是Napi::Object类型, 可以使用Set方法添加属性, 参考文档, 该函数一定要返回一个exports
*/