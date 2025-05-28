[toc]

## Symbol数据类型的作用

> Symbol数据类型是为了**解决对象属性名冲突的问题**
>
> 用来标识**唯一的,独一无二的属性或方法名**, 
>
> 同时又让成员名具有可读性, 
>
> 并且在特定场景被触发



## 基本用法

```javascript
let single1 = Symbol()
let single2 = Symbol()

// 下面两个是验证结果用的
console.log(single1, single2)
console.log(single1 === single2)
```



## 为Symbol添加描述

```javascript
let single1 = Symbol("我是标记1")
let single2 = Symbol("我是标记1")

console.log(single1, single2)
// 描述符相同,也不等价
console.log(single1 === single2)
```



## 基本用法二

```javascript
let single1 = Symbol.for("我是标记1")
let single2 = Symbol.for("我是标记1")

console.log(single1, single2)
// 注意,针对for创建的Symbol对象,如果描述符相同,那么它们是相同的,下面返回true
console.log(single1 === single2)
```



## 为对象添加Symbol属性

```javascript
const person = {
    name: 'ljw',
    age: 18,
    gander: 'male',
    hobby: 'study',
    // 还有一堆属性和方法
    eat: function(){
        console.log("我吃了")
    }
}

// 不知道的情况下,想要自定义属性,但是不知道原本对象是否有属性
// 不使用symbol,可以这样解决问题

if (person.hobby === undefined){
    person.hobby = "read"
}

// 使用symbol避免属性名冲突,一定能添加上
person[Symbol('hobby')] = "read"

console.log(person)
```



## Symbol属性不能够使用for in遍历,只能通过Reflect.ownKeys获取所有Symbol键名

```javascript
const person = {
    name: 'ljw',
    age: 18,
    gander: 'male',
    hobby: 'study',
    eat: function(){
        console.log("我吃了")
    }
}
person[Symbol('hobby')] = "read"

for (let property in person){
    console.log(`${property}: ${person[property]}`)
}
```

通过Reflect.ownKeys获取

```javascript
const person = {
    name: 'ljw',
    age: 18,
    gander: 'male',
    hobby: 'study',
    eat: function(){
        console.log("我吃了")
    }
}
person[Symbol('hobby')] = "read"

console.log(Reflect.ownKeys(person));
```



## Symbol的内置属性

> 内置属性的作用**类似python中的\_\_call\_\_,\_\_str__等方法,也类似java中的ToString**
>
> 是在特定情况下**就会自己调用的方法**

举例 Symbol.hasInstance()

```javascript
class Person{
    static [Symbol.hasInstance] = function(parm){
        console.log(parm)
        console.log("当person被用作instanceof方法的参数时,触发")
    }
}

let obj = {}

console.log(obj instanceof Person)
```

举例 Symbol.toStringTag()

```javascript
class Person{
    // 是个属性
    [Symbol.toStringTag] = "当对象被用作字符串转化操作时,触发"
}

const obj = new Person()
console.log(obj.toString())
```