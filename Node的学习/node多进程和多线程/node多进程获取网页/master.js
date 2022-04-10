const childProcess = require('child_process');
const cpuNum = require('os').cpus().length;//获取cpu核数
for (let i = 0; i < cpuNum; ++i) {
  childProcess.fork('./worker.js');
}
console.log('Master: xxxx');