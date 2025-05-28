var firstDivEle = document.getElementsByTagName('div')[0]
var secondDivEle = document.getElementsByTagName('div')[1]

// 传统方式注册 同一事件只能绑定一个事件处理
firstDivEle.onclick = function (){
    alert('第一个事件')
}

firstDivEle.onclick = function (){
    alert('第二个事件')
}

// 通过addEventListener方式可以为同一个标签的
// 同一事件绑定多个事件处理
secondDivEle.addEventListener('click', function(){
    alert("第三个事件")
})

secondDivEle.addEventListener('click', function(){
    alert("第四个事件")
})