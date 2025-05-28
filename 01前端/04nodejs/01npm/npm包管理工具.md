[toc]

# npm包管理工具简介

> npm是**基于node.js**的,在下载node,js时,已经集成了npm包管理工具
>
> npm类似**linux中的yum命令**,以及**C#中的Nvmet包命令**
>
> 使用npm是管理其他程序员写好的功能模块,**解决依赖关系,实现完成功能**

# npm中文使用文档[npm 中文文档 | npm 中文网 (npmjs.com.cn)](https://www.npmjs.com.cn/)

## 记得使用帮助命令

## npm -v 查看npm版本

## npm init 为项目目录初始化包管理系统信息

## npm xxx(某个command) --global 设置为全局配置

> 类似python中的**虚拟环境**
>
> 如果每一个项目依赖的包都存放到同一个地方,可能会发生冲突,**另外管理起来不方便**
>
> --global将**包**安装在系统变量下,在命令行任何地方都能够访问
>
> **不加默认在存放在当前目录的node_module下**

## npm config get registry 查看镜像源地址

## npm config set registry url地址 设置新的源

# 初始化包管理后新增加目录package.json

```json
{
  "name": "testproject",
  "version": "1.0.0",
  "description": "test project",
  "main": "index.js",
  "scripts": {
    "test": "test"
  },
  "repository": {
    "type": "git",
    "url": "git"
  },
  "keywords": [
    "none"
  ],
  "author": "ljw",
  "license": "ISC"
}
```

这是手动设置值的



## npm run test 运行package.json文件中scripts项目中test的值

这个设置可以用来设置**自定义命令**

比如我增加一个test.js文件

```
console.log("hello world npm")
```

将配置文件改为

```json
  "scripts": {
    "test": "node ./test.js"
  },
```

执行**npm run test**相当于执行**node ./test.js命令**



## repository是远程仓库的地址

# 下载包时,手动写入更详细信息

## npm install moduleName 下载某个包

## npm install moduleName@x.x.x下载某个具体版本的包

> 关于包版本还有其他写法,比如
>
> **@^2.3.4**表示**任何版本为2.x.x(必须高于2.3.4)**都允许,x表示任何个位数
>
> **@~2.3.4**表示**任何版本为2.3.x(必须高于2.3.4)**都允许,x表示任何个位数



## npm list 查看安装的所有包

## npm list moduleName 查看某个包的信息



## npm install moduleName --save 安装包时,说明包为运行时依赖 (默认)

## npm install moduleName --save-dev 安装包时,说明包为开发时依赖

在使用npm install jquery命令时

出现了新的文件**package-lock.json**, 这是一个**用于版本同步的文件,别人在拷贝你项目所使用的包(不会从你本地下载,而是从npm源上)时,这个文件项目含有所有包的版本号,避免冲突**

```json
{
  "name": "testproject",
  "version": "1.0.0",
  "lockfileVersion": 2,
  "requires": true,
  "packages": {
    "": {
      "name": "testproject",
      "version": "1.0.0",
      "license": "ISC",
      "dependencies": {
        "jquery": "^3.6.0"
      }
    },
    "node_modules/jquery": {
      "version": "3.6.0",
      "resolved": "https://registry.npmjs.org/jquery/-/jquery-3.6.0.tgz",
      "integrity": "sha512-JVzAR/AjBvVt2BmYhxRCSYysDsPcssdmTFnzyLEts9qNwmjmu4JTAMYubEfwVOSwpQ1I1sKKFcxhZCI2buerfw=="
    }
  },
  "dependencies": {
    "jquery": {
      "version": "3.6.0",
      "resolved": "https://registry.npmjs.org/jquery/-/jquery-3.6.0.tgz",
      "integrity": "sha512-JVzAR/AjBvVt2BmYhxRCSYysDsPcssdmTFnzyLEts9qNwmjmu4JTAMYubEfwVOSwpQ1I1sKKFcxhZCI2buerfw=="
    }
  }
}

```

在包目录中也有**Package.json文件**

![](.\package包文件结构.png)

**Package.json包中函数含义**

![](.\package记录第三方库的架构.png)



