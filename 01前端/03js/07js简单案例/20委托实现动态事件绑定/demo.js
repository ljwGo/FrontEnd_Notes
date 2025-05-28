// 只给ul绑定一次事件,让新建的li标签能够触发事件,输出自己的内容
// 不需要给新建的每个li都绑定新的事件,这样需要绑定多次

var btnEle = document.querySelector("button")
var ulEle = document.querySelector("ul")
// 保存li标签的内容
var num = 1

// 新建事件
btnEle.addEventListener('click', function(){
    var newLiEle = document.createElement('li')
    ulEle.append(newLiEle)
    newLiEle.innerHTML = num++;
})

// 提示内容事件
ulEle.addEventListener('click', function(e){
    // e.target被点击的那个li标签,不是ul标签
    alert(e.target.innerHTML)
})