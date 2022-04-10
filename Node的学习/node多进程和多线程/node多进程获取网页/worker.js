const childProcess = require('child_process');
console.log('Worker-' + process.pid + ': Hello world.');
childProcess.exec('start www.baidu.com');
