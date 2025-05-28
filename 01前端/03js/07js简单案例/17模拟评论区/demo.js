// 获取标签
var submitBtn = document.querySelector(".comment-write-bar").querySelector("button")
var tipEle = submitBtn.nextElementSibling
var commentTextArea = document.querySelector(".comment-write-bar").querySelector("textarea")
var ulEle = document.querySelector("ul")
// 点击发布按钮,判断内容是否为空
submitBtn.onclick = function(){
    // 获取发布框的内容
    var value = commentTextArea.value
    // 判断是否为空
    if (value !== ""){
        // 创建新li节点
        // 创建删除按钮
        var newCommentNode = document.createElement("li")
        newCommentNode.innerHTML = value + "<a href='javascript:;'>删除</a>";
        // 清空评论区的内容
        commentTextArea.value = ""
        // 插入到ul最前
        ulEle.insertBefore(newCommentNode, ulEle.children[0])
        // 获取删除标签
        var deleteBtn = newCommentNode.children[0]
        // 给删除按钮绑定事件
        deleteBtn.onclick = function(){
            this.parentElement.parentElement.removeChild(this.parentElement)
        }
    }
    else{
        // 为空提示友好信息
        tipEle.style.display = "inline"
    }
}

// 重新点击输入框,错误提示信息将会删除掉, 同时增加边框高亮
commentTextArea.onfocus = function(){
    commentTextArea.style.borderColor = "#add8e6"
    // 事件确实触发了,但边框颜色并没有变成预期的那样,估计是被内置事件覆盖了
    tipEle.style.display = "none"
    // 尝试组织后续事件触发,失败
    // console.log("onfocus执行了")
    return false
}

// 输入框失去焦点时,边框失去高亮
commentTextArea.onblur = function(){
    commentTextArea.style.borderColor = "#ddd"
    // console.log("onblur执行了")
    return false
}