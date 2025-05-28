var fatherEle = document.getElementsByClassName("father")[0]
var sonEle = document.getElementsByClassName("son")[0]

// mouseenter事件不接受冒泡,而mouseover事件会接受冒泡
// sonEle.addEventListener('mouseenter', function(){
//     console.log(1)
// })

sonEle.addEventListener('mouseover', function(){
    console.log(1)
})

fatherEle.addEventListener('mouseenter', function(){
    console.log(2)
})

// fatherEle.addEventListener('mouseover', function(){
//     console.log(2)
// })