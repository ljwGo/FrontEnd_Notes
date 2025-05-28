[toc]

# 0. 序言

​	简单记录下next官网的dashboard网站教程流程, 以免最后什么都忘记了, 不过这里记录的是简单的步骤概要. 详细的做法参考官网文档.



# 1. 安装

安装方法有很多, 比如使用create-next-app.

直接克隆next的GitHub仓库, 使用npm install i根据package.json下载依赖

当然也可以直接npm install react下载

下载过程中如果网络不好, 可以

* npm换源
* 使用另一个包管理工具pnpm



# 2. 环境配置

web应用都需要使用数据库, 教程使用的是vercel提供的云数据库.

**后面将使用mysql作为数据库, 使用prisma作为持久层**, 

在项目目录中, 需要**.env**文件保存连接数据库的**凭证**.



# 3. Next简介

next是使用JavaScript, 基于**React**库的**全栈式**框架.

下面介绍一些next的重要特性

## 3.1 构建时渲染和请求时渲染

​	流行的前后端分离架构, 有其优点, 也有其缺点.

​	缺点比如,客户端获取数据, 然后再渲染.渲染是在客户端执行的. next能够做到**在服务端渲染, 构建时渲染(直接生成静态html, 不需要经过再次的下载,编译和渲染)**. **请求时渲染, 不需要返回数据给客户端,再由客户端渲染**.

* getStaticProps()在构建时访问数据库

* getServerSideProps允许在每次页面请求时在服务器端获取数据并渲染页面。



## 3.2 客户端组件和服务端组件

* 客户端组件在客户端执行渲染, 适用**React的useState, useContext**等Hook, 可以通过prop传递参数. 客户端组件的渲染一般不需要服务端的数据.

* 服务端组件在服务端执行, 通常负责敏感数据的获取, 而且离数据源较近, 获取较快.相比客户端组件, 服务端组件能够使用的API不同, 彼此更加独立. 想要在两个服务器组件间通信是个麻烦事.

两种组件通过SCR在客户端和服务端之间进行**同步**.



## 3.3 基于文件系统的路由

next项目以app文件为根路由, 其下每一个拥有**page.tsx**文件的文件夹都是一个路由. 除此之外, 还有一些特殊的文件命名:

* layout.tsx: 包裹page.tsx的文件, 内容存放的是静态内容

其它文件, 比如error.tsx, loading.tsx, api(文件夹)/xxx.tsx等特殊文件作用参考文档



### 3.3.1 特殊的路由文件命名

(): 路由路径中会忽略这个文件夹

[]: 文件名称会作为**params参数**传递给下一个路由的Page组件

api/下的文件会作为数据供应暴露给外界



### 3.3.2 ?query=value&...查询参数

这个将会作为searchParams参数传递给路由Page组件



### 3.3.3 客户端获取路由信息, 以及进行导航

```tsx
import { useParams, useSearchParams, useRouter, usePathname } from 'next/navigation';

// useParams 获取url中的动态参数
// useSearchParams 获取?后的参数
function useQueryParams() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const search = searchParams.get('query') || '';
  const page = searchParams.get('page') || 1;

  router.push(`${pathname}?${searchParams.toString()}`);
  
  return { search, page };
}
```





## 3.4 流式传输

由于木桶效应, 初次加载界面时, 最低消耗时间取决于最慢的请求.

如果是串流, 总时间是三个方法相加

```javascript
const data01 = await fetchData01();
const data02 = await fetchData02();
const data03 = await fetchData03();
```

如果是同时加载, 总时间是三个方法中最慢的一个

```javascript
const data = Promise.all([
  fetchData01(),
  fetchData02(),
  fetchData03()
])
```

* next使用**loading.tsx(静态页面)替换page.tsx的内容**, 在加载时. 这种方式是全局的.

* 另一种方式是使用React的**Suspense**组件, 做到局部的占位符

```jsx
<Suspense fallback={<InvoicesTableSkeleton/>}>
  <Table/>  {/* 异步组件 */}
</Suspense>
```



## 3.5 标准html标签的替代

<Image>组件替代<img>标签, 它似乎支持懒加载(原版的img似乎也支持懒加载了)

<Link>代替<a>标签, 它的特点是支持局部的异步刷新, 不会刷新整个界面.



## 3.6 你可以使用"next/font/google"加载字体



## 3.7 错误处理

使用notFound处理404错误, 可以使用error.tsx文件处理所有错误类型



## 3.8 数据验证(zod库)

