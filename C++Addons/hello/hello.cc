#include <node.h>
#include <v8.h>
 
using namespace v8;
//helloword
namespace helloWorld {
  using namespace v8;
  static void HelloWorld(const FunctionCallbackInfo<Value>& args) {
    // isolate当前的V8执行环境，每个isolate执行环境相互独立
    Isolate* isolate = args.GetIsolate();
    // 设定返回值
     /* 通过 FunctionCallbackInfo<Value>& args 可以设置返回值 */
    args.GetReturnValue().Set(String::NewFromUtf8(isolate, "Hello, World!"));
  }
  static void init(Local<Object> exports, Local<Object> module) {
    // 设定module.exports为HelloWorld函数 /* 设置模块的导出方法 hello */
    /* 等价于 js 模块中的 module.exports.hello = hello */
    NODE_SET_METHOD(module, "exports", HelloWorld);
  }
  // 所有的 Node.js 插件必须以以下形式模式的初始化函数
  NODE_MODULE(hello, init)
}

/*
JavaScript调用C++模块的方法时，会传递一个V8对象，类型为FunctionCallbackInfo<Value>。通过这个V8对象，JavaScript可以向C++接口传递参数，C++函数也可以通过这个对象来向JavaScript回传信息，即设置返回值。在C++接口中，通过参数const FunctionCallbackInfo<Value>& args可以拿到一个Isolate对象，Isolate代表一个V8虚拟机实例。通过args.GetIsolate()可以获取到运行JavaScript调用者的V8虚拟机实例。这个V8实例包含了内存堆，在C++接口中创建V8提供的JavaScript对象类型实例的时候会使用到。例如前面的hello world例子中，在创建一个JS字符串的时候需要传递isolate对象，表示在该V8虚拟机上创建了一个JS字符串对象，之后该字符串便可以被V8虚拟机上运行的JS调用者所使用。

Local是一个模板句柄类，Local<SomeType>代表指向某种类型的句柄。例如模块的exports属性是一个JavaScript对象，句柄类型为Local<Object>。传递给init函数的参数其实是指向相应对象的句柄。

NODE_MODULE是一个宏，设置模块初始化函数为init。init函数中执行模块的初始化，当模块第一次被加载进NodeJS应用中的时候就会执行init函数，init函数中可以设置exports属性将C++接口暴露出去给JavaScript使用。NODE_SET_METHOD用于设置属性或方法，第二个参数为属性名，第三个参数为方法对应的属性值。如果需要给exports对象设置多个属性或方法，可以调用多次NODE_SET_METHOD。exports对象上设置的属性方法将会作为接口暴露给外部使用。

编写NodeJS C++插件必须遵循以下这种模式：必须有一个初始化函数对模块进行初始化（设置方法属性等），然后加上NODE_MODULE(NODE_GYP_MODULE_NAME, Initialize)设置模块名和初始化函数。初始化函数可以有两种写法，第一种写法常用于设置模块的exports对象上的某个属性或方法，第二种写法可用于直接重写整个exports对象。

// 写法1
void Initialize_1(Local<Object> exports) {
  // 进行初始化...
  // example
  // 等价于js模块中的 module.exports.hello = hello
  NODE_SET_METHOD(exports, "hello", hello);
}
NODE_MODULE(NODE_GYP_MODULE_NAME, Initialize_1)

// 写法2
void Initialize_2(Local<Object> exports, Local<Object> module) {
  // 进行初始化...
  // example
  // 等价于js模块中的 module.exports = hello
  NODE_SET_METHOD(module, "exports", hello);
}
NODE_MODULE(NODE_GYP_MODULE_NAME, Initialize_2)
*/
