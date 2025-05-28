var btn = document.querySelector("button")
var ipt = document.querySelector("input")

btn.addEventListener('click', function (){
    this.disabled = true
    var restTime = 10

    function reSend(){
        btn.innerHTML = `还剩${restTime}秒后重新发送`
        restTime--
        if (restTime < 0){
            clearInterval(btn.timer)
            restTime = 10
            btn.disabled = false
            btn.innerHTML = "点击发送"
        }
    }

    reSend()
    // 将计时器当作btn元素的一个新属性存入
    this.timer = setInterval(reSend, 1000)
})

// 计算倒计时的函数

// function countdown(endTime){
//     // 计算时间间隔的秒数
//     var interval = (+new Date(endTime) - +new Date()) / 1000
//     // 剩余小时数
//     var h = Math.floor(interval / 3600)
//     h = h < 10 ? '0' + h : h
//     // 剩余分钟数
//     var m = Math.floor(interval % 3600 / 60)
//     m = m < 10 ? '0' + m : m
//     // 剩余秒数
//     var s = Math.floor(interval % 60)
//     s = s < 10 ? '0' + s : s
//     // 返回一个对象
//     return {hour: h, minute: m, second: s}
// }

// console.log(countdown("2022/1/25 18:00:00"))