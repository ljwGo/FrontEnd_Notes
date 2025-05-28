[toc]

# 0. 序言

CGI全称Common Gateway Interface. 它是网关,接口? 我理解为**协议**

计算机网络中的网关, 用于连接不同协议的网络, 比如nat和外网ip的连接. 任何异构网络和ip的连接.

所以你可以认为**CGI是一种协议, 满足协议的程序之间就能就行交流, 实现某种功能** 

要想知道CGI是一种什么协议? 要考究web的发展历程

参考[万法归宗——CGI - 知乎](https://zhuanlan.zhihu.com/p/25013398)



# 1. web的发展历程

* 早期的web应用发送的都是静态html
* 随着web应用的发展, 出现了根据实时数据生成动态页面的需求

<span style='color:red'>人类的发展历程是逐步发展的, 踩下的坑后人是要偿还的</span>

此时, 我有一个静态web服务器, 我能想到的就是

动态生成html, 再把这个html看作"静态的", 由静态web服务器发送出去.

谁来生成动态html, 那就是CGI程序.

**静态web服务器和CGI程序之间沟通的协议就是CGI协议**



# 2. CGI程序原理

(1) 此时在Web服务器调用helloworld.cgi之前，会把各类HTTP请求中的信息以**环境变量**的方式写入OS。CGI程序本质是OS上一个普通的[可执行程序](https://zhida.zhihu.com/search?content_id=2191766&content_type=Article&match_order=1&q=可执行程序&zhida_source=entity)，它通过语言本身库函数来获取环境变量，从而获得数据输入。

(2) 除[环境变量](https://zhida.zhihu.com/search?content_id=2191766&content_type=Article&match_order=4&q=环境变量&zhida_source=entity)外，另外一个CGI程序获取数据的方式就是**标准输入（stdin）**。如post请求一个CGI的URL，那么[POST](https://zhida.zhihu.com/search?content_id=2191766&content_type=Article&match_order=1&q=POST&zhida_source=entity)的数据，CGI是通过标准输入来获取到的。

(3) 而CGI如何构造出数据（比如HTML页面）返回给浏览器呢？其实CGI本身只要向标准输出去写入数据即可。比如printf、cout，比如System.out.println，又比如print、echo等。因为Web服务器已经做了重定向，将标准输出重定向给Web服务器的与浏览器连接的[socket](https://zhida.zhihu.com/search?content_id=2191766&content_type=Article&match_order=1&q=socket&zhida_source=entity)。

(4) 此时要注意的是，不要以为返回HTML页面，那么直接输出一段HTML代码就OK，注意。此时CGI的输出承担的是HTTP协议的响应部分，因此HTTP响应报头也要自己标准输出出来。比如

```url
http://guodongxiaren.me/cgi-bin/helloworld.cgi
```

php的Apache, nginx都是可能的CGI目标服务器.



# 3. CGI程序的缺点

CGI程序的缺点, 每有一个请求, 就会新建一个进程. 浪费很多性能.

## 3.1 CGI程序改进, FastCGI

使用进程池实现资源服用, 这就是FastCGI