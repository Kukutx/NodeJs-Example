# 在Node.js中使用C ++模块

对JavaScript程序员来说，Node.js确实是我们作为服务端开发的首选语言。Node.js的性能优势源于其使用Google的V8引擎，使用非阻塞式的I / O模型，依靠事件驱动。但涉及密集型计算的场景时，Node.js不一定能够有很优秀的表现。还好有C++ Addons的机制，能够使得我们编写原生的C++模块，并且能够在Node.js中调用它。

### 为何要使用C++模块
C++社区庞大，我想在我们现成的Node.js应用中使用某个C++模块。
密集型计算场景，并且对性能有极大要求。
举个例子：Fabonacci
斐波那契数列通常解法是以递归地方式来完成，在这里，为了体现Node.js中调用C++模块的优势，我们并不在Fabonacci中使用缓存的机制。

在Node.js中，根据Fabonacci定义，我们编写了如下代码，fabonacci.js：
-----------------
    // fabonacci.js
    function fabonacciNodeJS(n) {
      if (n === 0) {
        return 0;
      }
      if (n === 1) {
        return 1;
      }
      return fabonacciNodeJS(n - 1) + fabonacciNodeJS(n - 2);
    }
    
    function TestFabonnacci(func, env, n) {
      const start = (new Date()).getTime();
      const result = func(n);
      const end = (new Date()).getTime();
      console.log(`fabonacci(${n}) run in ${env} result is ${result}, cost time is ${end - start} ms.`);
    }

    TestFabonnacci(fabonacciNodeJS, 'Native Node.js', 40);
可以在命令行中运行这一段程序，结果如下：

    fabonacci(40) run in Native Node.js result is 102334155, cost time is 1125 ms.
为了体现密集型计算场景时在Node.js中使用C++拓展模块的优势，我根据C++ Addons编写了如下代码，fabonacci.cc：

    // fabonacci.cc
    #include <node.h>

    namespace fabonacci {
     
      using namespace v8;

      static inline size_t runFabonacci(size_t n) {
        if (n == 0)
        {
          return 0;
        }
        if (n == 1)
        {
          return 1;
        }
        return runFabonacci(n - 1) + runFabonacci(n - 2);
      }

      static void Fabonacci(const FunctionCallbackInfo<Value>& args) {
        Isolate* isolate = args.GetIsolate();
        // 检查参数类型
        if (!args[0]->IsNumber())
        {
          isolate->ThrowException(Exception::Error(String::NewFromUtf8(isolate, "argument type must be Number")));
        }
        size_t n = args[0]->NumberValue();
        Local<Number> num = Number::New(isolate, runFabonacci(n));
        args.GetReturnValue().Set(num);
      }

      void init(Local<Object> exports, Local<Object> module) {
        NODE_SET_METHOD(module, "exports", Fabonacci);
      }

      NODE_MODULE(NODE_GYP_MODULE_NAME, init)

    }
    修改之前的fabonacci.js，测试以上C++拓展程序：

    // fabonacci.js
    const fabonacciCPP = require('./build/Release/fabonacci');

    function fabonacciNodeJS(n) {
      if (n === 0) {
        return 0;
      }
      if (n === 1) {
        return 1;
      }
      return fabonacciNodeJS(n - 1) + fabonacciNodeJS(n - 2);
    }

    function TestFabonnacci(func, env, n) {
      const start = (new Date()).getTime();
      const result = func(n);
      const end = (new Date()).getTime();
      console.log(`fabonacci(${n}) run in ${env} result is ${result}, cost time is ${end - start} ms.`);
    }

    TestFabonnacci(fabonacciNodeJS, 'Native Node.js', 40);
    TestFabonnacci(fabonacciCPP, 'C++ Addon', 40);
运行上述程序，结果如下：

    fabonacci(40) run in Native Node.js result is 102334155, cost time is 1120 ms.
    fabonacci(40) run in C++ Addon result is 102334155, cost time is 587 ms.
可以看到，在Node.js中调用C++拓展模块，计算n = 40的斐波那契数，速度快了接近一倍。

## 从Hello World开始
现在，我们可以从书写一个Hello World来介绍如何编写一个C++拓展，并在Node.js模块中调用：

以下是一个使用C++ Addons编写的一个Hello World模块，我们可以在Node.js代码中调用这一个模块。

    #include <node.h>

    namespace helloWorld {
     
      using namespace v8;

      static void HelloWorld(const FunctionCallbackInfo<Value>& args) {
        // isolate当前的V8执行环境，每个isolate执行环境相互独立
        Isolate* isolate = args.GetIsolate();
        // 设定返回值
        args.GetReturnValue().Set(String::NewFromUtf8(isolate, "Hello, World!"));
      }

      static void init(Local<Object> exports, Local<Object> module) {
        // 设定module.exports为HelloWorld函数
        NODE_SET_METHOD(module, "exports", HelloWorld);
      }
      // 所有的 Node.js 插件必须以以下形式模式的初始化函数
      NODE_MODULE(NODE_GYP_MODULE_NAME, init)

    }
