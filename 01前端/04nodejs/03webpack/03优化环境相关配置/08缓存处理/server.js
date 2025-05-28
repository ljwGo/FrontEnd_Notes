const express = require("express");
const app = express();

// use使用中间件, 可以配置参数
// static类似指定静态文件(其实更像开启媒体暴露)
// maxAge指定缓存, 时间以毫秒为单位
app.use(express.static("./dist", {maxAge: 1000*3600}))

// 这是强缓存, 没有时间更新的一说
// 服务器也无法检测到, 源文件的改动
// 客服端会向服务端发送自己拥有的缓存文档,
// 服务端比对, 发现文档名一一对应(无法发现文档内容变换了), 认为缓存有效, 发送304状态码
app.listen(8080)