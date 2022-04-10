
// readline（逐行读取）
/*readline 模块提供了一个接口，用于一次一行地读取可读流（例如 process.stdin）中的数据。 可以使用以下方式访问它：
readline.Interface 类的实例是使用 readline.createInterface() 方法构造的。 每个实例都关联一个 input 可读流和一个 output 可写流。 output 流用于为到达的用户输入打印提示，并从 input 流读取。*/
// const readline = require('readline');
// const rl = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout
// });
/*一旦调用此代码，Node.js 应用程序将不会终止，直到 readline.Interface 关闭，因为接口在 input 流上等待接收数据。 */
// rl.question('你如何看待 Node.js 中文网？', (answer) => {
//   // TODO：将答案记录在数据库中。
//   console.log(`感谢您的宝贵意见：${answer}`);
//   rl.close();
// });


// 'close' 事件
/*当发生以下任一情况时会触发 'close' 事件：
调用 rl.close() 方法，且 readline.Interface 实例放弃对 input 流和 output 流的控制；
input 流接收到其 'end' 事件；
input 流接收到 Ctrl+D 以发信号传输结束（EOT）；
input 流接收到 Ctrl+C 以发信号 SIGINT，并且 readline.Interface 实例上没有注册 'SIGINT' 事件监听器。
调用监听器函数不传入任何参数。
一旦触发 'close' 事件，则 readline.Interface 实例就完成了。 */


//'line' 事件
/*每当 input 流接收到行尾输入（\n、 \r 或 \r\n）时就会触发 'line' 事件。 这种情况通常发生在当用户按下 Enter 或 Return。
调用监听器函数时会带上包含接收到的那一行输入的字符串。*/
// rl.prompt();
// rl.on('line',(input) => {
//     console.log(`接收到：${input}`);
// });

//'pause' 事件
/*
当发生以下任一情况时会触发 'pause' 事件：
input 流被暂停。
input 流未暂停，且接收到 'SIGCONT' 事件。（参见 'SIGTSTP' 事件和 'SIGCONT' 事件）
调用监听器函数时不传入任何参数。
*/
// rl.on('pause', () => {
//     console.log('Readline 暂停');  
// });

//'resume' 事件
/*每当 input 流恢复时，就会触发 'resume' 事件。
调用监听器函数时不传入任何参数。*/
// rl.on('resume', () => {
//    console.log('Readline 恢复');
// });

//'SIGINT' 事件
/*每当 input 流接收到 Ctrl+C 输入（通常称为 SIGINT）时，就会触发 'SIGINT' 事件。 
如果当 input 流接收到 SIGINT 时没有注册 'SIGINT' 事件监听器，则会触发 'pause' 事件。调用监听器函数时不传入任何参数。*/
// rl.on('SIGINT', () => {
//   rl.question('确定要退出吗？', (answer) => {
//     if (answer.match(/^y(es)?$/i)) rl.pause();
//   });
// });

//rl.close()
/*rl.close() 方法会关闭 readline.Interface 实例，并放弃对 input 和 output 流的控制。 当调用时，将触发 'close' 事件。
调用 rl.close() 不会立即停止 readline.Interface 实例触发的其他事件（包括 'line'）。*/

// rl.pause()
/*rl.pause() 方法会暂停 input 流，允许稍后在必要时恢复它。
调用 rl.pause() 不会立刻暂停 readline.Interface 实例触发的其他事件（包括 'line'）。*/
// rl.on('line', (input) => {
//   console.log(input);
//   rl.pause();
// });
// rl.on('pause', () => {
//   console.log('Readline 被暂停。');
//  });
//  rl.on('line', (input) => {
//   console.log(input);
//   rl.pause();
// });

// rl.prompt([preserveCursor])
/*preserveCursor <boolean> 如果为 true，则阻止将光标落点重置为 0。
rl.prompt() 方法将 readline.Interface 实例配置的提示写入 output 中的新一行，以便为用户提供一个可供输入的新位置。
当调用时，如果 input 流已暂停，则 rl.prompt() 将恢复它。
如果 readline.Interface 创建时 output 被设置为 null 或 undefined，则不会写入提示。*/

