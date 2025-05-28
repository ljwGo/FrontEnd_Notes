const express = require("express")
const app = express()

// 模拟的数据
const existAccount = [
  "张三",
  "李四",
  "王五",
  "老刘",
  'ljw'
]

app.get("/", (req, res)=>{
  res.setHeader('Access-Control-Allow-Origin', "*")
  res.send("服务器get跟路由正常!!!")
})

app.get("/accountIsExist", (req, res)=>{
  const isExist = existAccount.includes(req.query.account);
  res.setHeader('Access-Control-Allow-Origin', "*");
  res.send(JSON.stringify(isExist))
  // res.send("服务器accountIsExist路由正常!!!");
})

app.listen(8080, ()=>{
  console.log("服务器开启成功!!!")
})