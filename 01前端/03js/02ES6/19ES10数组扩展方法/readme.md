[toc]

## flat 将多维数组降级

```javascript
let array = [1,['a',2], ['b', 2], ['c', [1,2,3]]]

// 参数指定下降维度
// 从3维变为2维
console.log(array.flat(1))
// 从3维变为1维
console.log(array.flat(2))
```



## flatMap 类似map和flat的结合

```javascript
let array = [1, 2, 3, 4]

// 返回的是一个二维数组
console.log(array.map(value => [value * 10]))

// 返回的是一个一维数组
console.log(array.flatMap(value => [value * 10]))
```

