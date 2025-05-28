var focus = document.querySelector('.focus')
var ul = focus.querySelector('ul')
var arrowL = focus.querySelector('.arrow-l')
var arrowR = focus.querySelector('.arrow-r')
var ol = focus.querySelector('ol')
var autoMove = null
var circleNum = 0
// 节流阀标记
var flag = true

// 用来计数,哪个图片,num*图片宽度
var num = 0

// 进入后,显示左右按钮和下面的小圆圈,退出则隐藏
focus.addEventListener('mouseover', function(){
    arrowL.style.display = "block"
    arrowR.style.display = "block"
    ol.style.display = "block"
    // 进入时,同时关闭自动播放
    clearInterval(autoMove)
    autoMove = null
})

focus.addEventListener('mouseout', function(){
    arrowL.style.display = "none"
    arrowR.style.display = "none"
    ol.style.display = "none"
    // 离开时,自动播放
    autoMove = setInterval(function(){
        // 代码方式的点击
        arrowR.click()
        console.log('autoMove')
    }, 3000)
})

// 动态生成小圆圈
for (var i=0; i<ul.children.length; i++){
    var liEle = document.createElement('li')
    liEle.setAttribute("data-index", i)
    if (0 === i){
        liEle.className = 'current'
    }
    ol.appendChild(liEle)
}

// 实现无缝切图的方式,克隆第一张图片到末尾
ul.appendChild(ul.children[0].cloneNode(true))

// 点击圆圈,修改作用移动的变量
var circles = ol.querySelectorAll('li')
for (var i=0; i<circles.length; i++){
    circles[i].addEventListener('click', function (){
        if (flag){
            flag = false
            console.log('circle')
        // 干掉其它小圆圈,保留当前圆圈
        for (var i=0; i<circles.length; i++){
            circles[i].className = ''
        }
        this.className = "current"
        // 获取自定义属性,计算ul偏移
        var index = this.getAttribute('data-index')
        num = index
        circleNum = index
        animateX(ul, -index * focus.clientWidth, function(){
            flag = true
        })
        }
    })
}

// 右移动
arrowR.addEventListener('click', function (){
    if (flag){
        flag = false
        num++
        num %= ul.children.length
        // 实现无缝滚动
        if (num == 0){
            // 快速切换到第一张图片,并且num++
            ul.style.left = "0px"
            num++
        }
        circleNum = num == ul.children.length-1 ? 0 : num
        // circleNum的最大值是num的最大值减去1

        // 添加回调函数,动画结束后开启节流阀
        animateX(ul, -num * focus.clientWidth, function(){
            flag = true;
        })

        // 更新小圆点
        for (var i=0; i<circles.length; i++){
            circles[i].className = ''
            if(circles[i].getAttribute('data-index') == circleNum){
                circles[i].className = 'current'
            }
        }
    }
})

// 定时移动
autoMove = setInterval(function(){
    // 代码方式的点击
    arrowR.click()
    console.log('autoMove')
}, 3000)