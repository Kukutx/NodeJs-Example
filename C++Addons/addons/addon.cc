// // hello.cc
// #include <node.h>
// using namespace v8;
// namespace hello{
// void Method(const FunctionCallbackInfo<Value>& args) {
//   Isolate* isolate = args.GetIsolate();
//   args.GetReturnValue().Set(String::NewFromUtf8(isolate, "Hello, World!"));
// }
// void Initialize(Local<Object> exports) {
//   NODE_SET_METHOD(exports, "u", Method);   //设置外部调用方法
// }
// NODE_MODULE(NODE_GYP_MODULE_NAME, Initialize)
// }


// // hello.cc using N-API
// /* N-API 是用于构建本机插件的API。 它独立于底层 JavaScript 运行时（例如 V8），并作为 Node.js 本身的一部分进行维护。
// 此 API 将是跨 Node.js 版本的应用程序二进制接口（Application Binary Interface，ABI）稳定版。 
// 它旨在将插件与底层 JavaScript 引擎中的更改隔离开来，并允许为一个版本编译的模块在更高版本的 Node.js 上运行而无需重新编译。
// 插件使用本文档中概述的相同方法/工具（node-gyp 等）构建/打包。 唯一的区别是原始代码使用的 API 集。
// 不使用 V8 或 Node.js 的原生抽象，而是使用 N-API 中可用的功能。 */
// #include <node_api.h>
// namespace demo {
// napi_value Method(napi_env env, napi_callback_info args) {
//   napi_value greeting;
//   napi_status status;
//   status = napi_create_string_utf8(env, "world", NAPI_AUTO_LENGTH, &greeting);
//   if (status != napi_ok) return nullptr;
//   return greeting;
// }
// napi_value init(napi_env env, napi_value exports) {
//   napi_status status;
//   napi_value fn;
//   status = napi_create_function(env, nullptr, 0, Method, nullptr, &fn);
//   if (status != napi_ok) return nullptr;
//   status = napi_set_named_property(env, exports, "hello", fn);
//   if (status != napi_ok) return nullptr;
//   return exports;
// }
// NAPI_MODULE(NODE_GYP_MODULE_NAME, init)
// }  // namespace demo


// 函数的参数
/* 插件通常会开放一些对象和函数，供运行在 Node.js 中的 JavaScript 访问。
 当从 JavaScript 调用函数时，输入参数和返回值必须与 C/C++ 代码相互映射. */
// addon.cc
// #include <node.h>
// namespace demo {
// using namespace v8;
// // 这是 "add" 方法的实现。
// // 输入参数使用 const FunctionCallbackInfo<Value>& args 结构传入。
// void Add(const FunctionCallbackInfo<Value>& args) {
//   Isolate* isolate = args.GetIsolate();
//   // 检查传入的参数的个数。
//   if (args.Length() < 2) {
//     // 抛出一个错误并传回到 JavaScript。
//     isolate->ThrowException(Exception::TypeError(String::NewFromUtf8(isolate,"参数的数量错误/n")));
//     // args.GetReturnValue().Set(String::NewFromUtf8(isolate, "参数的数量错误/n"));
//     return;
//   }
//   // 检查参数的类型。
//   if (!args[0]->IsNumber() || !args[1]->IsNumber()) {
//     isolate->ThrowException(Exception::TypeError(String::NewFromUtf8(isolate,"参数错误/n")));
//     // args.GetReturnValue().Set(String::NewFromUtf8(isolate, "参数错误/n"));
//     return;
//   }
//   // 执行操作
//   double value = args[0].As<Number>()->Value() + args[1].As<Number>()->Value();
//   Local<Number> num = Number::New(isolate, value);
//   // 设置返回值 (使用传入的 FunctionCallbackInfo<Value>&)。
//   args.GetReturnValue().Set(num);
// //   args.GetReturnValue().Set(args[0]->IsNumber());
// }
// void Init(Local<Object> exports) {
//   NODE_SET_METHOD(exports, "add", Add);
// }
// NODE_MODULE(NODE_GYP_MODULE_NAME, Init)
// }  // 命名空间示例


// 回调
/* 把JavaScript函数传入到一个C++ 函数并在那里执行它们，这在插件里是常见的做法。 以下例子描述了如何调用这些回调 */
// addon.cc
// #include <node.h>
// namespace demo {
// using namespace v8;
// void RunCallback(const FunctionCallbackInfo<Value>& args) {
//   Isolate* isolate = args.GetIsolate();
//   Local<Context> context = isolate->GetCurrentContext();
//   Local<Function> cb = Local<Function>::Cast(args[0]);
//   const unsigned argc = 1;
//   Local<Value> argv[argc] = {
//       String::NewFromUtf8(isolate,"hello world") };
//   cb->Call(context, Null(isolate), argc, argv);
// }
// void Init(Local<Object> exports, Local<Object> module) {
//   NODE_SET_METHOD(module, "exports", RunCallback);
// }
// NODE_MODULE(NODE_GYP_MODULE_NAME, Init)
// }  


