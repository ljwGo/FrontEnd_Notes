var dropMenuEles = document.getElementsByClassName('drop-menus')
for (var i=0; i<dropMenuEles.length; i++){
    dropMenuEles[i].onmouseover = function(){
        // lastChild获取的是下一个节点,可能是文本节点
        var itemsEle = this.lastElementChild
        // 这里必须写成""空字符串,不是none
        if (itemsEle.style.display === ""){
            itemsEle.style.display = "block"
        }
    }
    dropMenuEles[i].onmouseout = function(){
        var itemsEle = this.lastElementChild
        if(itemsEle.style.display === "block"){
            itemsEle.style.display = ""
        }
    }
}