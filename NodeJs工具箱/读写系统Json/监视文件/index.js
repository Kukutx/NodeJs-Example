// 监视
/*文件监视 API fs.watchFile()
回调函数中需要接收两个参数
第一个是当前文件的最新状态 stat，
第二个是变化之前的 stat*/
// const fs = require('fs');
// // 监视文件的修改时间
// fs.watchFile('./node.md', (curr, prev) => {
//   console.log(curr.mtime.getHours() + ':' + curr.mtime.getMinutes() + ':' +curr.mtime.getSeconds());
//   console.log(prev.mtime.getHours() + ':' + prev.mtime.getMinutes() + ':' +prev.mtime.getSeconds());
// });


//使用模板引擎时需要注意的地方
// const template = require('art-template');
// // 1. 调用 template.compile 方法，传入一个模板字符串，得到一个渲染函数
// // # 表示不编码输出
// const render = template.compile(`
// <h1>{{# title }}</h1>
// `);
// // 防止用户恶意注入 JavaScript 代码
// const result = render({
//   title: '<span>hello</span>'
// });
// console.log(result);
//在 node 中使用模板引擎
// const template = require('art-template');
// // 这是 art-template 的简洁语法
// const render = template.compile(`
//   <h1>{{title}}</h1>
//   <ul>
//     {{each list as value i}}
//       <li>索引{{i}}:{{value}}</li>
//     {{/each}}
//   </ul>
// `);
// const result = render({
//   title: 'node 中使用模板引擎',
//   list: [
//     'a', 'b', 'c'
//   ]
// });
// console.log(result);

//markdown 文件自动生成 HTML
// const fs = require('fs');
// const marked = require('marked');
// const template = require('art-template');
// // { persistent: true, interval: 1000 } 修改间隔时间
// fs.watchFile('./node.md', { persistent: true, interval: 1000 }, (curr, prev) => {
//   fs.readFile('./node.md', (err, md) => {
//     if (err) {
//       throw err;
//     }
//     // 拿到文件数据，将 Markdown 格式字符串转换为 HTML 格式字符串
//     const htmlStr = marked(md.toString());
//     fs.readFile('./template.html', 'utf8', (err, tmp) => {
//       if (err) {
//         throw err;
//       }
//       // 使用 art-template 模板引擎编译解析
//       const result = template.compile(tmp)({
//         textTitle: 'node 学习',
//         title: 'node 学习',
//         body: htmlStr,
//       });
//       // 写入要生成的文件中
//       fs.writeFile('./node.html', result, err => {
//         if (err) {
//           throw err;
//         }
//         console.log('translate success');
//       });
//     });
//   });
// });

//读 execl 文件
const parseXlsx = require('excel');
const moment = require('moment');
parseXlsx('./data/课表.xlsx', (err, data) => {
  if (err) {
    throw err;
  }
  // 解析 excel 表格日期
  // var date = new Date((42628 - (25567 + 1)) * 86400 * 1000)
  // // 在原有日期 - 1 天
  // date = moment(date).add(-1, 'days').format('YYYY-MM-DD'))
  for (let day of data) {
    if (day[1].trim().length > 0) {
      if (day[1].includes('周淑刚')) {
        console.log(moment(new Date((parseInt(day[0]) - (25567 + 1)) * 86400 * 1000)).add(-1, 'days').format('YYYY-MM-DD'), day[1])
      }
    }
  }
})