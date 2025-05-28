[toc]

## allSettle方法永远返回成功状态的promise对象

```javascript
const p1 = new Promise((resolve, reject)=>{
    setTimeout(()=>{
        console.log('p1')
        resolve()
    }, 2000)
})

const p2 = new Promise((resolve, reject)=>{
    setTimeout(()=>{
        console.log('p2')
        reject()
    }, 3000)
})

// 无论传入的promise对象状态如何,都会返回正确的promise
let result = Promise.allSettled([p1, p2])
console.log(result)
```



## all方法, 只有当传入的promise全为成功状态时,才判断成功; 有一个失败即失败,并返回失败的promise的值

```javascript
const p1 = new Promise((resolve, reject)=>{
    setTimeout(()=>{
        console.log('p1')
        resolve()
    }, 2000)
})

const p2 = new Promise((resolve, reject)=>{
    setTimeout(()=>{
        console.log('p2')
        reject()
    }, 3000)
})

// 无论传入的promise对象状态如何,都会返回正确的promise
let result = Promise.all([p1, p2])
console.log(result)
```