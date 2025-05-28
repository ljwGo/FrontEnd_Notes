var divEle = document.querySelector("div")

divEle.addEventListener('click', function(e){
    console.dir(e)

    // 鼠标离document元素的左距离
    console.log(e.pageX)
    // 鼠标离document元素的上距离
    console.log(e.pageY)

    // 鼠标离屏幕最左边的左距离
    console.log(e.screenX)
    // 鼠标离屏幕上面的距离
    console.log(e.screenY)

    // 鼠标离浏览器窗口的左距离
    console.log(e.clientX)
    // 鼠标离浏览器窗口的上距离
    console.log(e.clientY)

    // 事件类型
    console.log(e.type)
})