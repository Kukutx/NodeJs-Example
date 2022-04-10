#include <node.h>
 
namespace factory {
  using namespace v8;
 
  static void Factory(const FunctionCallbackInfo<Value> &args) {
    Isolate* isolate = args.GetIsolate();
    Local<Object> object = Object::New(isolate);
 
    object->Set(String::NewFromUtf8(isolate, "name"), Local<String>::Cast(args[0])); // Cast方法实现JavaScript转换为V8数据类型
    object->Set(String::NewFromUtf8(isolate, "age"), Local<Number>::Cast(args[1])); // Cast方法实现JavaScript转换为V8数据类型
    args.GetReturnValue().Set(object);
  }
 
  static void init(Local<Object> exports, Local<Object> module) {
    NODE_SET_METHOD(module, "exports", Factory);
  }
 
  NODE_MODULE(NODE_GYP_MODULE_NAME, init)
}
