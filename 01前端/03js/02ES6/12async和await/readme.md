[toc]

## async函数和await配合使用

## await后跟随promise对象

## async和await函数是为了让异步程序开起来像同步的



## 实践

```javascript
let fs = require("fs")

function func1(){
    return new Promise((resolve, reject) => {
        fs.readFile('./test1.txt', (err, data)=>{
            if (err) throw err
            console.log(data + '\n')
            resolve(data)
        })
    })
}

function func2(){
    return new Promise((resolve, reject) => {
        fs.readFile('./test2.txt', (err, data)=>{
            // if (err) throw err
            console.log(data + '\n')
            resolve(data)
        })
    })
}

function func3(){
    return new Promise((resolve, reject) => {
        fs.readFile('./test3.txt', (err, data)=>{
            // if (err) throw err
            console.log(data + '\n')
            resolve(data)
        })
    })
}

async function func(){
    try{
        let data1 = await func1()
        let data2 = await func2()
        let data3 = await func3()
        console.log(data1.toString())
        console.log(data2.toString())
        console.log(data3.toString())
    }
    catch(err){
        console.log(err)
    }
}

func()
```



## 解析

> async函数中**await将返回promise对象成功的值**
>
> **并且此时继续往下执行**
>
> 如果遇到**await返回的promise对象使用了reject方法**,
>
> 终止整个函数执行
>
> 可以使用**try catch语句**捕捉**某个promise对象错误时的值**



## 之所以如此麻烦,有多种解决异步的问题,还是javascript的异步机制导致的