var divEles = document.querySelector('div').querySelectorAll('div')

window.addEventListener('load', flushTime)

setInterval(flushTime, 1000)

function countdown(endTime){
    // 计算时间间隔的秒数
    var interval = (+new Date(endTime) - +new Date()) / 1000
    // 剩余小时数,可能会超出一天
    var h = Math.floor(interval / 3600)
    h = h < 10 ? '0' + h : h
    // 剩余分钟数
    var m = Math.floor(interval % 3600 / 60)
    m = m < 10 ? '0' + m : m
    // 剩余秒数
    var s = Math.floor(interval % 60)
    s = s < 10 ? '0' + s : s
    // 返回一个对象
    return {hour: h, minute: m, second: s}
}
function flushTime(){
    var timeObj = countdown("2022/1/25 18:00:00")
    divEles[0].innerHTML = timeObj.hour
    divEles[1].innerHTML = timeObj.minute
    divEles[2].innerHTML = timeObj.second
}