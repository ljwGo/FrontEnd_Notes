ajax默认只能是同源(目标url必须同协议,同IP和端口号)
jsonp利用的是script, link, img等标签可以跨域请求数据的特点创建的
a.com和b.com就是不用的域
注意jsonp使用的script必须是动态创建的