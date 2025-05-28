const HtmlPlugin = require("html-webpack-plugin")
const {resovle, resolve} = require("path")

/*
    懒加载:
      用户触发特定事件后才加载新的模块, 这个模块的获取是需要再发送网络请求的
      优点:
        能偶加快页面渲染,同时减轻服务器压力
      缺点:
        造成加载延时,类似ajax
    预加载:
      再加载完一些模块后, 在浏览器空余时,下载剩下的模块.
      需要加载时, 从缓存中获取, 而非通过网络
      优点:
        降低延迟
      缺点:
        兼容性很差
*/

module.exports = {
    entry: "./src/index.js",
    output: {
        filename: "built.js",
        path: resolve(__dirname, 'dist')
    },
    mode: "development",
    module: {
        rules: [
        ]
    },
    plugins: [
        new HtmlPlugin({template: "./src/demo.html"})
    ],
    devServer: {
        open: true,
        port: 8070,
    }
}