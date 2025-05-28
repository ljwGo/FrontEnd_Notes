var div = $('div')

// 获取的是dom文档中的同级标签（兄弟）中的索引，而非div这个伪数组中的索引位置

div.click(function(){
    console.log($(this).text())
    console.log($(this).index())
})