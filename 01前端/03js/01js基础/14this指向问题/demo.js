// 全局变量会变成window顶级对象的属性
// this指向的就是它所在的对象里,这里是window
console.log(this)

var divEle = document.querySelector("div")
// divEle.addEventListener('click', function (){
//     // this指向的就是它所在的对象里,这里是btnEle
//     console.log(this)
// })

// setInterval(function(){
//     // 这里的this是windwo,很坑
//     console.log(this)
// }, 1000)

// 判断下面的this指向
divEle.addEventListener('mouseenter', function(){
    console.log(1)
    // 这里的this是div元素
    console.log(this)
    setInterval(function(){
        console.log(2)
        // 这里的this指向window
        console.log(this)
    }, 2000)
})