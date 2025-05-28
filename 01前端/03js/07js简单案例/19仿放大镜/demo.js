// 鼠标在展示图的百分比同步到大图中
var imgEle = document.querySelector('.show-image')
var coverBgEle = document.querySelector('.cover-bg')
var bigImageEle = document.querySelector('.big')
var showAreaEle = document.querySelector('.show-area')
var showAreaAEle = showAreaEle.querySelector('a')

// 进入展示图时,显示覆盖层和大图
showAreaAEle.addEventListener('mouseenter', function(){
    coverBgEle.style.display = "block"
    bigImageEle.style.display = "block"
})

// 离开展示图时,隐藏覆盖层和大图
showAreaAEle.addEventListener('mouseleave', function(){
    coverBgEle.style.display = "none"
    bigImageEle.style.display = "none"
})

// 覆盖层跟随鼠标移动
showAreaAEle.addEventListener('mousemove', function (e){
    var y = e.pageY - coverBgEle.offsetHeight/2 - showAreaEle.offsetTop
    var x = e.pageX - coverBgEle.offsetWidth/2 - showAreaEle.offsetLeft
    // 限制覆盖层的移动范围
    y = y < 5 ? 5:y && y > 73 ? 73:y
    x = x < 5 ? 5:x && x > 205 ? 205:x

    coverBgEle.style.top = y + "px"
    coverBgEle.style.left = x + "px"

    // 计算覆盖层所在位置在展示图的百分之多少
    bigImageEle.style.backgroundPosition = (((x-5) / (imgEle.clientWidth - coverBgEle.clientWidth)) * 100 + '% ') +
    (((y-5) / (imgEle.clientHeight - coverBgEle.clientHeight)) * 100 + '%')
})

