// 立即执行函数的作用
// 是为了开辟独立的作用域,不污染全局命名空间
// 同时,函数内容不需要重复使用

// 立即执行函数的写法
// 方式一 (function(){})() 常用
// var n = 10; // 这里的分号是必须的,用来隔开后面的()
// (function(num){
//     var n = 20
//     console.log(n)
// })(20) // 这里可以传参数
// console.log(n)

// 方式二 (function(){}())
var n = 10;
(function(num){
    var n = 20
    console.log(n)
}(20)) // 这里可以传参数
console.log(n)