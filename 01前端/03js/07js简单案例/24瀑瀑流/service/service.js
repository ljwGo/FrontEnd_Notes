const express = require("express");
const {existsSync} = require("fs");
const path = require("path");

const app = express();

app.use(express.static(__dirname));

app.get("/", (req, res)=>{
  res.sendFile(path.resolve(__dirname, "./index.html"));
});

app.get("/get_pre_group", (req, res)=>{
  res.setHeader("Access-Control-Allow-Origin", "*");
  let abs_path = path.resolve(__dirname, "./utils/img_json_group"+req.query.img_group_mark+".json");
  new Promise((resolve, reject)=>{
    // 如果要的组存在, 不存在就是加载完毕了
    existsSync(abs_path) ? resolve(abs_path) : reject();
  }).then((abs_path)=>{
    setTimeout(()=>{
      res.sendFile(abs_path);
    }, 1000);
  }).catch(()=>{
    setTimeout(()=>{
      // 加载完毕时, 将前端的isOver设置为true
      res.status(404).send(JSON.stringify({isOver: true}));
    }, 1000);
  })
});

app.get("/get_img", (req, res)=>{
  res.setHeader("Access-control-Allow-Origin", "*");
  let img_name = req.query.img_name;
  let abs_path = path.resolve(__dirname, "./images/"+img_name);
  // 模拟网络io
  setTimeout(()=>{
    res.sendFile(abs_path);
  }, 1000);
})

app.listen(8080, 'localhost', ()=>{
  console.log(__dirname);
  console.log("服务器启动成功!!!");
});