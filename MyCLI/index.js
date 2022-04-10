#!/usr/bin/env node
// // console.log("hello world");
// // console.log(process.argv)

// //查询版本信息
// // const pkg=require("./package.json");
// // const command=process.argv[2];
// // switch (command) {
// //     case "-v":
// //         console.log(pkg.version);
// //         break;
// //     default:
// //         break;
// // }

// /*处理命令行交互的包：commander。*/
// const program=require("commander");
// const chalk = require('chalk');

// // const ora = require('ora');
// // const spinner = ora('Loading unicorns').start();

// const leftPad = require('left-pad')

// // program  //commander 默认存在两个选项 -V 和 -h，代表查看版本和查看帮助。
// //   .version(require('./package.json').version)
// //   .usage('<path> [options]')      // 方法用来配置使用说明
// //   .parse(process.argv);           //将命令参数传入commander 管道中，一般放在最后执行
// // console.log(program.args);

//   //方法的第一个参数接受一个包含选项简写、选项全称和可选的接收值 (<> 表示必填，[] 表示选填) 的字符串，第二个参数是使用说明，会在查看帮助时打印出来
//   program
//   .version(require('./package.json').version)
//   .usage('<path> [options]')
//   .option('-v --verbose', '启用啰嗦模式')
//   .option('-o --output <path>', '输出到路径')
//   .option('-l --list [item]', '输出列表')
//   .parse(process.argv);

// console.log('Arguments: ' + program.args);
// console.log('Verbose: ' + program.verbose);
// console.log('Output: ' + program.output);
// console.log('List: ' + program.list);

// // 控制命令行文本样式颜色
// console.log(chalk.blue('Hello world!'),"嘤嘤嘤");

// //终端加载动效
// // setTimeout(() => {
// //     spinner.color = 'yellow';
// //     spinner.text = 'Loading rainbows';
// // }, 1000);



// // 常用来制表，对齐（广为流传的一个包..）
// leftPad('foo', 5) // => "  foo"

// leftPad('foobar', 6) // => "foobar"

// leftPad(1, 2, '0') // => "01"

// leftPad(17, 5, 0) // => "00017"

//命令行答问
// const program=require("commander");
// var inquirer = require('inquirer');
// const initAction = () => {
//     inquirer.prompt([{               //inquirer.prompt 可以接收一组问答对象
//         type: 'input',               //type字段表示问答类型
//         message: '请输入项目名称:',   //终端消息
//         name: 'name'                 //name 指定答案的key
//     }]).then(answers => {
//         //可以在 answers 里通过 name 拿到用户的输入，问答的类型有很多种，这里我们使用 input，让用户输入项目名称。
//         console.log('项目名为:', answers.name);
//         console.log('正在拷贝项目,请稍等');
//     })
// }
// program.version(require('./package.json').version)
// program
//     .command('init')         //program.command 可以定义一个命令
//     .description('创建项目')  //description 添加一个描述，在 --help 中展示，
//     .action(initAction)      //action 指定一个回调函数执行命令。
//     .parse(process.argv)



const program = require("commander");
var inquirer = require('inquirer');
var shell = require('shelljs');
const initAction = () => {
    inquirer.prompt([{
        type: 'input',
        message: '请输入项目名称:',
        name: 'name'
    }]).then(answers => {
        console.log('项目名为:', answers.name);
        console.log('正在拷贝项目,请稍等');


        const remote = 'https://github.com/PanJiachen/vue-admin-template.git';
        const curName = 'vue-admin-template';
        const tarName = answers.name;
        shell.exec(`
            git clone ${remote} --depth=1
            mv ${curName} ${tarName}
            rm -rf ./${tarName}/.git
            cd ${tarName}
            npm i`, (error, stdout, stderr) => {
            if (error) {
                console.error(`exec error:${error}`);
                return
            }//linux shell命令只能在linux起效
            console.log(`${stdout}`);
            console.log(`${stderr}`);
        });
    })
}
program.version(require('./package.json').version)
program
    .command('init')
    .description('创建项目')
    .action(initAction)
    .parse(process.argv)



program
    .command('proxy')
    .description('对npm和git进行代理')
    .action(() => {
        shell.exec(`
            git config --global http.proxy http://web-proxy.tencent.com:8080
            npm config set https-proxy http://web-proxy.oa.com:8080
            npm config set registry https://registry.npm.taobao.org`
        );
        console.log('成功对npm和git进行代理');
        console.log('您可以在内网用git去拷贝外网的代码仓库，也可以用npm在内网安装依赖了。');
    });
program
    .command('tencent')
    .description('去除npm和git代理')
    .action(() => {
        shell.exec(`
            git config --global --unset http.proxy
            npm config rm https-proxy
            npm config set registry https://registry.npm.taobao.org`
        );
        console.log('成功去除npm和git代理');
        console.log('您可以在内网用git去拷贝内网的代码仓库,但是没法再内网用npm安装依赖了。');
    });
