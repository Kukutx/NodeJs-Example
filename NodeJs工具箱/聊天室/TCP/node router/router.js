/*好了，我们的应用现在可以通过请求的 URL 路径来区别不同请求了--这使我们得以使用路由（还未完成）来将请求以 URL 路径为基准映射到处理程序上。
在我们所要构建的应用中，这意味着来自 /start 和 /upload 的请求可以使用不同的代码来处理。稍后我们将看到这些内容是如何整合到一起的。
现在我们可以来编写路由了，建立一个名为 router.js 的文件，添加以下内容：*/
function route(pathname) {
    console.log("About to route a request for " + pathname);
}
exports.route = route;