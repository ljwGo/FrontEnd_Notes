[toc]
# 0. 序言

在将自己的next项目部署到云主机上出现问题, 提示找不到"Users表"

原因是, **schema.prisma和数据库表结构对应不上**

# 1. 验证

在操作前, **务必使用如mysql workbench(实际是mysqldump)等**工具将数据表结构和数据进行备份

你可以通过

```cmd
npx prisma migrate dev
```

来查看prisma**根据schema.prisma生成的表是否和数据库已经存在的表一致**, 

**切记不要按y, 确定提交迁移**.

如果不一致, 就要修改schema.prisma表了. 因为修改数据库表难度更大.

# 2. @@map() 指定映射关系
schema.prisma文件的作用是, 定义数据库表和javascript对象的映射关系.

**使用@@map()指定映射到的数据表名称**

# 3. npx prisma generate 应用修改

