[toc]

## ? 可选链操作符

```javascript
function func(obj){
    // 利用短路运算, 可以判断obj, obj.a, obj.a.b是否有值,放置用户传入格式不正确的实参
    const data = obj && obj.a && obj.a.b 
    // ES11的语法糖
    const data2 = obj?.a?.b
}

// func({
//     a: {
//         b: 'b'
//     }
// })

func({a: 'eeeee'})
```

