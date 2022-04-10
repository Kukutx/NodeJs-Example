/*
CRUD 路由
对于本例，需要构建4条路由; 创建笔记，阅读笔记，更新笔记和删除笔记。
这将使你了解如何使用 Node 构建几乎所有的基本路由。
 */
const noteRoutes = require('./note_routes');
module.exports = function(app, db) {
  noteRoutes(app, db);
  // Other route groups could go here, in the future
};