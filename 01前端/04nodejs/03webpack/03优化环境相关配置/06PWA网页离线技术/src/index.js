import "./css/demo.css"
import "./js/demo.js"


// 还得验证浏览器是否支持serviceWorder功能
if ("serviceWorker" in navigator){
  navigator.serviceWorker.register("service-worker.js").then(value=>{
    console.log("注册成功!值为 " + value)
  }).catch(reason=>{
    console.log("注册失败!原因: " + reason)
  })
}