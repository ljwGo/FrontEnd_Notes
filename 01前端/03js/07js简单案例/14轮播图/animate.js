function animateX(ele, targetX, callback) {
    // 如果元素的起始位置大于目标位置,那么结束的位置应该在目标位置左边;
    // 相反如果元素的起始位置小于目标位置,那么结束的位置应该在目标位置右边;
    var isGl;
    if (ele.offsetLeft > targetX){
        isGl = 1
    }
    else{
        isGl = 0
    }

    // 按下太快,可能会发生多个定时器的问题,需要在新建定时器前,先删除之前的定时器,那么定时器应该是全局的
    var timer = setInterval(function () {
        // 超过目的地就删除定时器
        if (isGl){
            if (ele.offsetLeft <= targetX){
                clearInterval(timer)
                // 如果回调函数不为空,调用回调函数
                callback && callback()
                return
            }
        }
        else{
            if (ele.offsetLeft >= targetX){
                clearInterval(timer)
                // 如果回调函数不为空,调用回调函数
                callback && callback()
                return
            }
        }

        // 移动的像素不再是固定的,而是动态变化的
        var step = (targetX - ele.offsetLeft) / 10
        step = step > 0 ? Math.ceil(step) : Math.floor(step)

        // 移动距离
        ele.style.left = ele.offsetLeft + step + 'px'
    }, 15)
}