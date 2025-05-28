[toc]

## fs模块简单介绍

```javascript
let fs = require('fs')
// console.log(fs)
// fs是一个用于读取文件的模块

// fs第二个参数是回调函数,回调函数第一个参数是错误值,如果加载文件失败返回一个错误对象
// 如果正确,则返回null
// data是文件内容, 它是buffer二进制
fs.readFile('./test.txt', function(err, data){
    console.log(err)
    console.log(data)
    console.log(data.toString())
})
```



## promise主要是为了解决回调地狱的问题

回调地狱

```javascript
fs.readFile('./test.txt', (err, data)=>{
    if (err) throw err;
    fs.readFile(`./${data.toString()}`, (err, data)=>{
        if (err) throw err;
        fs.readFile(`./${data.toString()}`, (err, data)=>{
            console.log(data)
        })
    })
})
```



## promise简单使用

```javascript
let fs = require("fs")

let p = new Promise((resolve, reject) => {
    setTimeout(()=>{
        fs.readFile('./test.txt', (err, data)=>{
            if (err) reject(err);
            else resolve(data)
        })
    }, 3000)
})

p.then(function(arg){
    console.log(arg)
}, function(err){
    throw err
})
```

> 介绍:
>
> ​	生成promise对象时,**传入一个回调函数**
>
> ​	回调函数会传入两个参数,**均为方法**
>
> ​	第一个,将**promise对象状态改为正确**
>
> ​	第二个,将**promise对象状态改为失败**
>
> ​	p.then方法传入**两个回调**,第一个为**正确时调用**,第二个为错误时调用



## promise的链式调用

promise的**then方法**返回一个**promise对象**

```javascript
let fs = require("fs")

let p = new Promise((resolve, reject) => {
    setTimeout(()=>{
        fs.readFile('./test.txt', (err, data)=>{
            if (err) reject(err);
            else resolve(data)
        })
    }, 1000)
})

const obj = p.then(function(arg){
    console.log(arg)
}, function(err){
    throw err
})

console.log(obj)
```

返回的promise**状态由then方法中的回调函数返回值决定**

```javascript
const { error } = require("console");
let fs = require("fs")

let p = new Promise((resolve, reject) => {
    setTimeout(()=>{
        fs.readFile('./test.txt', (err, data)=>{
            if (err) reject(err);
            else resolve(data)
        })
    }, 1000)
})

p.then(function(value){
    // 第一种: 返回值为非promise对象,则then返回正确.
    // return "data"
    // 第二种: 返回值为promise对象,则then的结果由promise对象的状态决定
    // return new Promise(function(resolve, reject){
    //     reject("为下次then传参")
    // })
    // 第三种: 抛出异常
    // throw new Error("error~!~!~!")
}, function(reason){
    throw err
}).then(function(value){
    console.log('第二个then的正确路线触发了!!!')
}, function(reason){
    console.log('第二个then的错误路线触发了!!!')
})
```
