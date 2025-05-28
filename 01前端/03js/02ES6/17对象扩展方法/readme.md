[toc]

## ES8对象方法扩展

## object.values() 获取对象的值

## object.keys() 获取对象的键

## object.entries() 将对象变为二维数组

```javascript
let person = {
    name: 'ljw',
    age:18,
}

console.log(Object.keys(person))
console.log(Object.values(person))
console.log(Object.entries(person))
```



## ES10对象方法扩展

## fromEntires() 将二维数组变为对象, 与entires互为逆运算

```javascript
let array = [['a',2], ['b', 2], ['c', 3]]

console.log(Object.fromEntries(array))
```



## object.assign()方法, 作用是将两个对象合并

```javascript
// obj01 = {
//     "a" : 1,
//     "b" : 2,
// }
// obj02 = {
//     "c" : 2,
//     "a" : 44
// }
// Object.assign(obj01, obj02);
// console.log(obj01)

```

