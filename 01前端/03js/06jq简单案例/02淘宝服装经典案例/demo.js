var $images = $('.image_item')
var $items = $('.title')

$items.click(function(){
    // 选中的修改颜色，其它删除颜色
    $(this).addClass('current').siblings().removeClass('current')
    // 显示对应图片，其它图片隐藏
    // index可以获取元素所在的索引位置
    console.log($images.eq($(this).index()).show().siblings().hide())
    console.log("item event")
})