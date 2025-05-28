var tabEles = document.getElementsByClassName("tab")
var showAreaEles = document.getElementsByClassName("info-banner")[0].querySelectorAll('div')

for (var i=0; i<tabEles.length; i++){
    tabEles[i].onclick = function(){
        // 干掉其他人
        for (var i=0; i<tabEles.length; i++){
            tabEles[i].className = "tab"
        }
        // 更改自己
        this.className = "tab chocked"
        // 获取自定义属性值
        var index = this.getAttribute("index")
        // 遍历展示区模块,对应的显示,其他杀死
        for (var i=0; i<showAreaEles.length; i++){
            // tab栏的属性值index标记对应哪一个展示区
            if (i == index){
                showAreaEles[i].style.display = "block"
            }
            else{
                showAreaEles[i].style.display = "none"
            }
        }
    }
}