[toc]

## 有名分组

```javascript
let str = "<a>我是wajgoweajg15161gwa0哈哈哈wegawg</a>"
let s = /<a>.*?(\w+).*?<\/a>/
// 使用?<group组名>拿到分组
let s2 = /<a>.*?(?<group1>\w+).*?<\/a>/

console.log(s.exec(str))
console.log(s2.exec(str))
```

## 正向断言和反向断言

```javascript
let str = "<a>12345我是123123456哈哈哈wewe</a>"
// 正向断言, 使用(?=值)表示前一个表达式 后面 是否跟着指定值
let s = /<a>.*?(\d+)(?=哈哈).*?<\/a>/
let s2 = /<a>.*?(\d+).*?<\/a>/

console.log(s.exec(str))
console.log(s2.exec(str))
```

```javascript
let str = "<a>12345我是123123456哈哈哈wewe</a>"
// 反向断言, 使用(?<=值)表示后一个表达式 前面 是否跟着指定值
let s = /<a>.*?(?<=我是)(\d+).*?<\/a>/
let s2 = /<a>.*?(\d+).*?<\/a>/

console.log(s.exec(str))
console.log(s2.exec(str))
```

## . 全匹配

和python类似, javascript中.表示**任何一个非空(换行,空格,tab)字符**

```javascript
let str = `
    <div>12312314
        <a>我是链接1</a>
        <p>123.2.21.32</p>
    </div>
    <div>1241521
        <a>我是链接2</a>
        <p>212.222.111.33</p>
    </div>
`

// 由于.不匹配空白符, 所以必须加上\s+, \s就是当个空白符
// let result = str.matchAll(/<div>.*?\s+<a>(?<link1>.*?)<\/a>.*?\s+<p>(?<link2>.*?)<\/p>.*?\s+<\/div>/g)
// 在正则后加上s, 表示全匹配模式, .将匹配空白符
// 简化上面写发
let result = str.matchAll(/<div>.*?<a>(?<link1>.*?)<\/a>.*?<p>(?<link2>.*?)<\/p>.*?<\/div>/gs)
// g表示全部匹配, 好像是配合matchAll使用, 多次匹配的意思

for (let val of result){
    console.log(val)
}
```