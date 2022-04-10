let http = require("http")//加载http模块
let fs = require("fs")
let server = http.createServer()//创建WEB服务器，返回一个实例

server.on("request", (request, response) => {
    //设置报文头
    response.setHeader('Content-Type', 'text/html;charset=utf-8')
    // response.end("请求的路径："+request.url)
    let url = request.url
    if (url === "/contents") {
        let str = `
		<!DOCTYPE html>
		<html>
			<head>
				<meta charset="utf-8">
				<title>contents</title>
			</head>
			<body>
				<center>
					<div><h2>目 录</h2></div>
					<div><h4>古诗词一</h4></div>
					<div><h4>古诗词二</h4></div>
				</center>
			</body>
		</html>
		`
        response.end(str)
    } else if (url === "/detail_01") {
        let str = `
		<!DOCTYPE html>
		<html>
			<head>
				<meta charset="utf-8">
				<title>detail_01</title>
			</head>
			<body>
				<center>
					<div><h4>古诗词一</h4></div>
					<div><h5>作者：崔涂</h5></div>
					<div>水流花谢两无情，送尽东风过楚城。</div>
					<div> 胡蝶梦中家万里，子规枝上月三更。</div>
					<div> 故园书动经年绝，华发春唯满镜生。</div>
					<div> 自是不归归便得，五湖烟景有谁争。</div>
				</center>
			</body>
		</html>
		`
        response.end(str)
    } else if (url === "/detail_02") {
        let str = `
		<!DOCTYPE html>
		<html>
			<head>
				<meta charset="utf-8">
				<title>detail_02</title>
			</head>
			<body>
				<center>
					<div><h4>古诗词二</h4></div>
					<div><h5>作者：李白</h5></div>
					<div>故人西辞黄鹤楼，烟花三月下扬州。</div>
					<div> 孤帆远影碧空尽，唯见长江天际流。</div>
				</center>
			</body>
		</html>
		`
        response.end(str)
    }
    //else {
    //     //借助request.url获取请求路径，修改server.on()的回调函数，然后执行。当端口号后不输文件夹名称时，获取到“/”，这是访问服务器根目录的意思
    //     response.end("请求的路径：" + request.url)
    // }
})

server.on("request", (request, response) => {
    let path = request.url
    path = path.split("/")[1]
    path = path + ".html"
    fs.readFile(path, (err, data) => {
        if (!err) {
            response.end(data.toString())
        } else {
            response.end("404 NOT FOUND ")
        }
    })
    writeLog();
})

function writeLog() {
    fs.readFile("log.txt", (err, data) => {
        if (err) {
            console.log("log.txt is NOT FOUND")
        } else {
            data += "有人访问，" + Date() + "\n"
            fs.writeFile("log.txt", data, (err) => {
                if (err) {
                    console.log(err)
                }
            })
        }
    })
}

server.listen(5000, () => {
    console.log("自定义服务器启动成功")
})