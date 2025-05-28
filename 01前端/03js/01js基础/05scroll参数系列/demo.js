var div1Ele = document.querySelector('#div1')

// 获取div真实的宽度和高度--文本内容的宽度,也可以理解为可滚动的区域高度和宽度
console.log("div1实际内容的宽高")
console.log(div1Ele.scrollHeight)
console.log(div1Ele.scrollWidth)
// 想要获取屏幕滚动的距离使用pageXOffset和pageYOffset
console.log(pageXOffset)
console.log(pageYOffset)

div1Ele.addEventListener('scroll', function (){
    // 内容滚动的距离
    console.log(div1Ele.scrollTop)
    console.log(div1Ele.scrollLeft)
})

// 检测屏幕滚动事件,需要给window对象绑定
window.addEventListener('scroll', function (){
    // 想要获取屏幕滚动的距离使用pageXOffset和pageYOffset
    console.log(pageXOffset)
    console.log(pageYOffset)
})