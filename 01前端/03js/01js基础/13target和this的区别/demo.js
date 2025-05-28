var fatherEle = document.getElementsByClassName("father")[0]
var sonEle = document.getElementsByClassName("son")[0]

fatherEle.addEventListener('click', function(e){
    console.log("父亲触发了")
    console.log(this)
    console.log(e.target)
})