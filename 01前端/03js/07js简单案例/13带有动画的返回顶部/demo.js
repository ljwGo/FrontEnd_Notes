// 应该移动的距离
var scrollDistance = document.querySelector('.banner2').offsetTop
var sidebarEle = document.querySelector('.sidebar')
// 右边栏距离顶部的初始距离
var initDistance = sidebarEle.offsetTop
var gobackBtn = sidebarEle.lastElementChild.querySelector('a')

window.addEventListener('scroll', function(){
    console.log('window滚动事件执行了!!!')
    if (this.scrollY >= scrollDistance){
        sidebarEle.style.position = 'fixed'
        sidebarEle.style.top = initDistance - scrollDistance + 'px'
        console.log("超过了")
    }
    else{
        sidebarEle.style.position = 'absolute'
        sidebarEle.style.top = initDistance + 'px'
    }
})

gobackBtn.addEventListener('click', function(e){
    e.preventDefault()
    gobackTop()
    console.log('返回顶部执行了')
})