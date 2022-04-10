// 连接数据库
/*在以下实例中根据你的实际配置修改数据库用户名、及密码及数据库名*/
//const mysql = require('mysql');
// var connection = mysql.createConnection({
//   host     : 'localhost',
//   user     : 'root',
//   password : '65332120',
//   database : 'test'
// });
// connection.connect();
// connection.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
//   if (error) throw error;
//   console.log('The solution is: ', results[0].solution);
// });

/*  host	主机地址 （默认：localhost）
　　user	用户名
　　password	密码
　　port	端口号 （默认：3306）
　　database	数据库名
　　charset	连接字符集（默认：'UTF8_GENERAL_CI'，注意字符集的字母都要大写）
　　localAddress	此IP用于TCP连接（可选）
　　socketPath	连接到unix域路径，当使用 host 和 port 时会被忽略
　　timezone	时区（默认：'local'）
　　connectTimeout	连接超时（默认：不限制；单位：毫秒）
　　stringifyObjects	是否序列化对象
　　typeCast	是否将列值转化为本地JavaScript类型值 （默认：true）
　　queryFormat	自定义query语句格式化方法
　　supportBigNumbers	数据库支持bigint或decimal类型列时，需要设此option为true （默认：false）
　　bigNumberStrings	supportBigNumbers和bigNumberStrings启用 强制bigint或decimal列以JavaScript字符串类型返回（默认：false）
　　dateStrings	强制timestamp,datetime,data类型以字符串类型返回，而不是JavaScript Date类型（默认：false）
　　debug	开启调试（默认：false）
　　multipleStatements	是否许一个query中有多个MySQL语句 （默认：false）
　　flags	用于修改连接标志
　　ssl	使用ssl参数（与crypto.createCredenitals参数格式一至）或一个包含ssl配置文件名称的字符串，目前只捆绑Amazon RDS的配置文件
 */

//  数据库操作( CURD )
var mysql  = require('mysql');  
//创建连接
var connection = mysql.createConnection({     
  host     : 'localhost',       
  user     : 'root',              
  password : '65332120',       
  port: '3306',                   
  database: 'test' 
}); 
//建立连接
connection.connect();
var  table = 'CREATE TABLE websites(runoob_id INT)';
var  sql = 'SELECT * FROM websites';
var  addSql = 'INSERT INTO websites(Id,name,url,alexa,country) VALUES(0,?,?,?,?)';
var  addSqlParams = ['菜鸟工具', 'https://c.runoob.com','23453', 'CN'];
var modSql = 'UPDATE websites SET name = ?,url = ? WHERE Id = ?';
var modSqlParams = ['菜鸟移动站', 'https://m.runoob.com',6];
var delSql = 'DELETE FROM websites where id=6';

// connection.query(table,function (err, result) {
//     if(err){
//       console.log('[CREATE TABLE] - ',err.message);
//       return;
//     }         
//    console.log('--------------------------CREATE TABLE----------------------------');
//    console.log('CREATE TABLE',result.affectedRows);
//    console.log('-----------------------------------------------------------------\n\n');  
// });
//查询数据
// connection.query(sql,function (err, result) {
//         if(err){
//           console.log('[SELECT ERROR] - ',err.message);
//           return;
//         }
//        console.log('--------------------------SELECT----------------------------');
//        console.log(result);
//        console.log('------------------------------------------------------------\n\n');  
// });

//插入数据
// connection.query(addSql,addSqlParams,function (err, result) {
//         if(err){
//          console.log('[INSERT ERROR] - ',err.message);
//          return;
//         }        
 
//        console.log('--------------------------INSERT----------------------------');
//        //console.log('INSERT ID:',result.insertId);        
//        console.log('INSERT ID:',result);        
//        console.log('-----------------------------------------------------------------\n\n');  
// });

//更新数据
// connection.query(modSql,modSqlParams,function (err, result) {
//    if(err){
//          console.log('[UPDATE ERROR] - ',err.message);
//          return;
//    }        
//   console.log('--------------------------UPDATE----------------------------');
//   console.log('UPDATE affectedRows',result.affectedRows);
//   console.log('-----------------------------------------------------------------\n\n');
// });

//删除数据
// connection.query(delSql,function (err, result) {
//         if(err){
//           console.log('[DELETE ERROR] - ',err.message);
//           return;
//         }         
//        console.log('--------------------------DELETE----------------------------');
//        console.log('DELETE affectedRows',result.affectedRows);
//        console.log('-----------------------------------------------------------------\n\n');  
// });
//结束
connection.end();