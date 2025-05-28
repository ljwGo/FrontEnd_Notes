var divEles = document.querySelectorAll("div")

// style是可读写的,他只包括内容,不包括padding和border,获取的为空
console.log(divEles[0].style.width)
console.log(divEles[1].style.height)

console.log("----------------------")
// offset包含padding,border和内容,是只读的
console.log(divEles[0].offsetWidth)
console.log(divEles[0].offsetHeight)