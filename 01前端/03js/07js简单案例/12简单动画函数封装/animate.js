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

function gobackTop(callback){
    var timer = setInterval(function () {
        if (window.scrollY <= 0) {
            clearInterval(timer)
            return
        }
        // 移动的像素不再是固定的,而是动态变化的
        var step = (0 - window.scrollY) / 10
        step = Math.floor(step)

        // 移动距离
        window.scroll(0, window.scrollY + step)

        // 如果回调函数不为空,调用回调函数
        callback && callback()
    }, 15)
}