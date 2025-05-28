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