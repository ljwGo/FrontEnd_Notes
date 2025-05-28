[toc]

# 0. 序言

这里简单介绍一下JavaScript实现异步函数的机制.

参考[深入理解JavaScript的执行机制（同步和异步） - bingxiaoxiao - 博客园](https://www.cnblogs.com/xiaoxiao2017/p/12690778.html)

写得很好

微任务和宏任务的类型有

[什么是宏任务、微任务？宏任务、微任务有哪些？又是怎么执行的？-CSDN博客](https://blog.csdn.net/NancyFyn/article/details/118407548)

# 1. JavaScript异步的实现机制

**JavaScript脚本是单线程的**, 这也意味着, 如果主线程阻塞, JavaScript执行将完全阻塞.

**JavaScript实现异步的方式是通过延后费时任务(如读取大文件)**, JavaScript如将setTimeout宏任务等注册的方法加入**事件队列**, **当主线程的任务执行完毕**, 才会回到事件队列中查询些准备就绪的任务, 将它们返回到主线程中执行.

# 2. 微任务Promise

Promise的执行时机比较特别, 它在每轮**主线程任务执行完成之后, 事件队列就绪任务之前**

主线程任务->微任务->宏任务

验证:

```javascript
const express = require('express')

const app = express()
const port = 8080

app.get('/', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*')

    const filepath = "test.txt"
    const fs = require('fs')

    let timerTask = setTimeout(() => {
        console.log("任务1执行")
    }, 3000)

    let timerTask02 = setTimeout(() => {
        console.log("任务2执行")
    }, 4000)

    setTimeout(() => {
        new Promise((resolve, error) => { resolve() }).then(console.log("promise in setTimeout"))
        console.log("任务4执行")
    }, 0)

    setTimeout(() => {
        console.log("任务0执行")
    }, 0)

    new Promise((resolve, error) => {
        console.log('read file')
        fs.readFile(filepath, (err, data) => {
            if (err) {
                error('read file error!')
                console.log('failed!')
            } else {
                resolve(data.toString())
                console.log('success!')
            }
        })
        console.log('read file ...')
    }).then((data) => {
        console.log(data)
    }).catch((error) => {
        console.log(error)
    })

    let sum = 0
    for (let i = 0; i < 1e8; i++) {
        sum += i;
    }
    console.log(sum)
})

app.listen(port, () => {
    console.log("服务启动")
})
```

使用express服务器

```javascript
const express = require('express')

const app = express()
const port = 8080

app.get('/', (req, res)=>{
    res.setHeader('Access-Control-Allow-Origin', '*')
	...
}
app.listen(port, ()=>{
    console.log("服务启动")
})
```

特别说明, 这里使用的node环境, 可能和浏览器环境稍有不同.

执行结果

```txt
read file
read file ...
4999999950000000
promise in setTimeout
任务4执行
任务0执行
success!
我是一段文本本本本本本本本本本本本本本本本本本本本本本本本本本本本本本本本本本本本本本本本本本本本本本本本本本本本本本本本本本本本本本本本本本本本本本本本本本
本本本本本本本本本本本本本本本本本本本本本本本本本本本本本本
任务1执行
任务2执行
```

