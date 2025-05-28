[toc]

# 0. pnpm比npm的优势

简单来说, 它利用扁平化来避免重复安装; 又利用快捷方式来构筑树形嵌套关系, 消除依赖提升带来的管理难题.

参考[为什么现在我更推荐 pnpm 而不是 npm/yarn? - 苍青浪 - 博客园](https://www.cnblogs.com/cangqinglang/p/14448329.html)



# 1. pnpm设置

## 1.1 设置PNPM_HOME的环境变量

## 1.2 设置缓存和全局安装位置

```npm
pnpm config set global-bin-dir "D:\software\Plugins\pnpm\pnpm-store"
pnpm config set cache-dir "D:\software\Plugins\pnpm\pnpm-store\cache"
pnpm config set state-dir "D:\software\Plugins\pnpm\pnpm-store\state"
pnpm config set global-dir "D:\software\Plugins\pnpm\pnpm-store\global"
```

参考[pnpm设置全局存储路径_you may change the global store location by runnin-CSDN博客](https://blog.csdn.net/weixin_46533577/article/details/138288167)



# 2. 注意事项

## 2.1 cmd执行pnpm脚本报权限不足

原因是window的安全策略, 查看选择策略

```powershell
get-ExecutionPolicy
```

设置其它策略

```powershell
set-ExecutionPolicy -Scope CurrentUser
```



# 3. 帮助文档和查看所有命令

```pnpm
pnpm -h
```

