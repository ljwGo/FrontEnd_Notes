[toc]
# 0. 序言
# 1. cdn

​		使用cdn可以快速的试验React脚本. 不需要你配置那复杂的打包工具.

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script crossorigin src="https://unpkg.com/react@18/umd/react.development.js"></script>
    <script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
    <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
    <title>Document</title>
</head>

<body>
    <!-- 在浏览器中使用在线得到的babel转换jsx语法 -->
    <!-- 要在浏览器使用import, 需要type="module", 不能读取本地文件 -->
    <div id="app">
    </div>
    <!-- 指明使用babel转换jsx语法 -->
    <script type="text/babel" src="./index_cdn.js"></script>
</body>

</html>
```

index_cdn.js

```jsx
// 不要引入react
// import React from 'react';
// import ReactDOM from 'react-dom';

let app = document.querySelector('#app');
let root = ReactDOM.createRoot(app);

root.render(<h1>Hello React</h1>);
```

# 2. create-react-app

​		随着react功能的日益强大. create-react-app已经不适合快速构建完善的react项目了. 

​		[逐步淘汰 Create React App – React 中文文档](https://zh-hans.react.dev/blog/2025/02/14/sunsetting-create-react-app). 至于原因, 大致有数据获取, 路由和代码分片等问题.

​		官方推荐使用**框架**. 它集成了路由, 代码分割, 打包工具, 数据获取等. 并且与SSR等新式渲染方式兼容更好(也就是推销框架). create-react-app默认构建**SPA项目**.

## 2.1 暴露打包配置

使用

```powershell
pnpm run eject
```

打包设置比我想的复杂的多了. 有机会再使用webpack重新开始一个React项目吧.

## 2.2 SPA 结构

​		**调用pnpm run build, 观察构建好的index.html文件**. 只有一个html文件, 并且该文件结构非常简单.

```html
<!doctype html>
<html lang="en">

<head>
  <meta charset="utf-8" />
  <link rel="icon" href="/favicon.ico" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <meta name="theme-color" content="#000000" />
  <meta name="description" content="Web site created using create-react-app" />
  <link rel="apple-touch-icon" href="/logo192.png" />
  <link rel="manifest" href="/manifest.json" />
  <title>React App</title>
  <script defer="defer" src="/static/js/main.b6eae63e.js"></script>
  <link href="/static/css/main.f855e6bc.css" rel="stylesheet">
</head>

<body><noscript>You need to enable JavaScript to run this app.</noscript>
  <div id="root"></div>
</body>

</html>
```

​		真正让页面显示更多元素, 可以进行交互, 依赖的是/static/js/main.b6eae63e.js的js脚本.