//rl.question(query, callback)
/*query <string> 要写入 output 的语句或询问，前置于提示符。
callback <Function> 回调函数，调用时传入用户的输入以响应 query。
rl.question() 方法通过将 query 写入 output 来显示它，并等待用户在 input 上提供输入，然后调用 callback 函数将提供的输入作为第一个参数传入。
当调用时，如果 input 流已暂停，则 rl.question() 将恢复 input 流。
如果 readline.Interface 创建时 output 被设置为 null 或 undefined，则不会写入 query。*/
// rl.question('你最喜欢的食物是什么？', (answer) => {
//   console.log(`你最喜欢的食物是 ${answer}`);
// });

// rl.resume()
/*如果 input 流已暂停，则 rl.resume() 方法将恢复它。*/
// rl.on('line', (input) => {
//     console.log(input);
//     rl.pause();
//     setTimeout( () => {
//      rl.resume();
//     },1000);
//    });
// rl.on('resume', () => {
//     console.log('Readline 被恢复。');
//    });
//    rl.on('line', (input) => {
//     console.log(input);
//     rl.pause();
//     setTimeout( () => {
//      rl.resume();
//     },1000);
// });

//rl.setPrompt(prompt)
/*rl.setPrompt() 方法设置每当调用 rl.prompt() 时将写入 output 的提示。*/

//rl.write(data[, key])
/*data <string>
key <Object>
ctrl <boolean> true 表示 Ctrl 键。
meta <boolean> true 表示 Meta 键。
shift <boolean> true 表示 Shift 键。
name <string> 按键的名称。
rl.write() 方法将 data 或 key 标识的按键序列写入 output。 仅当 output 是 TTY 文本终端时才支持 key 参数。 有快捷键组合的列表，请参见 TTY 快捷键。
如果指定了 key，则忽略 data。
当调用时，如果 input 流已暂停，则 rl.write() 将恢复它。
如果 readline.Interface 创建时 output 被设置为 null 或 undefined，则不会写入 data 和 key。 */
// rl.write('删除这个！');
// 模拟 Ctrl+U 删除先前写入的行。
// rl.write(null, { ctrl: true, name: 'u' });
/*rl.write() 方法会把 data 或一个由 key 指定的按键序列写入到 output。
data：输出内容
key：
ctrl： 如果为 true 则表示 ctrl 键。
meta： 如果为 true 则表示 Meta 键。
shift： 如果为 true 则表示 Shift 键。
name： 一个按键的名称。
只有当 output 是一个 TTY 文本终端时，key 参数才被支持。
如果指定了 key，则 data 会被忽略。
当被调用时，如果 input 流已被暂停，则 rl.write() 会恢复 input 流。
如果 readline.Interface 被创建时 output 被设为 null 或 undefined，则 data 和 key 不会被写入。*/
// rl.write('请输入姓名：');
// rl.on('line', (input) => {
//  //模拟按键 Ctrl+c 退出进程。
//  rl.write('', {ctrl: true, name: 'c'});
// });



//rl[Symbol.asyncIterator]()
/*返回: <AsyncIterator>
创建一个 AsyncIterator 对象，该对象以字符串形式迭代输入流中的每一行。 这个方法允许 readline.Interface 对象使用 for await...of 循环的异步迭代。
输入流中的错误不会被转发。
如果循环以 break， throw 或 return 终止，则 rl.close() 将会被调用。 换句话说，对 readline.Interface 的迭代将会始终完全消费输入流。
性能比不上传统的 'line' 事件的 API。 对于性能敏感的应用程序，请使用 'line'。*/
// async function processLineByLine() {
//     const rl = readline.createInterface({
//       // ...
//     });
  
//     for await (const line of rl) {
//       // readline 输入中的每一行将会在此处作为 `line`。
//     }
// }

