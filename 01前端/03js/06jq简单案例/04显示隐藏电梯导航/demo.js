$(function(){
    var $liftNavigate = $('.lift-navigate')
    var targetDistance = 400
    var initDistance = $liftNavigate.offset().top
    var lifts = $('.main-context>div')
    var flag = true

    // 滚动时,侧边栏定位
    $(window).scroll(function(){
        if($(document).scrollTop() >= targetDistance){
            // 改变定位方式
            $liftNavigate.css('position', 'fixed')
            $liftNavigate.css('top', (initDistance - targetDistance).toFixed(2) + 'px')
            console.log("固定定位")
        }
        else{
            // 改变定位方式
            $liftNavigate.css('position', 'absolute')
            $liftNavigate.css('top', initDistance.toFixed(2) + 'px')

            console.log("绝对定位")
        }
        
        if(flag){
            // 滚动时,也要确认滚动那一层,给对应楼层标记红色
            for (var i=lifts.length-1; i>=0; i--){
                if ($(document).scrollTop() >= lifts[i].offsetTop){
                    // 设置楼层对应的红色
                    $liftNavigate.children('li').eq(i).addClass('current').siblings().removeClass('current')
                    break
                }
            }
        }
    })

    // 滚动到对应楼层
    $liftNavigate.on('click', 'a', function(){
        // 关闭节流阀
        flag = false
        // 更改选中的楼层,标记为红色
        $(this).parent().addClass('current').siblings().removeClass('current')
        // 滚动到对应楼层
        // 动画函数必须是元素执行,所以不能使用document或者window
        // 这个和window.scroll(0, top)实现滚动不同
        $("body, html").stop().animate({
            scrollTop: $('.main-context').children('div').eq($(this).parent().index()).offset().top.toFixed(2) + 'px'
        }, 1000, function(){
            flag = true
        })
        console.log("滚动了")
    })
})