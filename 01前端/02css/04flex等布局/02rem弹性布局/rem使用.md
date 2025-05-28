[toc]

# rem使用

## 什么是rem

> ren是**度量单位**,
>
> **1rem=根元素(html标签)的字体大小**
>
> 比如:
>
> ​	默认**html标签文字字体大小**是16px,那么1rem=16px
>
> ​	如果是10px,那么1rem=10px



## 为什么使用rem

> 使用rem可以很方便的使文字大小,盒子宽度和高度
>
> 根据开发者的规则进行调整,**只需要改变根元素的字体大小,所有使用rem为单位的元素字体,盒子模型宽度和高度都会改变**
>
> 而**不需要对每一个元素单独使用媒体查询调整不同样式**



## 示例

```html
<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>remUseMethod</title>
    <link rel="stylesheet" href="./rem使用.css">
    <style>
        /*根据浏览器窗口宽度修改根元素的字体大小*/
        @media (max-width: 299px){
            html{
                font-size: 10px;
            }
        }
        @media (min-width: 300px){
            html{
                font-size: 20px;
            }
        }
    </style>
</head>
<body>
    <div>
        我是字体
    </div>
</body>
</html>
```

```css
div {
    width: 10rem;
    height: 5rem;
    background: deepskyblue;
    font-size: 1rem;
}
```



## 使用js动态改变html根元素的字体大小

```html
    <script>
        var f = ()=>{
            // 设置基准字体大小
            let basisSize = 20;
            // 计算动态字体大小
            let verifySize = (basisSize * window.innerWidth / 320) > 50 ? 50 : (basisSize * window.innerWidth / 320)
            // 设置
            document.documentElement.style.fontSize = verifySize + "px";
        }
        // 增加监听，分别是页面加载时，或者窗口大小发生改变时
        window.addEventListener("load", f)
        window.addEventListener("resize", f)
    </script>
```