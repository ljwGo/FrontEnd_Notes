[toc]
# 0. 序言

​	document和window的区别简单归纳为document是window的子对象. document主要是DOM中的对象, 而window不属于该范畴, window中有location之类的其它对象.

# 1. 区别
- window指浏览器中打开的窗口，即是一个浏览器窗口只有一个window对象。
- document对象是载入浏览器的HTML文档，即是window载入document。
- document是window的一个子对象。
- 使用document对象可以对HTML文档进行检查、修改或添加内容，并处理该文档内部的事件。
- 用户不能改变document.location，但是可以改变window.location。

