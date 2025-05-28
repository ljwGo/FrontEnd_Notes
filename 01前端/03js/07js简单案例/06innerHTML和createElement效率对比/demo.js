// 计算执行时间的函数
function timer(fn) {
    function wrapper(num) {
        // 获取时间戳,毫秒为单位
        var startTime = new Date().getTime()
        fn(num)
        var endTime = new Date().getTime()
        return endTime - startTime
    }
    return wrapper
}

// innerHTML拼接字符串的方式
function strJoinMethod(num) {
    var bodyEle = document.body
    for (var i = 0; i < num; i++) {
        bodyEle.innerHTML += "<a>新链接</a>"
    }
}

// 使用createElement的方式
function createEleMethod(num) {
    var bodyEle = document.body
    for (var i = 0; i < num; i++){
        var newEle = document.createElement("a")
        newEle.innerText = "新链接"
        bodyEle.append(newEle)
    }
}

// 使用innerHTML和数组的方式
function arrayHTML(num){
    var bodyEle = document.body
    var array = []
    // 给数组添加需要创建的节点
    for (var i=0 ; i<num; i++){
        array[i] = "<a>新链接</a>>"
    }
    // 一次性拼接数组中所有字符串
    bodyEle.innerHTML += array.join("")
}

strJoinMethod = timer(strJoinMethod)
arrayHTML = timer(arrayHTML)
createEleMethod = timer(createEleMethod)

// 获取button标签
var btns = document.querySelectorAll('button')
btns[0].onclick = function(){
    console.log(strJoinMethod(1000))
}
btns[1].onclick = function(){
    console.log(createEleMethod(1000))
}
btns[2].onclick = function (){
    console.log(arrayHTML(1000))
}