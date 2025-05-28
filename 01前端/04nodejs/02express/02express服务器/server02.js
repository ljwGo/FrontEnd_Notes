var express = require('express')

var app = new express()

app.get('/', function(req, res){
    // 设置允许跨站
    res.setHeader('Access-Control-Allow-Origin', "*")
    res.send('hello welcome to my website')
})

app.all('/axios-server', function(req, res){
    res.setHeader('Access-Control-Allow-Origin', "*")
    res.setHeader('Access-Control-Allow-Headers', '*')
    // res.send(JSON.req.params)
    console.log(req.params)
    console.log(req.query)
    // res.send(JSON.stringify(req.params))
    res.send('响应发送的数据')
})

app.listen(8080, function(){
    console.log("服务器启动了")
})