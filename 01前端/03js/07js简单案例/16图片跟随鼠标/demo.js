// 获取移动图片
var imgEle = document.querySelector("div")
// 直接给document对象绑定鼠标移动事件
document.onmousemove = function(e){
    imgEle.style.top = e.pageY + "px"
    imgEle.style.left = e.pageX + "px"
}