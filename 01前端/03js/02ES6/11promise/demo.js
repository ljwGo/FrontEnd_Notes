// const { error } = require("console");
// let fs = require("fs")

// let p = new Promise((resolve, reject) => {
//     setTimeout(()=>{
//         fs.readFile('./test.txt', (err, data)=>{
//             if (err) reject(err);
//             else resolve(data)
//         })
//     }, 1000)
// })

// p.then(function(value){
//     // 第一种: 返回值为非promise对象,则then返回正确.
//     // return "data"
//     // 第二种: 返回值为promise对象,则then的结果由promise对象的状态决定
//     // return new Promise(function(resolve, reject){
//     //     reject("为下次then传参")
//     // })
//     // 第三种: 抛出异常
//     // throw new Error("error~!~!~!")
// }, function(reason){
//     throw err
// }).then(function(value){
//     console.log('第二个then的正确路线触发了!!!')
// }, function(reason){
//     console.log('第二个then的错误路线触发了!!!')
// })


function Person(name, age){
    this.name = name
    this.age = age
}

// 定义静态的
Person.a = 'a'
Person.b = 'b'
console.log(Person.a)
console.log(Person.b)

const person = new Person('ljw', 16)
console.log(person.a)
console.log(person.b)

// 支持动态为对象创建新属性和方法, 注意是对函数设置
Person.prototype.a = 'a'
Person.prototype.b = 'b'
console.log(person.a)
console.log(person.b)
