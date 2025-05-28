学会使用自定义属性,来保存数据
这个数据可以保存不同标签之间的联系
同时遇到一个问题
使用display: inline-block属性
和百分比宽度时
5个20%宽度的标签会发生换行
原因是文本元素也会占据空间
<div>
	<div></div>
	<div></div>
	<div></div>
	<div></div>
	<div></div>
</div>

应写成
<div></div><div></div><div></div><div></div><div></div><div></div>