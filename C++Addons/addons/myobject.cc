// myobject.cc
//包装 C++ 对象
/* 在 myobject.cc 中，实现要被开放的各种方法。 下面，通过把 plusOne() 添加到构造函数的原型来开放它 */
// #include "myobject.h"
// namespace demo {
// using namespace v8;
// MyObject::MyObject(double value) : value_(value) {
// }
// MyObject::~MyObject() {
// }
// void MyObject::Init(Local<Object> exports) {
//   Isolate* isolate = exports->GetIsolate();
//   Local<Context> context = isolate->GetCurrentContext();
//   Local<ObjectTemplate> addon_data_tpl = ObjectTemplate::New(isolate);
//   addon_data_tpl->SetInternalFieldCount(1);  // MyObject::New() 的一个字段。
//   Local<Object> addon_data = addon_data_tpl->NewInstance(context).ToLocalChecked();
//   // 准备构造函数模版
//   Local<FunctionTemplate> tpl = FunctionTemplate::New(isolate, New, addon_data);
//   tpl->SetClassName(String::NewFromUtf8(isolate, "MyObject"));
//   tpl->InstanceTemplate()->SetInternalFieldCount(1);
//   // 原型
//   NODE_SET_PROTOTYPE_METHOD(tpl, "plusOne", PlusOne);
//   Local<Function> constructor = tpl->GetFunction(context).ToLocalChecked();
//   addon_data->SetInternalField(0, constructor);
//   exports->Set(context, String::NewFromUtf8(isolate, "MyObject"),constructor).FromJust();
// }
// void MyObject::New(const FunctionCallbackInfo<Value>& args) {
//   Isolate* isolate = args.GetIsolate();
//   Local<Context> context = isolate->GetCurrentContext();
//   if (args.IsConstructCall()) {
//     // 像构造函数一样调用：`new MyObject(...)`
//     double value = args[0]->IsUndefined() ? 0 : args[0]->NumberValue(context).FromMaybe(0);
//     MyObject* obj = new MyObject(value);
//     obj->Wrap(args.This());
//     args.GetReturnValue().Set(args.This());
//   } else {
//     // 像普通方法 `MyObject(...)` 一样调用，转为构造调用。
//     const int argc = 1;
//     Local<Value> argv[argc] = { args[0] };
//     Local<Function> cons = args.Data().As<Object>()->GetInternalField(0).As<Function>();
//     Local<Object> result = cons->NewInstance(context, argc, argv).ToLocalChecked();
//     args.GetReturnValue().Set(result);
//   }
// }
// void MyObject::PlusOne(const FunctionCallbackInfo<Value>& args) {
//   Isolate* isolate = args.GetIsolate();
//   MyObject* obj = ObjectWrap::Unwrap<MyObject>(args.Holder());
//   obj->value_ += 1;
//   args.GetReturnValue().Set(Number::New(isolate, obj->value_));
// }
// }  // namespace demo



