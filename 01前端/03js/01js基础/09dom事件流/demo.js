var fatherEle = document.getElementsByClassName("father")[0]
var sonEle = document.getElementsByClassName("son")[0]

// 默认是冒泡阶段
// sonEle.addEventListener('click', function (){
//     alert("孩子触发了")
// })
//
// fatherEle.addEventListener('click', function(){
//     alert("父亲触发了")
// })

// 可以设置成捕获阶段
// sonEle.addEventListener('click', function (){
//     alert("孩子触发了")
// }, true)
//
// fatherEle.addEventListener('click', function(){
//     alert("父亲触发了")
// }, true)

// 阻止事件冒泡方式1
// sonEle.addEventListener('click', function (e){
//     // 父节点事件将不会触发
//     e.stopPropagation()
//     alert("孩子触发了")
// })
//
// fatherEle.addEventListener('click', function(){
//     alert("父亲触发了")
// })

// return false无法阻止addEventListenter方式注册的事件冒泡
// sonEle.addEventListener('click', function (e){
//     // 父节点事件还会触发
//     alert("孩子触发了")
//     return false
// })
//
// fatherEle.addEventListener('click', function(){
//     alert("父亲触发了")
// })

// !!!importance 实际尝试的时候不行
// 传统方式可以使用return false阻止事件冒泡
// sonEle.onclick = function (){
//     // 父节点事件不会触发
//     alert("孩子触发了")
//     return false
// }
//
// fatherEle.onclick = function (){
//     alert("父亲触发了")
//     return false
// }