[toc]

# 本地存储

## sessionStorage

> 生命周期是**浏览器关闭或当前页面关闭前**
>
> 作用域是**当前页面**

## localStorage

> 生命周期是**浏览器关闭前**
>
> 作用域是**全部页面**

## 设置方法

```javascript
window.sessionStorage.getItem(key)
window.sessionStorage.setItem(key, value)
window.sessionStorage.removeItem(key)
```

```javascript
window.localStroage.getItem(key)
window.localStroage.setItem(key, value)
window.localStroage.removeItem(key)
```