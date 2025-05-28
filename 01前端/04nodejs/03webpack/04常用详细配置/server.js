const express = require("express")
const fs = require("fs")
const app = express()

app.get("/", function(req, res){
  fs.readFile("./0d6a5c4e60ae8777febaff696c7141f6.jpg", (err, data)=>{
    if (err) throw err;
    console.log(data);
    res.send(data)
  })
})

app.listen(3000,()=>{
  console.log(" 服务成功启动")
})