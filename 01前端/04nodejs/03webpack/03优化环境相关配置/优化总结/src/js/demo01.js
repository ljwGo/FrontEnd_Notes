// 导入第三方库, 将他们单独打包
// import $ from 'jquery'
// 默认只打包了bootstrap中的主要js文件,css文件没有引入
// import 'bootstrap'
// import "bootstrap/dist/css/bootstrap.min.css"

console.log("demo1.js已经载入了!!!")
console.log("验证js的hot是否开启")

console.log("验证代码分割模块jquery后,是否导入: " + ($ !== undefined))