// 包装对象的工厂
// myobject.cc
// #include <node.h>
// #include "myobject.h"
// namespace demo {
// using node::AddEnvironmentCleanupHook;
// using namespace v8;
// // 注意！这不是线程安全的，此插件不能用于工作线程。
// Global<Function> MyObject::constructor;
// MyObject::MyObject(double value) : value_(value) {
// }
// MyObject::~MyObject() {
// }
// void MyObject::Init(Isolate* isolate) {
//   // 准备构造函数模版
//   Local<FunctionTemplate> tpl = FunctionTemplate::New(isolate, New);
//   tpl->SetClassName(String::NewFromUtf8(isolate, "MyObject"));
//   tpl->InstanceTemplate()->SetInternalFieldCount(1);
//   // 原型
//   NODE_SET_PROTOTYPE_METHOD(tpl, "plusOne", PlusOne);
//   Local<Context> context = isolate->GetCurrentContext();
//   constructor.Reset(isolate, tpl->GetFunction(context).ToLocalChecked());
//   AddEnvironmentCleanupHook(isolate, [](void*) {
//     constructor.Reset();
//   }, nullptr);
// }
// void MyObject::New(const FunctionCallbackInfo<Value>& args) {
//   Isolate* isolate = args.GetIsolate();
//   Local<Context> context = isolate->GetCurrentContext();
//   if (args.IsConstructCall()) {
//     // 像构造函数一样调用：`new MyObject(...)`
//     double value = args[0]->IsUndefined() ? 0 : args[0]->NumberValue(context).FromMaybe(0);
//     MyObject* obj = new MyObject(value);
//     obj->Wrap(args.This());
//     args.GetReturnValue().Set(args.This());
//   } else {
//     // 像普通方法 `MyObject(...)` 一样调用，转为构造调用。
//     const int argc = 1;
//     Local<Value> argv[argc] = { args[0] };
//     Local<Function> cons = Local<Function>::New(isolate, constructor);
//     Local<Object> instance = cons->NewInstance(context, argc, argv).ToLocalChecked();
//     args.GetReturnValue().Set(instance);
//   }
// }
// void MyObject::NewInstance(const FunctionCallbackInfo<Value>& args) {
//   Isolate* isolate = args.GetIsolate();
//   const unsigned argc = 1;
//   Local<Value> argv[argc] = { args[0] };
//   Local<Function> cons = Local<Function>::New(isolate, constructor);
//   Local<Context> context = isolate->GetCurrentContext();
//   Local<Object> instance = cons->NewInstance(context, argc, argv).ToLocalChecked();
//   args.GetReturnValue().Set(instance);
// }
// void MyObject::PlusOne(const FunctionCallbackInfo<Value>& args) {
//   Isolate* isolate = args.GetIsolate();
//   MyObject* obj = ObjectWrap::Unwrap<MyObject>(args.Holder());
//   obj->value_ += 1;
//   args.GetReturnValue().Set(Number::New(isolate, obj->value_));
// }
// }  // namespace demo


//传递包装的对象
// myobject.cc
#include <node.h>
#include "myobject.h"
namespace demo {
using namespace node;
using namespace v8;
// 注意！这不是线程安全的，此插件不能用于工作线程。
Global<Function> MyObject::constructor;
MyObject::MyObject(double value) : value_(value) {
}
MyObject::~MyObject() {
}
void MyObject::Init(Isolate* isolate) {
  // Prepare constructor template
  Local<FunctionTemplate> tpl = FunctionTemplate::New(isolate, New);
  tpl->SetClassName(String::NewFromUtf8(isolate, "MyObject"));
  tpl->InstanceTemplate()->SetInternalFieldCount(1);
  Local<Context> context = isolate->GetCurrentContext();
  constructor.Reset(isolate, tpl->GetFunction(context).ToLocalChecked());
  AddEnvironmentCleanupHook(isolate, [](void*) {
    constructor.Reset();
  }, nullptr);
}
void MyObject::New(const FunctionCallbackInfo<Value>& args) {
  Isolate* isolate = args.GetIsolate();
  Local<Context> context = isolate->GetCurrentContext();
  if (args.IsConstructCall()) {
    // 像构造函数一样调用：`new MyObject(...)`
    double value = args[0]->IsUndefined() ? 0 : args[0]->NumberValue(context).FromMaybe(0);
    MyObject* obj = new MyObject(value);
    obj->Wrap(args.This());
    args.GetReturnValue().Set(args.This());
  } else {
    // 像普通方法 `MyObject(...)` 一样调用，转为构造调用。
    const int argc = 1;
    Local<Value> argv[argc] = { args[0] };
    Local<Function> cons = Local<Function>::New(isolate, constructor);
    Local<Object> instance = cons->NewInstance(context, argc, argv).ToLocalChecked();
    args.GetReturnValue().Set(instance);
  }
}
void MyObject::NewInstance(const FunctionCallbackInfo<Value>& args) {
  Isolate* isolate = args.GetIsolate();
  const unsigned argc = 1;
  Local<Value> argv[argc] = { args[0] };
  Local<Function> cons = Local<Function>::New(isolate, constructor);
  Local<Context> context = isolate->GetCurrentContext();
  Local<Object> instance = cons->NewInstance(context, argc, argv).ToLocalChecked();
  args.GetReturnValue().Set(instance);
}
}  // namespace demo