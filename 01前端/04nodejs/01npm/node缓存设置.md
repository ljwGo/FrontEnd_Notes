[toc]

参考[nodejs prefix（全局）和cache（缓存）windows下设置 - FishEleven - 博客园](https://www.cnblogs.com/fisheleven/p/6775380.html)

# 1. 缓存和仓库地址修改

* 创建目录node_cache和node_global

* 调用命令

  设置全局位置(实际位置是D:\\Node\\node_global\\node_modules)

  ```npm
  npm config set prefix "D:\\Node\\node_global"
  ```

  设置缓存

  ```npm
  npm config set cache "D:\\Node\\node_cache"
  ```

* 修改配置文件内容

  修改文件`npmrc`的内容,添加

  ```txt
  prefix=D:\Node\node_global
  ```

  这修改npm ls  -g查询结果的路径

* 查看结果

  ```npm
  npm config list
  ```

  