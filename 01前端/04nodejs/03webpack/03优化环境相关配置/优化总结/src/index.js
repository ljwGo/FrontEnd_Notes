import "./js/demo06"

import "./css/demo.css"
import "./scss/demo.scss"
import './js/demo01'
import './js/demo02'

// 将自定义模块demo03.js单独分割出来
import(/*webpackChunkName: "demo03"*/'./js/demo03.js')

// 开启js的热模块更新
if (module.hot){
  module.hot.accept("./js/demo01.js")
  module.hot.accept("./js/demo02.js")
}

// 懒加载
window.addEventListener('load', function(){
  let div = document.querySelector('div')
  div.onclick = function(){
    import(/*webpackChunkName: "demo04"*/"./js/demo04.js")
  }
})

// 预加载
window.addEventListener('load', function(){
  let div = document.querySelectorAll('div')[1]
  div.onclick = function(){
    import(/*webpackChunkName: "demo05", webpackPrefetch: true*/"./js/demo05.js")
  }
})

// 开启workerserver功能
if ("serviceWorker" in navigator){
  console.log("尝试加载service-worker")
  window.navigator.serviceWorker.register("../service-worker.js").then(value=>{
    console.log("service-worker开启成功")
  }).catch(()=>{
    console.log("service-worker开启失败")
  })
}