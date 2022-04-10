// render_mathjax.js
const { WorkerPool } = require('./workerpool');
// bluebird 的 Promise 不仅特别快，还特别实用
const Promise = require('bluebird');
const { join, dirname } = require('path');
// hexo-fs 是个好东西，包含了很多实用的 fs API 封装，比如递归遍历目录的方法 listDir
const { listDir } = require('hexo-fs');
// mkdocs 生成的 HTML 目录
const distDir = join(dirname(__dirname) + '/site');
// worker.js 路径
const workerPath = join(__dirname + '/worker.js');
// 初始化一个 Worker Pool
const pool = new WorkerPool(workerPath);

// 使用 Promise.all 确保当所有任务都 fullfill 后再执行 then。
Promise.all(listDir(distDir).map(async item => {
  // 遍历目录下每一个文件，如果文件的后缀是 .html 则新增一个任务
  if (item.endsWith('.html')) {
    const filename = join(distDir, item);
    // 将 HTML 的绝对路径作为任务 data 传给 Worker
    await pool.run(filename);
  }
})).then(() => {
  // 所有的 HTML 都渲染完了，这时候可以将 WorkerPool 销毁了
  pool.destroy();
});