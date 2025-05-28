var inputEle = document.querySelector("input")

// 给document对象绑定事件,只要用户输入了s键,就自动定义到输入框
document.onkeyup = function(e){
    console.log(e.keyCode)
    if (e.keyCode === 83){
        inputEle.focus()
    }
}