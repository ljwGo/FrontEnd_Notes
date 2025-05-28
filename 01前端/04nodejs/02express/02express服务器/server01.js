let port = 8080

// 相当于python的import方法
const express = require('express');
// 开启应用
const app = express();

// 设置get路由, '/'路由, 后面跟视图函数
app.get('/', (req, res) => {
    // 设置响应头, 允许跨域
    res.setHeader('Access-Control-Allow-Origin', '*')
    // 发送响应头
    res.send('GET');
    // console.log(req);
    console.log("get请求来了, url为/")
});

// 设置post路由, '/'路由, 后面跟视图函数
app.post('/', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.send('POST!');
});

app.all('/timeout', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    setTimeout(function(){
        res.send('5秒后发送的响应!');
    }, 5000)
});

app.all('/customHeader', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Headers', '*')
    res.send(req.headers)
});

app.post('/json', (req, res) => {
    var data = {a: 100, b:293}
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.send(JSON.stringify(data))
});

app.get('/ie', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.send('ieGet1')
});

// 服务器开启监听
app.listen(port, () => {
    console.log('示例应用正在监听 '+ port +' 端口!');
});