```javascript
import { z } from 'zod';

const schema = z.object({
  query: z.string().optional(),
  page: z.string().optional(),
  count: z.coerce.number().optional(),
  email: z.string().email().optional(),
  number: z.coerce.number().gt(0).optional(),
  string: z.string().length(3).optional(),
});
```

可以加入不符合要求时的返回值

```javascript
const schema = z.object({
 		query: z.string({invalid_type_error : 'Page is required'}),
    number: z.coerce.number().gt(0, {message: 'Number is required'}).optional(),
})
```

使用parse强制满足要求, safeParse返回符合要求的信息, 以及错误信息.

```javascript
包括三部分response.data, response.success, response.error.
```



## 3.9 ServerAction

ServerAction支持客户端组件请求数据, 数据获取实际发生在客户端



* ServerAction一般作用在form表单中

react中form表单的action属性是一个函数, 标准html中则是一个url.

```jsx
async function formAction(formData : FormData){
	const name = formData.get("name");
  //... do something
}
```

```jsx
<form action={formAction}>
	<input></input>
</form>
```



* 结合useFormState Hook接收ServerAction返回值

```jsx
//import and define initState

async function formAction(state : _ , formData : FormData){
	const name = formData.get("name");
  // return newState;
}

// 使用方式类似useReducer
const [formState, dispatch] = useFormState(formAction, initState)
```

* 使用bind传入实参.



## 3.10 路由认证

1. 安装next-auth(pnpm i next-auth@beta配合最新版)

2. 配置auth-config.ts文件

```tsx
import type { NextAuthConfig } from "next-auth";

export const authConfig = {
    pages:{
        signIn: '/login',
    },
  	// 每次都执行
    callbacks:{
        authorized : async ({auth, request}) => {
            const isLoggedIn = !!auth?.user;  // !取非, !!表示转换为布尔值
            const isOnDashboard = request.nextUrl.pathname.startsWith('/dashboard');
            if (isOnDashboard){
                if (isLoggedIn){
                    return true;
                }
                return false;
            }
            else if (isLoggedIn){
                return Response.redirect(new URL('/dashboard', request.nextUrl));
            }
            return true;
        }
    },
    providers: [],
} satisfies NextAuthConfig;
```



3. 中间件配置(middleware.ts),  定义了那些页面需要认证

```tsx
import NextAuth from "next-auth"
import { authConfig } from "@/auth.config"

export default NextAuth(authConfig).auth;

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}
```



4. 使用NextAuth应用配置, 包括认证方式, 以及认证成功后的重定向

```javascript
import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
import Credentials from "next-auth/providers/credentials";
import { z } from "zod";
import bcrypt from "bcrypt";
import { fetchUserByEmail } from "@/app/lib/data";

const registerSchema = z.object({
    email : z.string().email({}),
    password: z.string().min(6),
});

export const { auth, signIn, signOut } = NextAuth({
    ...authConfig,
    providers: [
      	// 密码认证方式
        Credentials({
            async authorize(credentials){
                const parsedCredentials = registerSchema.safeParse(credentials);
            
                // 格式正确
                if (parsedCredentials.success){
                    const {email, password} = parsedCredentials.data;
                    const user = await fetchUserByEmail(email);
                    if (!user) return null;
                    const passwordMatch = await bcrypt.compare(password, user.password);
                    if (passwordMatch) return user;
                }
                console.log("Invalid email or password");
                return null;
            }
        })
    ]
});
```

使用

```tsx
export async function loginForm(prevState: string | undefined, formData: FormData){
    try{
      	// 传入认证方式
        await signIn('credentials', formData);
    }catch(error){
        if(error instanceof AuthError){
            switch(error.type){
                case 'CredentialsSignin':
                    return 'Invalid email or password';
                default:
                    return 'Something went wrong';
            }
        }
        throw error;
    }
}
```

```tsx
<form action={async()=>{'use server'; await signOut();}}>
```





## 3.11 Metadata数据

metadata中的数据指的是<head>中的数据与标签,  通常用于SEO(search engine optimization).

比如title, describe, keywords的文本描述; 比如favicon.ico网站的图标, opengraph-(展示在搜索描述页的图片), 这些图片均放入app目录中,next会自动识别.

定义页面的metadata

1. 在layout或page页面中暴露一个metadata对象即可

```tsx
export const metadata: Metadata = {
  title: {
    template: '%s | Acme Dashboard',
    default: 'Acme',
  },
  description: 'The official Next.js Course Dashboard, built with App Router.',
  metadataBase: new URL('https://next-learn-dashboard.vercel.sh'),
};
```

其中%s表示占位符,  子layout或page会使用这个模板, %s的值也有子layout或是page提供.
