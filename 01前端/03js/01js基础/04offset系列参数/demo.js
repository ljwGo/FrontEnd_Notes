var div1Ele = document.querySelector('#div1')
var div2Ele = document.querySelector('#div2')
var div3Ele = document.querySelector('#div3')

// 获取元素相对于有定位的父亲的偏移,父节点都没有定位,默认以body为准
console.log("div1偏移")
console.log(div1Ele.offsetTop)
console.log(div1Ele.offsetLeft)

console.log("div2已经定位,div3相对div2为子标签")
console.log(div3Ele.offsetTop)
console.log(div3Ele.offsetLeft)

// 获取元素的宽高,包括内容,padding内边距和border边框
console.log("div1宽高")
console.log(div1Ele.offsetWidth)
console.log(div1Ele.offsetHeight)

// 修改div1的边框高度
div1Ele.style.border = "solid 10px blue"
console.log("div1修改边框后的宽高")
console.log(div1Ele.offsetWidth)
console.log(div1Ele.offsetHeight)