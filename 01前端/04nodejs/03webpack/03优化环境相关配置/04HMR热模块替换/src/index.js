import "./demo.js"
import "./demo2.js"
import "./demo.css"
import "./demo2.css"

// 注册需要使用热模块更新的模块
if (module.hot){
    module.hot.accept("./demo.js", function(){
        console.log("demo.js替换了")
    })// 不支持链式操作
    module.hot.accept("./demo2.js", function(){
        console.log("demo2.js")
    })
}