var divEles = document.querySelectorAll("div")

divEles[0].addEventListener("keyup", function(e){
    console.log("keyup输入的键其ascii码为: " + e.keyCode + e.key)
})

divEles[1].addEventListener("keydown", function(e){
    console.log("keydown输入的键其ascii码为: " + e.keyCode)
})

divEles[2].addEventListener("keypress", function(e){
    console.log("keypress输入的键其ascii码为: " + e.keyCode)
})