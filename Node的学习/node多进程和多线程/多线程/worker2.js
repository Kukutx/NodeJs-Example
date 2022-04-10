// worker.js
const { isMainThread, parentPort } = require('worker_threads');

if (isMainThread) throw new Error('嘿！你为什么在主线程跑这个玩意！！？？');

const { readFile, writeFile } = require('fs').promises;
const { mjpage } = require('mathjax-node-page');
// 因为 mathjax-node-page 是一个基于回调的同步函数，我们得把它 promisify 一下
const { promisify } = require('util');
// mjpage 方法的回调中，result 是第一个参数，而不存在 error 参数，因此我们不得不写一个 Custom Promisify
mjpage[promisify.custom] = input => {
  return new Promise((resolve, reject) => {
    try {
      mjpage(
        // mjpage 参数 start
        input,
        { format: ["TeX"] },
        { svg: true, ex: 8, cjkCharWidth: 18, linebreaks: true },
        // mjpage 参数 end
        resolve // 将 Promise.resolve 作为原始函数的回调
      );
    } catch (e) {
      reject(e);
    }
  });
};
const mathJaxRenderer = promisify(mjpage);

async function renderer(filename) {
  // 从参数中获取文件名并读取文件内容
  const content = await readFile(filename);
  // 预处理读到的文件内容
  const preProcesed = content
    .replace(/<span class="MathJax_Preview">.+?<\/span><script type="math\/tex">/gi, '<script type="math/tex">')
    .replace(/<div class="MathJax_Preview">[\s\S]*?<\/div>/gi, '');

  try {
    // MathJax 渲染
    result = await mathJaxRenderer(preProcesed);
  } catch (e) {
    console.error(`${filename} rendered failed, detailed error see below:`);
    console.error(e);
  }

  if (result) {
    console.log(`${filename} rendered finished.`);
    // 将结果写入文件
    return writeFile(filename, result);
  }

  return;
}

// 以上是主函数定义，接下来是 Worker 相关
// 从主线程获取数据，传入的数据为需要渲染的文件名
parentPort.on('message', async filename => {
  await renderer(filename);
  // 渲染完成后，向主线程发送「Done」
  // 虽然最终结果被写入文件，不需要返回，但是 WorkerPool 仍然需要一个 Worker 执行完毕的信号
  parentPort.postMessage('Done');
});