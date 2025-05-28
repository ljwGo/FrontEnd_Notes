[toc]

## babel使用,将高版本语法兼容低版本



## 最好使用入口文件,在一个文件中引入其它所有文件

```javascript
import * as mo1 from "./module1"
import * as mo2 from "./module2"
```



## 下载babel-cli命令行工具,  babel-preset-env新语法工具, browersify 打包工具



## npx babel 目标目录 -d 指定存放目录 --presets=babel-preset-env转换

![](.\babel配置.png)



## 打包文件,打包入口文件即可

![](.\babel转码.png)

![](.\browserify转码.png)



## 最后在html文件中引入打包后的js文件即可

```javascript
    <script src="./dist/js/app.js">
        // 没打包会报错
    </script>
```