// rl.cursor()
/*光标相对于rl.line的位置。
从TTY流中读取输入时，这将跟踪当前光标在输入字符串中的位置。 游标的位置确定输入字符串中将在处理输入时进行修改的部分，
以及将显示终端插入符号的列。 */

//rl.getCursorPos()
/*返回：<Object>
rows <number>光标当前所在的提示行
cols <number>光标当前所在的屏幕列
返回光标相对于输入提示+字符串的实际位置。 计算中包括长输入（包装）字符串以及多行提示。 */

//readline.clearLine(stream, dir[, callback])
/*stream <stream.Writable>
dir <number>
-1: 从光标向左。
1: 从光标向右
0: 整行。
callback <Function> 操作完成后调用。
返回: <boolean> 如果 stream 希望调用的代码在继续写入附加的数据之前等待 'drain' 事件触发，则为 false，否则为 true。
readline.clearLine() 方法在由 dir 标识的指定方向上清除给定的 TTY 流的当前行。 */
// rl.write('我在这！！！');
// readline.clearLine(process.stdout, 0)

//readline.clearScreenDown(stream[, callback])
/*stream <stream.Writable>
callback <Function> 操作完成后调用。
返回: <boolean> 如果 stream 希望调用的代码在继续写入附加的数据之前等待 'drain' 事件触发，则为 false，否则为 true。
readline.clearScreenDown() 方法从光标的当前位置向下清除给定的 TTY 流。 */

//readline.createInterface(options)
/*options <Object>
input <stream.Readable> 要监听的可读流。此选项是必需的。
output <stream.Writable> 将逐行读取数据写入的可写流。
completer <Function> 用于 Tab 自动补全的可选函数。
terminal <boolean> 如果 input 和 output 应该被视为 TTY，并且写入 ANSI/VT100 转义码，则为 true。 默认值: 实例化时在 output 流上检查 isTTY。
historySize <number> 保留的最大历史记录行数。 要禁用历史记录，请将此值设置为 0。 仅当用户或内部 output 检查将 terminal 设置为 true 时，此选项才有意义，否则根本不会初始化历史记录缓存机制。 默认值: 30。
prompt - 要使用的提示字符串。默认值: '> '。
crlfDelay <number> 如果 \r 与 \n 之间的延迟超过 crlfDelay 毫秒，则 \r 和 \n 将被视为单独的行尾输入。 crlfDelay 将被强制转换为不小于 100 的数字。 可以设置为 Infinity, 这种情况下， \r 后跟 \n 将始终被视为单个换行符（对于使用 \r\n 行分隔符的文件读取可能是合理的）。 默认值: 100。
removeHistoryDuplicates <boolean> 如果为 true, 则当添加到历史列表的新输入行与旧的输入行重复时，将从列表中删除旧行。 默认值: false。
escapeCodeTimeout <number> readline 将会等待一个字符的持续时间（当以毫秒为单位读取模糊键序列时，可以使用输入读取到目前为止形成完整的键序列，并且可以采取额外的输入来完成更长的键序列）。 默认值: 500。
tabSize <integer> 制表符的空格数（最小值为 1）。默认值: 8。 */
/*readline.createInterface() 方法创建一个新的 readline.Interface 实例。
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});
一旦创建了 readline.Interface 实例，最常见的用例是监听 'line' 事件：
rl.on('line', (line) => {
  console.log(`接收到：${line}`);
});
如果此实例的 terminal 为 true，则若它定义了一个 output.columns 属性则 output 流会获得最佳兼容性，并且如果或当列发生变化时，
output 上会触发 'resize' 事件（当它是 TTY 时，process.stdout 会自动执行此操作）。 */

//completer 函数的使用
/*completer 函数将用户输入的当前行作为参数，并返回包含以下两个条目的数组：
包含匹配补全输入的数组。
用于匹配的子字符串。
例如：[[substr1, substr2, ...], originalsubstring]。 */
// function completer(line) {
//     const completions = '.help .error .exit .quit .q'.split(' ');
//     const hits = completions.filter((c) => c.startsWith(line));
//     // 如果没有匹配，则显示所有补全。
//     return [hits.length ? hits : completions, line];
//   }
// console.log(completer("2312321321.hel"));

