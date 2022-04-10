


/*很多使用nodejs开发的工具都会提供一个命令行操作界面（CLI），这些工具在执行的过程中会实时更新执行进度或数据的下载解压缩进度等，例如10%，20%,30%...
这些信息会再终端的同一行的同一位置显示，而不是一行一行逐次打印显示......
那么其是怎么实现的？nodejs有没有相应地模块提供这个功能呢？

嗯，NodeJS中有的，它就是readline模块,这个模块提供了正行数据读取写入，终端提示符位置控制等API

实现的功能
本文章提供一个样例代码，主要说明终端提示符位置控制问题，把需要注意的点都列在其中了

终端字符显示宽度问题
终端界面能够显示的字符区域大小问题
终端当前提示符的位置问题
终端相同位置上内容实时更新的问题

这些问题在样例中都有涉及及说明到

使用nodejs的readline模块对命令行控制终端的提示符位置进行控制
模拟询问用户是否启动应用
启动应用后实时更新运行进度信息从1%~100%，此信息显示同一行的同一个位置 */
var readline = require('readline');
var util=require('util');
var inputStream=process.stdin;
var outputStream=process.stdout;
var rl = readline.createInterface({
    input: inputStream,
    output: outputStream,
    terminal:true
});
var promptStr="MyApp> ";


//获得字符串实际长度，中文2，英文1
//控制台中中文占用2个英文字符的宽度
var getDisplayLength=function(str) {
    var realLength = 0, len = str.length, charCode = -1;
    for (var i = 0; i < len; i++) {
        charCode = str.charCodeAt(i);
        if (charCode >= 0 && charCode <= 128) realLength += 1;
        else realLength += 2;
    }
    return realLength;
};


//计算一个字符串在当前控制台中占用的行数和列数信息
//outputStream.rows及outputStream.columns属性为当前控制台的显示的窗口的大写
var getStrOccRowColumns=function(str){
    //str=promptStr+str;
    var consoleMaxRows=outputStream.rows;
    var consoleMaxColumns=outputStream.columns;
    var strDisplayLength=getDisplayLength(str);
    var rows=parseInt(strDisplayLength/consoleMaxColumns,10);
    var columns=parseInt(strDisplayLength-rows*consoleMaxColumns,10);

    return {
        rows:rows,
        columns:columns
    }

};

//console.log(getDisplayLength(promptStr));
rl.setPrompt(promptStr);
rl.prompt();

rl.question("你想要个启动应用处理吗?", function(answer) {
    rl.prompt();
    rl.write(util.format('启动应用得到的回复为:%s\r\n', answer));
    //更新同一个位置显示的字符信息，每1秒更新1一次，一直到100%
    var k= 0,max=100,prevOutputContent,outputContent,
    cursorDx=0,cursorDy= 0,dxInfo;
    //计算
    rl.prompt();
    var interval=setInterval(function(){
        if(k<max){
            k++;
            outputContent=util.format('%d% done!', k);
              //将光标移动到已经写入的字符前面，             
      readline.moveCursor(outputStream,cursorDx*-1,cursorDy*-1);
          //清除当前光标后的所有文字信息，以便接下来输出信息能写入到控制台
            readline.clearScreenDown(outputStream);
            outputStream.write(outputContent);
            //不要使用这个方法，此方法中写入的数据会被作为line事件的输入源读取
            //rl.write(outputContent);
            dxInfo=getStrOccRowColumns(outputContent);

            cursorDx=dxInfo.columns;
            cursorDy=dxInfo.rows;

        }else{
            outputStream.write(util.format('\r\n'));
            rl.prompt();
            outputStream.write(util.format('%s\r\n',"执行完成"));
            clearInterval(interval);
            rl.close();

        }
    },100);

});


rl.on('close',function(){
   process.exit(0);
});
