// Node.js 文件系统
/*Node.js 提供一组类似 UNIX（POSIX）标准的文件操作API。 Node 导入文件系统模块(fs)语法如下所示：*/
var fs = require("fs")
/*异步和同步
Node.js 文件系统（fs 模块）模块中的方法均有异步和同步版本，例如读取文件内容的函数有异步的 fs.readFile() 和同步的 fs.readFileSync()。
异步的方法函数最后一个参数为回调函数，回调函数的第一个参数包含了错误信息(error)。
建议大家使用异步方法，比起同步，异步方法性能更高，速度更快，而且没有阻塞。 */
// 异步读取
// fs.readFile('input.txt', function (err, data) {
//     if (err) {
//         return console.error(err);
//     }
//     console.log("异步读取: " + data.toString());
// });
// // 同步读取
// var data = fs.readFileSync('input.txt');
// console.log("同步读取: " + data.toString());
// console.log("程序执行完毕。");

//打开文件
/*以下为在异步模式下打开文件的语法格式：
fs.open(path, flags[, mode], callback)
参数使用说明如下：
path - 文件的路径。
flags - 文件打开的行为。具体值详见下文。
mode - 设置文件模式(权限)，文件创建默认权限为 0666(可读，可写)。
callback - 回调函数，带有两个参数如：callback(err, fd)。
flags 参数可以是以下值：
Flag	描述
r	以读取模式打开文件。如果文件不存在抛出异常。
r+	以读写模式打开文件。如果文件不存在抛出异常。
rs	以同步的方式读取文件。
rs+	以同步的方式读取和写入文件。
w	以写入模式打开文件，如果文件不存在则创建。
wx	类似 'w'，但是如果文件路径存在，则文件写入失败。
w+	以读写模式打开文件，如果文件不存在则创建。
wx+	类似 'w+'， 但是如果文件路径存在，则文件读写失败。
a	以追加模式打开文件，如果文件不存在则创建。
ax	类似 'a'， 但是如果文件路径存在，则文件追加失败。
a+	以读取追加模式打开文件，如果文件不存在则创建。
ax+	类似 'a+'， 但是如果文件路径存在，则文件读取追加失败。*/
// 异步打开文件
// console.log("准备打开文件！");
// fs.open('input.txt', 'r+', function(err, fd) {
//    if (err) {
//        return console.error(err);
//    }
//   console.log("文件打开成功！");     
// });

// 获取文件信息
/*以下为通过异步模式获取文件信息的语法格式：
fs.stat(path, callback)
参数使用说明如下：
path - 文件路径。
callback - 回调函数，带有两个参数如：(err, stats), stats 是 fs.Stats 对象。
fs.stat(path)执行后，会将stats类的实例返回给其回调函数。可以通过stats类中的提供方法判断文件的相关属性。例如判断是否为文件：
stats类中的方法有：
方法	描述
stats.isFile()	如果是文件返回 true，否则返回 false。
stats.isDirectory()	如果是目录返回 true，否则返回 false。
stats.isBlockDevice()	如果是块设备返回 true，否则返回 false。
stats.isCharacterDevice()	如果是字符设备返回 true，否则返回 false。
stats.isSymbolicLink()	如果是软链接返回 true，否则返回 false。
stats.isFIFO()	如果是FIFO，返回true，否则返回 false。FIFO是UNIX中的一种特殊类型的命令管道。
stats.isSocket()	如果是 Socket 返回 true，否则返回 false。
*/
// fs.stat('test.js', function (err, stats) {
//     console.log(stats.isFile());         //true
// })
// console.log("准备打开文件！");
// fs.stat('input.txt', function (err, stats) {
//    if (err) {
//        return console.error(err);
//    }
//    console.log(stats);
//    console.log("读取文件信息成功！");
//    // 检测文件类型
//    console.log("是否为文件(isFile) ? " + stats.isFile());
//    console.log("是否为目录(isDirectory) ? " + stats.isDirectory());    
// });


//写入文件
/*以下为异步模式下写入文件的语法格式：
fs.writeFile(file, data[, options], callback)
writeFile 直接打开文件默认是 w 模式，所以如果文件存在，该方法写入的内容会覆盖旧的文件内容。
参数使用说明如下：
file - 文件名或文件描述符。
data - 要写入文件的数据，可以是 String(字符串) 或 Buffer(缓冲) 对象。
options - 该参数是一个对象，包含 {encoding, mode, flag}。默认编码为 utf8, 模式为 0666 ， flag 为 'w'
callback - 回调函数，回调函数只包含错误信息参数(err)，在写入失败时返回。*/
// console.log("准备写入文件");
// fs.writeFile('input.txt', '我是通 过fs.writeFile 写入文件的内容',  function(err) {
//    if (err) {
//        return console.error(err);
//    }
//    console.log("数据写入成功！");
//    console.log("--------我是分割线-------------")
//    console.log("读取写入的数据！");
//    fs.readFile('input.txt', function (err, data) {
//       if (err) {
//          return console.error(err);
//       }
//       console.log("异步读取文件数据: " + data.toString());
//    });
// });


