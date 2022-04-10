const xlsx = require('node-xlsx')//xlsx 库
const fs =  require('fs') //文件读写库
const request = require("request");//request请求库
let data = [] // 把这个数组写入excel   
request({
    url: "https://qudao.youzan.com/resource/department/list",//你要请求的地址
    method: "post",//请求方法 post get
    json: true,
    headers: {
        "content-type": "application/json",
        "Cookie":""//如果携带了cookie
    },
    body: {"page":1,"pageSize":3,"sortAsc":false,"sortKey":"lastVisitTime","prodLineId":2},//这里是post 传的参数 如果是get 方法在url上拼接就好了
}, function (error, response, body) {
    if (!error && response.statusCode == 200) {
        // console.log(body)
        const rows = body.data.items;
        let title = ['address','alias','bindDisplayName','boundTime','customerAlias','customerId','customerName','infoSourceName'
        ,'predictedReleaseReason','region','unboundTime','mobile','name']//设置表头
        data.push(title) // 添加完表头 下面就是添加真正的内容了
        rows.forEach((e) => {
            let arrInner = []
            arrInner.push(e.address)
            arrInner.push(e.alias)
            arrInner.push(e.bindDisplayName)
            arrInner.push(e.boundTime)
            arrInner.push(e.customerAlias)
            arrInner.push(e.customerId)
            arrInner.push(e.customerName)
            arrInner.push(e.infoSourceName)
            arrInner.push(e.predictedReleaseReason)
            arrInner.push(e.region)
            arrInner.push(e.unboundTime)   
            data.push(arrInner)
        });
        writeXls(data)
    }
}); 
 
 
 
// 写xlsx文件
function writeXls(datas) {
    let buffer = xlsx.build([
    {
        name:'sheet1',
        data:datas
    }
    ]);
    fs.writeFileSync('./data.xlsx',buffer,{'flag':'w'});//生成excel data是excel的名字
}