// myobject.h
//包装 C++ 对象
/* 在 myobject.h 中，包装类继承自 node::ObjectWrap */
// #ifndef MYOBJECT_H
// #define MYOBJECT_H
// #include <node.h>
// #include <node_object_wrap.h>
// namespace demo {
// class MyObject : public node::ObjectWrap {
//  public:
//   static void Init(v8::Local<v8::Object> exports);
//  private:
//   explicit MyObject(double value = 0);
//   ~MyObject();
//   static void New(const v8::FunctionCallbackInfo<v8::Value>& args);
//   static void PlusOne(const v8::FunctionCallbackInfo<v8::Value>& args);
//   double value_;
// };
// }  // namespace demo
// #endif


// 包装对象的工厂
/* 在 myobject.h 中，添加静态方法 NewInstance() 来处理实例化对象。 这个方法用来代替在 JavaScript 中使用 new */
// myobject.h
// #ifndef MYOBJECT_H
// #define MYOBJECT_H
// #include <node.h>
// #include <node_object_wrap.h>
// namespace demo {
// class MyObject : public node::ObjectWrap {
//  public:
//   static void Init(v8::Isolate* isolate);
//   static void NewInstance(const v8::FunctionCallbackInfo<v8::Value>& args);
//  private:
//   explicit MyObject(double value = 0);
//   ~MyObject();
//   static void New(const v8::FunctionCallbackInfo<v8::Value>& args);
//   static void PlusOne(const v8::FunctionCallbackInfo<v8::Value>& args);
//   static v8::Global<v8::Function> constructor;
//   double value_;
// };
// }  // namespace demo
// #endif



//传递包装的对象
/* 在 myobject.h 中，新增了一个新的公共方法用于在去包装对象后访问私有值。 */
// myobject.h
#ifndef MYOBJECT_H
#define MYOBJECT_H
#include <node.h>
#include <node_object_wrap.h>
namespace demo {
class MyObject : public node::ObjectWrap {
 public:
  static void Init(v8::Isolate* isolate);
  static void NewInstance(const v8::FunctionCallbackInfo<v8::Value>& args);
  inline double value() const { return value_; }
 private:
  explicit MyObject(double value = 0);
  ~MyObject();
  static void New(const v8::FunctionCallbackInfo<v8::Value>& args);
  static v8::Global<v8::Function> constructor;
  double value_;
};
}  // namespace demo
#endif

