var tbodyEle = document.querySelector('tbody')
var trEles = tbodyEle.querySelectorAll('tr')
for (var i = 0; i<trEles.length; i++){
    // 当鼠标悬停到表格的行时,背景颜色会变为灰色
    trEles[i].onmouseover = function(){
        this.style.backgroundColor = "#ddd"
        // console.log("鼠标悬停")
    }
    // 当鼠标离开表格行时,背景颜色会变为白色
    trEles[i].onmouseout = function(){
        this.style.backgroundColor = "#fff"
        // console.log("鼠标离开")
    }
}
