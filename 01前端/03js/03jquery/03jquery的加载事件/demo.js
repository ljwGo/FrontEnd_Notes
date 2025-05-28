// 代替window.onload事件
// 方式一
// $(function(){
//     var div = $('div')
//     div.css({'width': "500px", 'height': '500px', 'background-color': 'red'})
// })

// 方式二
$(document).ready(function(){
    var div = $('div')
    div.css({'width': "500px", 'height': '500px', 'background-color': 'red'})
})