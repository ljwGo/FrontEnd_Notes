var divEle = document.querySelector('div')
var btn = document.querySelector('button')

// 匀速移动
// setInterval(function(){
//     divEle.style.left = divEle.offsetLeft + 5 + 'px'
// }, 15)

// 指定移动位置
// function move(target){
//     var timer = setInterval(function(){
//         // 超过target就删除定时器
//     if (divEle.offsetLeft >= target){
//         clearInterval(timer)
//         return
//     }
//     divEle.style.left = divEle.offsetLeft + 5 + 'px'
//     }, 15)
// }
// move(200)

// 按钮绑定事件
// btn.addEventListener('click', function(){
//     move(200)
// })

// 指定移动对象还有回调函数
// function animateX(ele, targetX, callback){
//     var timer = setInterval(function(){
//         // 超过目的地就删除定时器
//     if (ele.offsetLeft >= targetX){
//         clearInterval(timer)
//         return
//     }
//
//     // 移动距离
//     ele.style.left = ele.offsetLeft + 5 + 'px'
//
//     // 如果回调函数不为空,调用回调函数
//     callback && callback()
//     }, 15)
// }
//
// animateX(divEle, 300, function (){
//     console.log(1)
// })

// 带有缓动效果的动画
// 核心算法: 移动像素=target - 当前位置 的差 / 10
function animateX(ele, targetX, callback) {
    var timer = setInterval(function () {
        // 超过目的地就删除定时器
        if (ele.offsetLeft >= targetX) {
            clearInterval(timer)
            return
        }
        // 移动的像素不再是固定的,而是动态变化的
        var step = (targetX - ele.offsetLeft) / 10
        step = step > 0 ? Math.ceil(step) : Math.floor(step)

        // 移动距离
        ele.style.left = ele.offsetLeft + step + 'px'

        // 如果回调函数不为空,调用回调函数
        callback && callback()
    }, 15)
}

btn.addEventListener('click', function () {
    animateX(divEle, 300, function () {
        console.log(2)
    })
})