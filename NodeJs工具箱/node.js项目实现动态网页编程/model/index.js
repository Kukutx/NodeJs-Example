const mongoose = require('mongoose');
//导入mongoose 模块
// 数据库连接 27017是mongodb数据库的默认端口,，可以省略

//连接数据库，如果没有数据库，会隐式创建一个。
mongoose.connect('mongodb://localhost/playground', {
 useNewUrlParser: true,
 useUnifiedTopology: true
 }).then(() => console.log('数据库连接成功'))
   .catch(() => console.log('数据库连接失败'));
