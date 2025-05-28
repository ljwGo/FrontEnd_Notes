[toc]
# 0. 序言

学习react-router对于理解SPA, 代码分割和SSR都有不少益处.

文档参考: https://reactrouter.remix.org.cn/start/declarative/url-values

react-router路由原理: [「源码解析 」这一次彻底弄懂react-router路由原理 个人理解，单页面应用是使用一个html下，一次性加载js, - 掘金](https://juejin.cn/post/6886290490640039943)

# 1. 安装和基本使用

```powershell
pnpm add react-router
```

还记得SPA中, **组件在不同的路由中进行切换, SPA只有初次页面加载(加载简陋的html文档), 后续都是通过JavaScript异步更新局部UI**

```jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router';
import './index.css';
import App from './App';
import About from './components/About'
import Profile from './components/Profile';
import EditProfile from './components/EditProfile';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/about" element={<About />} />
        <Route path="/profile">
          <Route index element={<Profile name='undefined' bio='undefined'/>}></Route>
          <Route path=":username/edit" element={<EditProfile name='undefined' bio='undefined'/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
```

现在, 你可以在浏览器地址栏输入/about, /profile等地址, 进行页面切换了, 其实就是组件间的切换. **注意浏览器并没有刷新, 实现方式有两种, 分别对应Hash和History, 具体原理参考第3点**

# 2. 前端路由

前面只能通过浏览器地址进行切换. 可以通过react-router的Link, Routes等实现**前端路由导航**.

点击Link在不同页面中切换.

```jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import './index.css';
import App from './App';
import About from './components/About'
import Profile from './components/Profile';
import EditProfile from './components/EditProfile';

const urlTabs = [
  { name: 'App', path: '/', component: <App /> },
  { name: 'About', path: '/about', component: <About /> },
  { name: 'Profile', path: '/profile', component: <Profile /> },
  { name: 'EditProfile', path: '/editProfile', component: <EditProfile /> },
]

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <ul>
        {
          urlTabs.map(tab => <Link key={tab.name} to={tab.path}>
            <li>
              {tab.name}
            </li>
          </Link>)
        }
      </ul>
      <Routes>
        {
          urlTabs.map(url => (
            <Route key={url.name} path={url.path} element={url.component} />
          ))
        }
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

```

# 3. 原理

SPA 的核心是**前端路由**，它通过 JavaScript 动态管理 URL 的变化，而不是依赖服务器返回新页面。具体分为两种模式：

## 3.1 Hash 模式

- **原理**：利用 URL 的 `#` 片段标识符（hash）。修改 `#` 后的内容不会触发页面刷新，但会记录在浏览历史中。

- **实现**：

  - 监听 `hashchange` 事件：当 URL 的 hash 变化时，触发回调函数。
  - 根据 hash 值匹配对应的视图或组件，动态更新 DOM。

- **示例**：

  ```js
  window.addEventListener('hashchange', () => {
    const path = window.location.hash.slice(1); // 去掉 # 号
    loadView(path); // 根据路径加载视图
  });
  ```

## 3.2 History 模式

- **原理**：使用 HTML5 的 `History API`（`pushState`, `replaceState`）直接修改 URL 路径，无刷新。

- **实现**：

  - 通过 `pushState` 或 `replaceState` 修改 URL。
  - 监听 `popstate` 事件（用户点击前进/后退按钮时触发）。
  - 根据路径匹配视图，异步加载数据并更新页面。

- **示例**：

  ```js
  // 修改 URL
  history.pushState({}, '', '/new-path');
  
  // 监听前进/后退
  window.addEventListener('popstate', () => {
    const path = window.location.pathname;
    loadView(path);
  });
  ```

------

### 2. **阻止默认导航行为**

- 当用户点击链接（如 `<a href="/about">`）时，需拦截默认跳转行为：

  ```js
  document.addEventListener('click', (e) => {
    if (e.target.tagName === 'A') {
      e.preventDefault();
      const path = e.target.getAttribute('href');
      history.pushState({}, '', path); // 修改 URL
      loadView(path); // 手动加载视图
    }
  });
  ```

------

### 3. **异步页面更新**

- **动态加载内容**：根据当前路由，异步获取数据或组件（如通过 AJAX、Fetch API 或动态 `import()`）。
- **更新 DOM**：使用框架（如 React、Vue）的响应式机制或手动操作 DOM，局部更新页面。

```js
async function loadView(path) {
  // 根据路径匹配组件
  const component = await import(`./views/${path}.js`);
  // 渲染到页面
  document.getElementById('app').innerHTML = component.render();
}
```

因此, 代码分片往往和路由导航结合.

------

### 4. **服务器配置（History 模式需注意）**

- **问题**：直接访问 `/about` 等路径时，服务器可能返回 404（因为实际不存在该文件）。

- **解决方案**：配置服务器将所有请求重定向到 `index.html`，由前端路由处理。

  **Nginx 示例**：

  ```nginx
  location / {
    try_files $uri $uri/ /index.html;
  }
  ```

------

### 5. **框架集成（如 React Router、Vue Router）**

现代 SPA 框架提供了封装好的路由库，例如：

- **React Router**：基于 History API，提供 `<BrowserRouter>` 和 `<HashRouter>`。
- **Vue Router**：支持 hash 和 history 模式，自动处理事件监听和组件匹配。
