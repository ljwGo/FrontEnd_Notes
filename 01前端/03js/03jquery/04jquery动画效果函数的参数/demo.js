var $div = $('div')
var $btn = $('button')

$btn.first().click(function(){
    // 时间ms， 方式， 回调函数
    $div.show(2000, 'linear', function(){
        console.log(1)
    })
})

$btn.last().click(function(){
    // 时间ms， 方式， 回调函数
    $div.hide(2000, 'linear', function(){
        console.log(2)
    })
})