以上C++代码相当于以下JavaScript代码：

module.exports.hello = () => 'world';
首先，在工程根目录下创建一个名为binding.gyp的文件，如下：

    {
      "targets": [
        {
          "target_name": "fabonacci",
          "sources": [ "fabonacci.cc" ]
        }
      ]
    }
binding.gyp使用一个类似JSON的格式来描述模块的构建配置。然后使用node-gyp把我们书写的C++模块源码编译为二进制模块，我们可以使用
    npm install -g node-gyp全局安装node-gyp：

在项目根目录下执行：

    node-gyp configure
    node-gyp build
编译构建成功之后，可执行文件fabonacci.node会在项目根目录下的/build/Release目录下，我们可以在Node.js引入该模块：

    const hello = require('./build/Release/hello');
    console.log(hello()); // Hello, World!
V8数据类型和JavaScript数据类型的转换
V8数据类型转换为JavaScript数据类型
根据v8文档使用v8::Local<v8::Value>声明的数据将会被V8的Garbage Collector管理。我们书写如下的C++模块示例，在C++模块中声明如下的V8类型的变量，并导出给JavaScript模块使用：

    #include <node.h>

    namespace datas {
      using namespace v8;

    static void MyFunction(const FunctionCallbackInfo<Value> &args) {
       Isolate* isolate = args.GetIsolate();
       args.GetReturnValue().Set(String::NewFromUtf8(isolate, "MyFunctionReturn"));
    }

    static void Datas(const FunctionCallbackInfo<Value> &args) {
    Isolate* isolate = args.GetIsolate();

    // 声明一个V8的Object类型的变量
    Local<Object> object = Object::New(isolate);
    // 声明一个V8的Number类型的变量
    Local<Number> number = Number::New(isolate, 0);
    // 声明一个V8的String类型的变量
    Local<String> string = String::NewFromUtf8(isolate, "string");
    // 声明一个V8的Function类型的变量
    Local<FunctionTemplate> tpl = FunctionTemplate::New(isolate, MyFunction);
    Local<Function> func = tpl->GetFunction();
    // 声明一个V8的Array类型的变量
    Local<Array> array = Array::New(isolate);
    // 给array赋值
    for (int i = 0; i < 10; ++i)
    {
      array->Set(i, Number::New(isolate, i));
    }
    // 声明一个V8的Boolean类型的变量
    Local<Boolean> boolean = Boolean::New(isolate, true);
    // 声明一个V8的Undefined类型的变量
    Local<Value> undefined = Undefined(isolate);
    // 声明一个V8的Null类型的变量
    Local<Value> nu = Null(isolate);
    // 设定函数的名称
    func->SetName(String::NewFromUtf8(isolate, "MyFunction"));
    // 给对象赋值
    object->Set(String::NewFromUtf8(isolate, "number"), number);
    object->Set(String::NewFromUtf8(isolate, "string"), string);
    object->Set(String::NewFromUtf8(isolate, "function"), func);
    object->Set(String::NewFromUtf8(isolate, "array"), array);
    object->Set(String::NewFromUtf8(isolate, "boolean"), boolean);
    object->Set(String::NewFromUtf8(isolate, "undefined"), undefined);
    object->Set(String::NewFromUtf8(isolate, "null"), nu);
    args.GetReturnValue().Set(object);
  }

  static void init(Local<Object> exports, Local<Object> module) {
    NODE_SET_METHOD(module, "exports", Datas);
  }

  NODE_MODULE(NODE_GYP_MODULE_NAME, init)
}
使用node-gyp工具构建上述模块，在Node.js模块中引入：

    const datas = require('./build/Release/datas');
    console.log(datas());
运行结果：



## #JavaScript数据类型转换为V8数据类型
例如我们在参数中传入了一个Number数据类型的JavaScript变量，可以使用v8::Number::Cast方法将JavaScript数据类型转换为V8数据类型，我们创建了如下模块factory.cc，一个工厂模式创建对象的示例：

    #include <node.h>

    namespace factory {
      using namespace v8;
    
      static void Factory(const FunctionCallbackInfo<Value> &args) {
        Isolate* isolate = args.GetIsolate();
        Local<Object> object = Object::New(isolate);
    
        object->Set(String::NewFromUtf8(isolate, "name"), Local<String>::Cast(args[0])); // Cast方法实现JavaScript转换为V8数据     类型
        object->Set(String::NewFromUtf8(isolate, "age"), Local<Number>::Cast(args[1])); // Cast方法实现JavaScript转换为V8数据类    型
        args.GetReturnValue().Set(object);
      }
    
      static void init(Local<Object> exports, Local<Object> module) {
        NODE_SET_METHOD(module, "exports", Factory);
      }
    
      NODE_MODULE(NODE_GYP_MODULE_NAME, init)
    }
调用上述模块：

    const factory = require('./build/Release/factory');
    console.log(factory('counter', 21)); // { name: 'counter', age: 21 }

