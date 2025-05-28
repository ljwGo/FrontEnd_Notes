// 获取全选按钮
var allSelectEles = document.querySelectorAll('.select-box')
// 将另外的所有商品选中按钮状态改为全选按钮的状态
allSelectEles[0].onclick = function(){
    for (var i=1; i<allSelectEles.length; i++){
        allSelectEles[i].checked = allSelectEles[0].checked
    }
}

// 子按钮按下时,判断所有子按钮的状态,如果存在没选中的,那么全选按钮为未选中,否则为选中
for (var i=1; i<allSelectEles.length; i++){
    allSelectEles[i].onclick = function(){
        var flag = 1
        for (var i=1; i<allSelectEles.length; i++){
            if (allSelectEles[i].checked === false){
                flag = 0
                break
            }
        }

        // 简写
        allSelectEles[0].checked = !!flag; // flag ? true : false
    }
}