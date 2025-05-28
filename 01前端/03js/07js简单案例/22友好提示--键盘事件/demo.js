var tipEle = document.querySelector(".tips")
var inputEle = tipEle.nextElementSibling

// inputEle.onchange = function(){
//     tipEle.innerText = this.value
// }

inputEle.onkeyup = function () {
    if (inputEle.value === "") {
        // tipEle.style.display = "none"
        tipEle.style.visibility = "hidden"
    } else {
        // tipEle.style.display = "block"
        tipEle.style.visibility = "visible"
        tipEle.innerText = this.value
    }
}

// 鼠标离开,提示框也会消失
inputEle.onblur = function () {
    tipEle.style.visibility = "hidden"
}

// 鼠标点击,如果有内容,提示框也会出现
inputEle.onfocus = function () {
    if (inputEle.value !== "") {
        tipEle.style.visibility = "visible"
    }
}