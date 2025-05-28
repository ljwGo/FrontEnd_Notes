var divEle = document.querySelector('div')

// 禁止右键菜单
divEle.addEventListener("contextmenu", function(e){
    e.preventDefault()
})

// 禁止文字选中
divEle.addEventListener("selectstart", function(e){
    e.preventDefault()
})