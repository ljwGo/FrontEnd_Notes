// 引入路径别名变量
import "$css/demo.css"

import $ from "jquery"
console.log($)

import "./images/akari.jpg"
import "./images/picture1.jpg"

console.log("入口文件index.js加载了")

import './js/demo'

import(/* webpackChunkName: "demo01" */"./js/demo1.js").then(()=>{
  console.log("加载成功")
}).catch(()=>{
  console.log("加载失败")
})