//readline.cursorTo(stream, x[, y][, callback])
/*stream <stream.Writable>
x <number>
y <number>
callback <Function> 操作完成后调用。
返回: <boolean> 如果 stream 希望调用的代码在继续写入附加的数据之前等待 'drain' 事件触发，则为 false，否则为 true。
readline.cursorTo() 方法将光标移动到给定的 TTY stream 中的指定位置。 */
// readline.cursorTo(process.stdout, 0, process.stdout.rows);
// rl.write('我在这！！！');

//readline.emitKeypressEvents(stream[, interface])
/*stream <stream.Readable>
interface <readline.Interface>
readline.emitKeypressEvents() 方法使给定的可读流开始触发与接收的输入相对应的 'keypress' 事件。
可选的 interface 指定 readline.Interface 实例，当检测到复制粘贴输入时，将禁用自动补全。
如果 stream 是 TTY，则它必须处于原始模式。
如果 input 是终端，则由其 input 上的任何 readline 实例自动调用。 关闭 readline 实例不会阻止 input 触发 'keypress' 事件。 */
// readline.emitKeypressEvents(process.stdin);
// if (process.stdin.isTTY)
//   process.stdin.setRawMode(true);

//readline.moveCursor(stream, dx, dy[, callback])
/* 
stream <stream.Writable>
dx <number>
dy <number>
callback <Function> 操作完成后调用。
返回: <boolean> 如果 stream 希望调用的代码在继续写入附加的数据之前等待 'drain' 事件触发，则为 false，否则为 true。
readline.moveCursor() 方法相对于给定的 TTY stream 中的当前位置移动光标。*/

//示例：微型 CLI
// const readline = require('readline');
// const rl = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout,
//   prompt: '请输入> '
// });
// rl.prompt();

// rl.on('line', (line) => {
//   switch (line.trim()) {
//     case 'hello':
//       console.log('world!');
//       break;
//     default:
//       console.log(`你输入的是：'${line.trim()}'`);
//       break;
//   }
//   rl.prompt();
// }).on('close', () => {
//   console.log('再见!');
//   process.exit(0);
// });

//示例：逐行读取文件流
/*readline 的一个常见用例是每次一行地输入文件。 最简单的方法是利用 fs.ReadStream API 以及 for await...of 循环： */
/*const fs = require('fs');
const readline = require('readline');
async function processLineByLine() {
  const fileStream = fs.createReadStream('input.txt');
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });
  // 注意：我们使用 crlfDelay 选项将 input.txt 中的所有 CR LF 实例（'\r\n'）识别为单个换行符。
  for await (const line of rl) {
    // input.txt 中的每一行在这里将会被连续地用作 `line`。
    console.log(`Line from file: ${line}`);
  }
}
processLineByLine();*/
/*或者，可以使用 'line' 事件：*/
// const fs = require('fs');
// const readline = require('readline');
// const rl = readline.createInterface({
//   input: fs.createReadStream('input.txt'),
//   crlfDelay: Infinity
// });
// rl.on('line', (line) => {
//   console.log(`文件中的每一行: ${line}`);
// });
/*目前， for await...of 循环可能会慢一点。 如果 async / await 流和速度都是必不可少的，可以应用混合方法：*/
// const { once } = require('events');
// const { createReadStream } = require('fs');
// const { createInterface } = require('readline');
// (async function processLineByLine() {
//   try {
//     const rl = createInterface({
//       input: createReadStream('input.txt'),
//       crlfDelay: Infinity
//     });
//     rl.on('line', (line) => {
//         console.log(`${line}`)
//       // 处理行。
//     });
//     await once(rl, 'close');
//     console.log('文件已处理');
//   } catch (err) {
//     console.error(err);
//   }
// })();

//获取终端窗口大小
// console.log(process.stdout.getWindowSize())


