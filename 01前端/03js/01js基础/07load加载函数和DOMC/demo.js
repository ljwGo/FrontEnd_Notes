// var divEle = document.querySelector("div") 这样写会直接报错,原因是html文档是从上往下执行,元素没加载出来就获取就会报错

// load事件会等待页面完全加载完毕后触发(包括css, 图片等网络资源全部加载完毕)
// window.onload = function(){
//     var divEle = document.querySelector('div')
//     divEle.style.backgroundColor = "blue"
//     console.log("成功加载了")
// }

// DOMContentLoaded事件会等待主要的Html页面元素加载完毕后触发,而不需要等待样式表,图片等加载完毕
// 所以DOMContentLoaded事件的触发先于load事件
window.addEventListener('DOMContentLoaded', function(){
    var divEle = document.querySelector('div')
    divEle.style.backgroundColor = 'green'
    console.log("成功加载了")
})