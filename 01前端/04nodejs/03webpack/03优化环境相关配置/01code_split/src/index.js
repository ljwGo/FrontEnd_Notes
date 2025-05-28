import "./css/demo.css"
import "./scss/demo.scss"
// import "./js/demo.js"
import $ from "jquery"

/*
  通过js代码, 让某个文件能被单独打包成一个chunk
*/

// 返回值是一个promise对象
import("./js/demo.js").then(module=>{
  // 文件加载成功则调用此回调
  // eslint-disable-next-line 这个注释指定下一行不被eslint语法检测
  console.log(module)
}).catch(e=>{
  // 文件加载失败
  console.log(e)
})