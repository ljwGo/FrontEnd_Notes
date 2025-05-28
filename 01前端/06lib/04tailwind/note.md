[toc]

# 0.序言

​	tailwind是一个基于类的css库, 它可以让你不离开html的情况下, 完成样式的设置. 

​	其内联式的使用方式, 让你不用再浪费精力去取类名了.

​	tailwind会扫描整个html文件, 最后生成不会有冗余的静态css文件.

​	这里将按照官网, 记录tailwind的一些关键特性.



# 1. 基于类

```html
<img class="w-10 h-10"></img>
相当于
.className{
	width: 10rem,
	height: 10rem,
}
```



# 2. 内置的状态名

比如hover状态

```html
<button class="bg-sky-500 hover:bg-sky-700 ...">
  Save changes
</button>
```

支持的所有状态包括

Tailwind includes modifiers for just about everything you’ll ever need, including:

- [Pseudo-classes](https://www.tailwindcss.cn/docs/hover-focus-and-other-states#pseudo-classes), like `:hover`, `:focus`, `:first-child`, and `:required`
- [Pseudo-elements](https://www.tailwindcss.cn/docs/hover-focus-and-other-states#pseudo-elements), like `::before`, `::after`, `::placeholder`, and `::selection`
- [Media and feature queries](https://www.tailwindcss.cn/docs/hover-focus-and-other-states#media-and-feature-queries), like responsive breakpoints, dark mode, and `prefers-reduced-motion`
- [Attribute selectors](https://www.tailwindcss.cn/docs/hover-focus-and-other-states#attribute-selectors), like `[dir="rtl"]` and `[open]`



## 2.0 特殊状态

奇偶

```html
<ul>
  <li class="odd:bg-sky-100 even:bg-sky-200 ">1</li>
  <li>2</li>
  <li>3</li>
</ul>
```

表格

```txt
`required`, `invalid`, and `disabled`
```

依赖父元素的状态

```html
<parent class="group">
  // 如果父元素处于hover则应用
	<child class="group-hover:"></child>
 	<child class="group-hover:"></child>
  <child class="group-hover:"></child>
</parent>
```

你可以为每个不同组取个名称group/[name]

依赖兄弟结点(只能是前一个), 同样的,peer也可以取名

```html
	<child class="peer"></child>
 	<child class="peer-hover:"></child>
```

\* 为所有直接子孩子应用类(注意子节点不能重写类)

```html
 <ul class="*:rounded-full *:border *:border-sky-100 *:bg-sky-50 *:px-2 *:py-0.5 dark:text-sky-300 dark:*:border-sky-500/15 dark:*:bg-sky-500/10 ...">
   <li>Sales</li>
   <li>Marketing</li>
   <li>SEO</li>
   <!-- ... -->
 </ul>
```

依赖于其后代

```html
<label class="has-[:checked]:bg-indigo-50 has-[:checked]:text-indigo-900 has-[:checked]:ring-indigo-200 ..">
  <svg fill="currentColor">
    <!-- ... -->
  </svg>
  Google Pay
  <input type="radio" class="checked:border-indigo-500 ..." />
</label>
```

依赖于组的后代, 这里[a]是标签选择器

```html
<parent class="group">
  // 如果父元素处于hover则应用
	<child class=""></child>
 	<child class=""></child>
  <child class="group-has-[a]:block"></child>
  <a>link...</a>
</parent>
```

依赖于兄弟的后代

```html
<fieldset>
  <legend>Today</legend>
  <div>
    <label class="peer ...">
      <input type="checkbox" name="todo[1]" checked />
      Create a to do list
    </label>
    <svg class="peer-has-[:checked]:hidden ...">
      <!-- ... -->
    </svg>
  </div>
  <!-- ... -->
</fieldset>
```



## 2.1 状态可以堆叠

```html
<button class="dark:md:hover:bg-fuchsia-600 ...">
  Save changes
</button
```



## 2.2 伪元素::after和::before等

实现红星(必填)

```html
<label class="block">
  <span class="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
    Email
  </span>
  <input type="email" name="email" class="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1" placeholder="you@example.com" />
</label>
```

placeholder text

```html
<label class="relative block">
  <span class="sr-only">Search</span>
  <span class="absolute inset-y-0 left-0 flex items-center pl-2">
    <svg class="h-5 w-5 fill-slate-300" viewBox="0 0 20 20"><!-- ... --></svg>
  </span>
  <input class="placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm" placeholder="Search for anything..." type="text" name="search"/>
</label>
```

file input button

list markers

```html
<ul role="list" class="marker:text-sky-400 list-disc pl-5 space-y-3 text-slate-500">
  <li>5 cups chopped Porcini mushrooms</li>
  <li>1/2 cup of olive oil</li>
  <li>3lb of celery</li>
</ul>
```

highlighted text: 使用selection

```html
<div class="selection:bg-fuchsia-300 selection:text-fuchsia-900">
  <p>
    So I started to walk into the water. I won't lie to you boys, I was
    terrified. But I pressed on, and as I made my way past the breakers
    a strange calm came over me. I don't know if it was divine intervention
    or the kinship of all living things but I tell you Jerry at that moment,
    I <em>was</em> a marine biologist.
  </p>
</div>
```

first-line和first-letter

dialog backdrops和open以及close

```html
<dialog class="backdrop:bg-gray-50">
  <form method="dialog">
    <!-- ... -->
  </form>
</dialog>
```



## 2.3 更好的颜色主题

使用dark, 父元素类中存在dark即开启

```html
<div class="bg-white dark:bg-slate-900 rounded-lg px-6 py-8 ring-1 ring-slate-900/5 shadow-xl">
  <div>
    <span class="inline-flex items-center justify-center p-2 bg-indigo-500 rounded-md shadow-lg">
      <svg class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true"><!-- ... --></svg>
    </span>
  </div>
  <h3 class="text-slate-900 dark:text-white mt-5 text-base font-medium tracking-tight">Writes Upside-Down</h3>
  <p class="text-slate-500 dark:text-slate-400 mt-2 text-sm">
    The Zero Gravity Pen can be used to write in any orientation, including upside-down. It even works in outer space.
  </p>
</div>
```

让你在开启时启动dark

```js
// On page load or when changing themes, best to add inline in `head` to avoid FOUC
if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
  document.documentElement.classList.add('dark')
} else {
  document.documentElement.classList.remove('dark')
}

// Whenever the user explicitly chooses light mode
localStorage.theme = 'light'

// Whenever the user explicitly chooses dark mode
localStorage.theme = 'dark'

// Whenever the user explicitly chooses to respect the OS preference
localStorage.removeItem('theme')
```





## 2.4 媒体查询

motion-reduce和motion-safe(motion-reduce是一种用户偏好设置，表示用户希望减少或移除网页上的动画效果。)

```html
<!-- Using `motion-reduce` can mean lots of "undoing" styles -->
<button class="hover:-translate-y-0.5 transition motion-reduce:hover:translate-y-0 motion-reduce:transition-none ...">
  Save changes
</button>

<!-- Using `motion-safe` is less code in these situations -->
<button class="motion-safe:hover:-translate-x-0.5 motion-safe:transition ...">
  Save changes
</button>
```

less contrast 和 high constrast(低对比度和高对比度)

```html
<form>
  <label class="block">
    <span class="block text-sm font-medium text-slate-700">Social Security Number</span>
    <input class="border-slate-200 placeholder-slate-400 contrast-more:border-slate-400 contrast-more:placeholder-slate-500"/>
    <p class="mt-2 opacity-10 contrast-more:opacity-100 text-slate-600 text-sm">
      We need this to steal your identity.
    </p>
  </label>
</form>
```

### [Forced colors mode](https://www.tailwindcss.cn/docs/hover-focus-and-other-states#forced-colors-mode)

The `forced-colors` media query indicates if the user is using a forced colors mode. These modes override your site’s colors with a user defined palette for text, backgrounds, links and buttons.

Use the `forced-colors` modifier to conditionally add styles when the user has enabled a forced color mode:

```html
<form>
  <legend> Choose a theme: </legend>
  <label>
    <input type="radio" class="forced-colors:appearance-auto appearance-none" />
    <p class="forced-colors:block hidden">
      Cyan
    </p>
    <div class="forced-colors:hidden h-6 w-6 rounded-full bg-cyan-200 ..."></div>
    <div class="forced-colors:hidden h-6 w-6 rounded-full bg-cyan-500 ..."></div>
  </label>
  <!-- ... -->
</form>
```

### [Viewport orientation](https://www.tailwindcss.cn/docs/hover-focus-and-other-states#viewport-orientation)

Use the `portrait` and `landscape` modifiers to conditionally add styles when the viewport is in a specific orientation:

```html
<div>
  <div class="portrait:hidden">
    <!-- ... -->
  </div>
  <div class="landscape:hidden">
    <p>
      This experience is designed to be viewed in landscape. Please rotate your
      device to view the site.
    </p>
  </div>
</div>
```

### [Supports rules](https://www.tailwindcss.cn/docs/hover-focus-and-other-states#supports-rules)

Use the `supports-[...]` modifier to style things based on whether a certain feature is supported in the user’s browser.

```html
<div class="flex supports-[display:grid]:grid ...">
  <!-- ... -->
</div>
```

You can configure shortcuts for common `@supports` rules you’re using in your project in the `theme.supports` section of your `tailwind.config.js` file:

```html
/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    supports: {
      grid: 'display: grid',
    },
  },
}
```

You can then use these custom `supports-*` modifiers in your project:

```html
<div class="supports-grid:grid">
  <!-- ... -->
</div>
```



## 2.5 aria参数

For example, to apply the `bg-sky-700` class when the `aria-checked` attribute is set to `true`, use the `aria-checked:bg-sky-700` class:

```html
<div aria-checked="true" class="bg-gray-600 aria-checked:bg-sky-700">
  <!-- ... -->
</div>
```

支持bool值的aria参数

| Modifier        | CSS                       |
| --------------- | ------------------------- |
| `aria-busy`     | `&[aria-busy=“true”]`     |
| `aria-checked`  | `&[aria-checked=“true”]`  |
| `aria-disabled` | `&[aria-disabled=“true”]` |
| `aria-expanded` | `&[aria-expanded=“true”]` |
| `aria-hidden`   | `&[aria-hidden=“true”]`   |
| `aria-pressed`  | `&[aria-pressed=“true”]`  |
| `aria-readonly` | `&[aria-readonly=“true”]` |
| `aria-required` | `&[aria-required=“true”]` |
| `aria-selected` | `&[aria-selected=“true”]` |

You can customize which `aria-*` modifiers are available by editing `theme.aria` or `theme.extend.aria` in your `tailwind.config.js` file:

```html
/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    extend: {
      aria: {
        asc: 'sort="ascending"',
        desc: 'sort="descending"',
      },
    },
  },
};
```

### [Open/closed state](https://www.tailwindcss.cn/docs/hover-focus-and-other-states#open-closed-state)

Use the `open` modifier to conditionally add styles when a `<details>` or `<dialog>` element is in an open state:

```html
<div class="max-w-lg mx-auto p-8">
  <details class="open:bg-white dark:open:bg-slate-900 open:ring-1 open:ring-black/5 dark:open:ring-white/10 open:shadow-lg p-6 rounded-lg" open>
    <summary class="text-sm leading-6 text-slate-900 dark:text-white font-semibold select-none">
      Why do they call it Ovaltine?
    </summary>
    <div class="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-400">
      <p>The mug is round. The jar is round. They should call it Roundtine.</p>
    </div>
  </details>
</div>
```



# 3. 自定义类

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer utilities {  // 使用layer分类
  .content-auto {
    content-visibility: auto;
  }
}
```

