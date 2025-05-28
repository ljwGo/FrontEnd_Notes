// 点击发布,新建li标签,删除按钮在li里
// 清空textarea标签内容
// li标签获取textarea标签内容,添加到ul开头
// 给ul绑定事件,a标签点击,删除对应的li使用slideup和slidedown


var ul = $('.comments')
var btn = $('.comment-publish-bar button')
var textarea = $('.comment-publish-bar textarea')

// 点击发布
btn.click(function(){
    // 新建li标签,删除按钮在li里,li标签获取textarea标签内容,添加到ul开头
    if (textarea.val() !== ''){
        ul.prepend($(`<li style="display: none">${textarea.val()} <a href="javascript:;">删除</a></li>`))
        ul.children().first().stop().slideDown(1000)
    }
    // 清空textarea标签内容
    textarea.val('')
    console.log('添加成功');
})

// 给ul绑定事件,a标签点击,删除对应的li使用slideup和slidedown
ul.on('click', 'a', function(){
    $(this).parent().stop().slideUp(1000)
    console.log('触发上滑动事件');
})