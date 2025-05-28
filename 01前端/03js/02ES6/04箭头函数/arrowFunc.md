[toc]

## 箭头函数的声明

```javascript
const func = () => {
    console.log("I am a arrow function!!!")
}

func()
```

有参函数(**依旧是支持形参实参不一一对应**)

```javascript
let func = (a, b) => {
    console.log(`I am a arrow function!!! a=${a}, b=${b}`)
}

func()
```



## call方法的不同

```javascript
const commonFunc = function(){
    console.log("commonFunc: " + this.name)
}

const arrowFunc = () => {
    console.log("arrowFunc: " + this.name)
}

const obj = {
    name:  "我是对象下的value",
}

// 会改变
commonFunc.call(obj)
// 不会改变
arrowFunc.call(obj)
```

出现这种现象本质还是下面this的问题



## 箭头函数的简写

但函数**只有一个形参,或者函数体只有一条语句时,可以简写**

```javascript
const func = a => a * a
// 相当于
// const func = (a) => {
//     return a * a;
// }
```



## 箭头函数不能够作为构造器

```javascript
const construct = (a, b) => {
    this.a = a;
    this.b = b;
}

const obj = new construct(100, 200);
```



## 箭头函数this指向是静态的

箭头函数中的this**永远指向声明时所在的作用域,它在什么作用域下声明,this就指向它**

普通函数中的this**指向调用时的对象**

```javascript
window.value = "我是一个测试值,我在window对象下"
const commonFunc = function(){
    console.log("commonFunc:" + this.value)
}

const arrowFunc = () => {
    console.log("arrowFunc:" + this.value)
}

// 在全局下调用
commonFunc()
arrowFunc()

const obj = {
    commonFunc,
    arrowFunc,
    value: "我是对象下的value",
}

// 通过对象调用
obj.commonFunc()
obj.arrowFunc()
```

执行结果

```javascript
commonFunc:我是一个测试值,我在window对象下
arrowFunc:我是一个测试值,我在window对象下
commonFunc:我是对象下的value
arrowFunc:我是一个测试值,我在window对象下
```

 记住区别

>箭头函数在**声明时this就已经确定**
>
>普通函数在**调用时this才确定**



函数不算对象, 内部调用无用, 只有成员运算符.的调用才算

```javascript
window.msg = "in window";

function Fn() {
  console.log(this.msg);
}

function Cmp() {
  let msg = "in Cmp";

  const arrorFn = () => {
    console.log(this.msg);
  };

  Fn();  // 调用者是window
  arrorFn(); // 调用者是window
}
```



## 箭头函数使用场景总结

> 箭头函数使用在于**this无关的回调**, 比如**定时器,数组方法回调**
>
> 箭头函数不适应于**this有关的回调**,比如**事件机制和对象的方法**