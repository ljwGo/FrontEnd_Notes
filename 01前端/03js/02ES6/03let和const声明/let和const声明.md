[toc]

## let 声明具有块级作用域

```javascript
var i = 1
// let声明的变量没有影响到全局
for (let i=2; i< 10; i++){
    ;
}
console.log(i)
```



## 不存在变量提升

```javascript
console.log(n)
let n = 2

// 对比var
// console.log(n)
// var n = 20
```



## const声明常量

> const声明对象和数组时,里面的值可以改变,本身不能够改变

```javascript
const person = {
    name: 'zhangsan',
    age: 18,
}
// 不会报错
person.age = 93
// 会报错
person = "这个人不在了"
```

类似C语言中的

> int * const p;