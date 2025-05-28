keydown keyup和keypress的区别
前两者不区分大小写
后者区分大小写
keydown支持shift ctrl等特殊按键
而keypresss不支持

div等非输入性质的元素(与其对应的可输入性元素有input, textarea)， 是不可被聚焦的。
所以无法监听其的键盘事件。
而通过增加 tabindex 属性，可以指定该元素可聚焦。必须是行内式?