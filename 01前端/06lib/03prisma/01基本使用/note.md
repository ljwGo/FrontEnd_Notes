[toc]

# 0. 序言

​	prisma可以更便捷的管理不同的数据库, 追踪数据库表结构变化. 提供更便捷的api进行数据查询.



# 1. 安装

使用npm安装@prisma/client和prisma



# 2. 配置.env文件

连接url

> DATABASE_URL = 数据库类型:/用户名:密码@IP:端口/数据库名称/



# 3. 配置表结构映射文件schema.prisma

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "mysql"
  url      = env("DATABASE_URL")
}

// 表的结构(目前prisma对约束的支持有限)
model admin {
  id          Int           @id @default(autoincrement())
  name        String?       @db.Char(10)
  account     String?       @db.Char(12)
  psd         String?       @db.Char(12)
  course_base course_base[]
}
```



# 4. 常用命令

## 迁移命令:

* npx prisma db pull 根据存在的数据库获取表结构
* npx prisma migrate dev --name ... 生成迁移分支结点(当你生成或修改了数据库表结构时, 使用它来记录). 执行这个命令会修改数据库
* npx prisma migrate resolve --applied ... 手动指定分支节点位置(比如有人更新了数据库, 你需要同步他人的更新)



## SQL生成命令:

* npx prisma migrate diff --from-empty --to-schema-datamodel (假设数据库为空, 同步到schema.prisma所需的sql命令)



*ps:* prisma似乎不支持对记录的追踪



## 在确定数据表结构后, 生成访问数据库的api

* npx prisma generate



# 5. 连接和查询

```tsx
const { PrismaClient }=require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  const users = await prisma.admin.findMany();
  console.log(users);
}

main()
  .then(() => prisma.$disconnect())
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
```

## 一对多查询

```.prisma
model User {
  id    Int    @id @default(autoincrement())
  posts Post[]
}

model Post {
  id       Int  @id @default(autoincrement())
  author   User @relation(fields: [authorId], references: [id])  // 意味着可以直接访问到User对象了
  authorId Int
}
```

关联创建

```tsx
client.user.create({
  data: {
    posts: [create({...})]
  }
})
```



## 多对多查询

* 显示(存在第三方表)

```tsx
model Post {
  id         Int                 @id @default(autoincrement())
  title      String
  categories CategoriesOnPosts[]
}

model Category {
  id    Int                 @id @default(autoincrement())
  name  String
  posts CategoriesOnPosts[]
}

model CategoriesOnPosts {
  post       Post     @relation(fields: [postId], references: [id])
  postId     Int // relation scalar field (used in the `@relation` attribute above)
  category   Category @relation(fields: [categoryId], references: [id])
  categoryId Int // relation scalar field (used in the `@relation` attribute above)
  assignedAt DateTime @default(now())
  assignedBy String

  @@id([postId, categoryId])
}
```

关联创建

```tsx
await client.post.create({
  data: {
    title: "string",
    categories: {
      create: {
        assignedAt: 'Bob',
        assignedAt: new Date(),
        category: {
          connectOrCreate: {
            where: {
              id: 9,
            },
            create: {
              name: 'New Category',
              id: 9,
            },
          },
        }
      }
    }
  }
})
```





* 隐式

```tsx
model Post {
  id         Int                 @id @default(autoincrement())
  title      String
  categories Category[]
}

model Category {
  id    Int                 @id @default(autoincrement())
  name  String
  posts Post[]
}
```

 关联查询

```tsx
await client.post.findMany({
  include : {
   categories: true, 
  }
})
```

详细的参考官网吧.