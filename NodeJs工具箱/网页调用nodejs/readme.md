# 浏览器js调用nodejs模块，以uniq模块的调用为例

### 1前言

在日常开发中，有时浏览器网页的功能需要调用nodejs中的模块，比如[加密](https://so.csdn.net/so/search?q=加密&spm=1001.2101.3001.7020)解密模块，本文将以nodejs的uniq模块为例，讲解如何在浏览器的js中调用nodejs的uniq模块。

### 2安装各个必须模块

本文操作所在的系统为[centos7](https://so.csdn.net/so/search?q=centos7&spm=1001.2101.3001.7020)

#### 2.1安装[node](https://so.csdn.net/so/search?q=node&spm=1001.2101.3001.7020)

本文使用编译好的[二进制](https://so.csdn.net/so/search?q=二进制&spm=1001.2101.3001.7020)安装

##### 2.1.1下载

> [wget](https://so.csdn.net/so/search?q=wget&spm=1001.2101.3001.7020) https://nodejs.org/dist/v10.15.0/node-v10.15.0-linux-x64.tar.xz

##### 2.1.2解压缩

> xz -d node-v10.15.0-linux-x64.tar.xz
> tar -xvf node-v10.15.0-linux-x64.tar

执行ls查看bin目录下的程序

> ls node-v10.15.0-linux-x64/bin

```
[root@eos-testnet01 src]#ls node-v10.15.0-linux-x64/bin
browserify  node  npm  npx  webpack  webpack-cli  webpack-dev-server
12
```

##### 2.1.3环境配置

> vi /etc/profile

在文件末尾加入

```
export NODE_HOME=/usr/local/src/node-v10.15.0-linux-x64
export PATH=$PATH:$NODE_HOME/bin
export NODE_PATH=$NODE_HOME/lib/node_modules
123
```

执行下列命令更新配置

> source /etc/profile

##### 2.1.4验证

在命令行输入

> node -v

返回

```
v10.15.0
1
```

查看到版本即认为完成node的安装

#### 2.2安装npm

一般安装完node，就自带了npm，在命令行输入

> npm -v

返回

```
6.4.1
1
```

说明npm安装成功

#### 2.3安装browserify

browserify是打包nodejs模块为浏览器js引用的工具。

> npm install -g browserify

命令行输入

> browserify --help

返回帮助信息，则说明安装成功

### 3构建node项目

#### 3.1初始化

选择开发目录创建文件夹

> mkdir hellotest
> cd hellotest
> npm init

然后根据提示输入一些项目信息

#### 3.2安装nodejs的uniq模块

在工作目录执行下列命令即可完成安装

> npm install uniq

#### 3.3创建入口文件

执行命令

> vim index.js
> :wq

无需键入信息，直接保存后退出

#### 3.4打包输出文件

执行命令

> browserify -r uniq index.js > bundle.js

### 4在浏览器端引用

#### 4.1创建index.html并引用bundle.js

```html
<html>
    <meta charset="utf-8">
    <head>
        <tittle>js调用nodejs模块</tittle>
        <script type="text/javascript" src="bundle.js"></script>
        <script type="text/javascript">
            function postStr(){                
                try{
                    var uniq = require('uniq');
                    var nums = [5,2,1,3,2,5];

                    var numsUniq = uniq(nums)
                    console.log(numsUniq);

                    document.getElementById("info").innerHTML=numsUniq;

                }
                catch(err){
                    alert(err.message);
                }
            }
        </script>
    </head>
    <body>
        <form action="">                 
            <p><div id="info">使用uniq函数后数组内容</div> </p>                    
            <p><input type="button" id="btn_post" onclick="postStr()" value="测试调用node函数"/></p>
        </form>
    </body>
</html>
123456789101112131415161718192021222324252627282930
```

#### 4.2浏览器打开html

index.html文件与bundle.js放在同一目录，然后浏览器打开，单击按钮，执行函数，即可输出uniq函数结果。如下图
单击前
![在这里插入图片描述](https://img-blog.csdnimg.cn/20190110161329639.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3c4ODE5MzM2Mw==,size_16,color_FFFFFF,t_70)
单击后
![在这里插入图片描述](https://img-blog.csdnimg.cn/20190110161426606.png)