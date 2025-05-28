[toc]

# 简单理解media媒体查询

> media媒体查询,支持根据**设备宽度或浏览器窗口宽度**进行不同样式的选择和切换



## 简单示例

```html
<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <link rel="stylesheet" href="./mediaTest.css">
</head>
<body>
    <div>1</div>
</body>
</html>
```

```css
div {
    width: 100%;
    height: 50px;
}

/*当设备宽度小于299px时,div变为虹色*/
@media screen and (max-device-width: 299px){
    div {
        background: red;
    }
}

/*当设备大小在300px到399px之间,div变为黄色*/
@media screen and (min-device-width:300px) and (max-device-width: 399px){
    div {
        background: yellow;
    }
}

/*当设备大小大于400px,div变为蓝色*/
@media screen and (min-device-width: 400px){
    div {
        background: blue;
    }
}
```



## 引入方式一

> @media (条件1) and (条件2){
>
> ​	样式...
>
> }



## 引入方式二

在style标签(也可以是link其它任何标签)上增加属性media.限制生效的屏幕或设备宽度

```html
<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
<!--    这个style默认任何情况都生效-->
    <style>
        div {
            width: 100%;
            height: 50px;
        }
    </style>
<!--    当设备宽度小于299px时,生效-->
    <style media="(max-device-width: 299px)">
        div {
            background: red;
        }
    </style>

<!--    当设备大小在300px到399px之间-->
    <style media="(min-device-width:300px) and (max-device-width: 399px)">
        div {
            background: yellow;
        }
    </style>
<!--    当设备大小大于400px-->
    <style media="(min-device-width: 400px)">
        div {
            background: blue;
        }
    </style>
</head>
<body>
<div>1</div>
</body>
</html>
```