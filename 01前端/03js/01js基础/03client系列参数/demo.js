var div1Ele = document.querySelector('#div1')
var div2Ele = document.querySelector('#div2')
var div3Ele = document.querySelector('#div3')

// 获取元素的宽高,包括内容,padding内边距, 不包括border
console.log("div1宽高")
console.log(div1Ele.clientWidth)
console.log(div1Ele.clientHeight)

// 修改div1的边框高度
div1Ele.style.border = "solid 10px blue"
console.log("div1修改边框后的宽高")
console.log(div1Ele.clientWidth)
console.log(div1Ele.clientHeight)

// 修改div1的内边距
div1Ele.style.padding = "10px"
console.log("div1修改内边距后的宽高")
console.log(div1Ele.clientWidth)
console.log(div1Ele.clientHeight)