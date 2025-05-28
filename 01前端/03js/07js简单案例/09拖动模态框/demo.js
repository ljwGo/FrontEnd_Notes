window.addEventListener('load', function () {
    var divBtn = document.querySelector('div')
    var bg = document.querySelector('.bg')
    var model = document.querySelector('.model')
    var closeBtn = document.querySelector('.close-btn')
    var modelHead = model.querySelector('.model-head')
    var initOffsetX = 0
    var initOffsetY = 0

    function move(e){
        // console.log(initOffsetY)
        // console.log(initOffsetX)
        // 记得带上单位
        model.style.left = e.pageX - initOffsetX + "px"
        model.style.top = e.pageY - initOffsetY + "px"
    }

    divBtn.addEventListener('click', function () {
        bg.style.display = "block"
        model.style.display = "block"
    })

    closeBtn.addEventListener('click', function () {
        bg.style.display = "none"
        model.style.display = "none"
    })

    // 当鼠标按下时,绑定鼠标移动事件
    modelHead.addEventListener('mousedown', function (e) {
        initOffsetX = e.pageX - model.offsetLeft
        initOffsetY = e.pageY - model.offsetTop
        // offsetLeft 和 offsetTop不包括transform移动的距离, 只包含top和left等
        // console.log(model.offsetLeft)
        // console.log(model.offsetTop)
        modelHead.addEventListener('mousemove', move
        )
    })

    // 因为一类事件可以绑定多个事件处理者,所以移除时需要指明那个函数
    modelHead.addEventListener('mouseup', function () {
        modelHead.removeEventListener('mousemove', move)
    })

    modelHead.addEventListener('mouseleave', function () {
        modelHead.removeEventListener('mousemove', move)
    })
})