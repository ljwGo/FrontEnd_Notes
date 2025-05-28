var $div = $('div')

// 因为动画执行是有时间的，多次触发动画效果，每个效果执行是会排队的
// $div.first().hover(function(){
//     $div.last().fadeIn(2000)
//     console.log("动画开始了")
// }, function(){
//     $div.last().fadeOut(2000)
//     console.log("动画结束了")
// })

// 使用stop可以结束未执行完毕的动画，只保留最新的动画
// 注意stop必须加载动画函数的前面
$div.first().hover(function(){
    $div.last().stop().fadeIn(2000)
    console.log("动画开始了")
}, function(){
    $div.last().stop().fadeOut(2000)
    console.log("动画结束了")
})