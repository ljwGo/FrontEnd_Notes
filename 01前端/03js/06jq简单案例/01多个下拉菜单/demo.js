$('.drop-menus').mouseover(function(){
    $(this).children('a').css('background-color', 'pink')
    $(this).siblings().children('a').css('background-color', '#fff')
    $(this).children('ul').show()
    $(this).siblings().children('ul').hide()
})