// 读取文件
/* 以下为异步模式下读取文件的语法格式：
fs.read(fd, buffer, offset, length, position, callback) 
参数使用说明如下：
fd - 通过 fs.open() 方法返回的文件描述符。
buffer - 数据写入的缓冲区。
offset - 缓冲区写入的写入偏移量。
length - 要从文件中读取的字节数。
position - 文件读取的起始位置，如果 position 的值为 null，则会从当前文件指针的位置读取。
callback - 回调函数，有三个参数err, bytesRead, buffer，err 为错误信息， bytesRead 表示读取的字节数，buffer 为缓冲区对象。
*/
// var buf = new Buffer.alloc(1024);
// console.log("准备打开已存在的文件！");
// fs.open('input.txt', 'r+', function(err, fd) {
//    if (err) {
//        return console.error(err);
//    }
//    console.log("文件打开成功！");
//    console.log("准备读取文件：");
//    fs.read(fd, buf, 0, buf.length, 0, function(err, bytes){
//       if (err){
//          console.log(err);
//       }
//       console.log(bytes + "  字节被读取");     
//       // 仅输出读取的字节
//       if(bytes > 0){
//          console.log(buf.slice(0, bytes).toString());
//       }
//    });
// });


//关闭文件
/*以下为异步模式下关闭文件的语法格式：
fs.close(fd, callback)
参数使用说明如下：
fd - 通过 fs.open() 方法返回的文件描述符。
callback - 回调函数，没有参数。
*/
// var buf = new Buffer.alloc(1024);
// console.log("准备打开文件！");
// fs.open('input.txt', 'r+', function(err, fd) {
//    if (err) {
//        return console.error(err);
//    }
//    console.log("文件打开成功！");
//    console.log("准备读取文件！");
//    fs.read(fd, buf, 0, buf.length, 0, function(err, bytes){
//       if (err){
//          console.log(err);
//       }
//       // 仅输出读取的字节
//       if(bytes > 0){
//          console.log(buf.slice(0, bytes).toString());
//       }
//       // 关闭文件
//       fs.close(fd, function(err){
//          if (err){
//             console.log(err);
//          } 
//          console.log("文件关闭成功");
//       });
//    });
// });


//截取文件
/*以下为异步模式下截取文件的语法格式：
fs.ftruncate(fd, len, callback)
参数使用说明如下：
fd - 通过 fs.open() 方法返回的文件描述符。
len - 文件内容截取的长度。
callback - 回调函数，没有参数。*/
// var buf = new Buffer.alloc(1024);
// console.log("准备打开文件！");
// fs.open('input.txt', 'r+', function(err, fd) {
//    if (err) {
//        return console.error(err);
//    }
//    console.log("文件打开成功！");
//    console.log("截取10字节内的文件内容，超出部分将被去除。");   
//    // 截取文件
//    fs.ftruncate(fd, 10, function(err){
//       if (err){
//          console.log(err);
//       } 
//       console.log("文件截取成功。");
//       console.log("读取相同的文件"); 
//       fs.read(fd, buf, 0, buf.length, 0, function(err, bytes){
//          if (err){
//             console.log(err);
//          }
//          // 仅输出读取的字节
//          if(bytes > 0){
//             console.log(buf.slice(0, bytes).toString());
//          }
//          // 关闭文件
//          fs.close(fd, function(err){
//             if (err){
//                console.log(err);
//             } 
//             console.log("文件关闭成功！");
//          });
//       });
//    });
// });


//删除文件
/*以下为删除文件的语法格式：
fs.unlink(path, callback)*/
// console.log("准备删除文件！");
// fs.unlink('input.txt', function(err) {
//    if (err) {
//        return console.error(err);
//    }
//    console.log("文件删除成功！");
// });

// 创建目录
/*以下为创建目录的语法格式：
fs.mkdir(path[, options], callback)
参数使用说明如下：
path - 文件路径。
options 参数可以是：
recursive - 是否以递归的方式创建目录，默认为 false。
mode - 设置目录权限，默认为 0777。
callback - 回调函数，没有参数。
*/
// console.log("创建目录 /tmp/test/");
// fs.mkdir("./test/",function(err){
//    if (err) {
//        return console.error(err);
//    }
//    console.log("目录创建成功。");
// });
//// 可以添加 recursive: true 参数，不管创建的目录 /tmp 和 /tmp/a 是否存在：
// fs.mkdir('/tmp/a/apple', { recursive: true }, (err) => {
//   if (err) throw err;
// });


//读取目录
/*以下为读取目录的语法格式：
fs.readdir(path, callback)
参数使用说明如下：
path - 文件路径。
callback - 回调函数，回调函数带有两个参数err, files，err 为错误信息，files 为 目录下的文件数组列表。*/
// console.log("查看 /test 目录");
// fs.readdir("./test/",function(err, files){
//    if (err) {
//        return console.error(err);
//    }
//    files.forEach( function (file){
//        console.log( file );
//    });
// });


//删除目录
/*以下为删除目录的语法格式：
fs.rmdir(path, callback)
参数使用说明如下：
path - 文件路径。
callback - 回调函数，没有参数。*/
// console.log("准备删除目录 /test/tmp/");
// fs.rmdir("./test/tmp",function(err){
//    if (err) {
//        return console.error(err);
//    }
//    console.log("读取 /test 目录");
//    fs.readdir("./test/",function(err, files){
//       if (err) {
//           return console.error(err);
//       }
//       files.forEach( function (file){
//           console.log( file );
//       });
//    });
// });

//重命名
/* fs.rename(oldPath, newPath, callback)
参数使用说明如下：
oldPath - 旧地址文件路径
newPath - 新地址文件路径
callback - 回调函数，没有参数。*/
// fs.rename("./test/1.txt", "./test/3.txt", (err)=>{
//     if(err){
//         console.log(err);
//     }
// })