// 对象工厂
/* 插件可从 C++ 函数中创建并返回新的对象，如以下例子所示。 一个带有 msg 属性的对象被创建并返回，
该属性会输出传入 createObject() 的字符串 */
// addon.cc
// #include <node.h>
// namespace demo {
// using namespace v8;
// void CreateObject(const FunctionCallbackInfo<Value>& args) {
//   Isolate* isolate = args.GetIsolate();
//   Local<Context> context = isolate->GetCurrentContext();
//   Local<Object> obj = Object::New(isolate);
//   obj->Set(context,String::NewFromUtf8(isolate,"msg"),args[0]->ToString(context).ToLocalChecked()).FromJust();
//   args.GetReturnValue().Set(obj);
// }
// void Init(Local<Object> exports, Local<Object> module) {
//   NODE_SET_METHOD(module, "exports", CreateObject);
// }
// NODE_MODULE(NODE_GYP_MODULE_NAME, Init)
// }  // namespace demo


//函数工厂
/* 另一种常见情况是创建 JavaScript 函数来包装 C++ 函数，并返回到 JavaScript */
// addon.cc
// #include <node.h>
// namespace demo {
// using namespace v8;
// void MyFunction(const FunctionCallbackInfo<Value>& args) {
//   Isolate* isolate = args.GetIsolate();
//   args.GetReturnValue().Set(String::NewFromUtf8(isolate, "hello world"));
// }
// void CreateFunction(const FunctionCallbackInfo<Value>& args) {
//   Isolate* isolate = args.GetIsolate();
//   Local<Context> context = isolate->GetCurrentContext();
//   Local<FunctionTemplate> tpl = FunctionTemplate::New(isolate, MyFunction);
//   Local<Function> fn = tpl->GetFunction(context).ToLocalChecked();
//   // 可以省略这步使它匿名
//   fn->SetName(String::NewFromUtf8(isolate, "theFunction"));
//   args.GetReturnValue().Set(fn);
// }
// void Init(Local<Object> exports, Local<Object> module) {
//   NODE_SET_METHOD(module, "exports", CreateFunction);
// }
// NODE_MODULE(NODE_GYP_MODULE_NAME, Init)
// }  // namespace demo


//包装 C++ 对象
/* 也可以包装 C++ 对象/类使其可以使用 JavaScript 的 new 操作来创建新的实例 */
// addon.cc
// #include <node.h>
// #include "myobject.h"
// namespace demo {
// using namespace v8;
// void InitAll(Local<Object> exports) {
//   MyObject::Init(exports);
// }
// NODE_MODULE(NODE_GYP_MODULE_NAME, InitAll)
// }  // namespace demo


// 包装对象的工厂
/* 在 addon.cc 中实现 createObject() 方法 */
// addon.cc
// #include <node.h>
// #include "myobject.h"
// namespace demo {
// using namespace v8;
// void CreateObject(const FunctionCallbackInfo<Value>& args) {
//   MyObject::NewInstance(args);
// }
// void InitAll(Local<Object> exports, Local<Object> module) {
//   MyObject::Init(exports->GetIsolate());
//   NODE_SET_METHOD(module, "exports", CreateObject);
// }
// NODE_MODULE(NODE_GYP_MODULE_NAME, InitAll)
// }  // namespace demo



//传递包装的对象
/* 除了包装和返回 C++ 对象，也可以通过使用 Node.js 的辅助函数 node::ObjectWrap::Unwrap 进行去包装来传递包装的对象。
 以下例子展示了一个 add() 函数，它可以把两个 MyObject 对象作为输入参数 */
// addon.cc
#include <node.h>
#include <node_object_wrap.h>
#include "myobject.h"
namespace demo {
using namespace v8;
void CreateObject(const FunctionCallbackInfo<Value>& args) {
  MyObject::NewInstance(args);
}
void Add(const FunctionCallbackInfo<Value>& args) {
  Isolate* isolate = args.GetIsolate();
  Local<Context> context = isolate->GetCurrentContext();
  MyObject* obj1 = node::ObjectWrap::Unwrap<MyObject>(args[0]->ToObject(context).ToLocalChecked());
  MyObject* obj2 = node::ObjectWrap::Unwrap<MyObject>(args[1]->ToObject(context).ToLocalChecked());
  double sum = obj1->value() + obj2->value();
  args.GetReturnValue().Set(Number::New(isolate, sum));
}
void InitAll(Local<Object> exports) {
  MyObject::Init(exports->GetIsolate());
  NODE_SET_METHOD(exports, "createObject", CreateObject);
  NODE_SET_METHOD(exports, "add", Add);
}
NODE_MODULE(NODE_GYP_MODULE_NAME, InitAll)
}  // namespace demo