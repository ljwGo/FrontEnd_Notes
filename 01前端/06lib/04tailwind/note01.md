[toc]

# 1. 响应式设计

## 1.1 前提

First, make sure you’ve added the [viewport meta tag](https://developer.mozilla.org/en-US/docs/Web/HTML/Viewport_meta_tag) to the `<head>` of your document:

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```



## 1.2 具体格式

| Breakpoint prefix | Minimum width | CSS                                  |
| ----------------- | ------------- | ------------------------------------ |
| `sm`              | 640px         | `@media (min-width: 640px) { ... }`  |
| `md`              | 768px         | `@media (min-width: 768px) { ... }`  |
| `lg`              | 1024px        | `@media (min-width: 1024px) { ... }` |
| `xl`              | 1280px        | `@media (min-width: 1280px) { ... }` |
| `2xl`             | 1536px        | `@media (min-width: 1536px) { ... }` |

Don’t use `sm:` to target mobile devices

If you’d like to apply a utility *only* when a specific breakpoint range is active, stack a responsive modifier like `md` with a `max-*` modifier to limit that style to a specific range:

```html
<div class="md:max-xl:flex">
  <!-- ... -->
</div>
```



### [Customizing your theme](https://www.tailwindcss.cn/docs/responsive-design#customizing-your-theme)

You can completely customize your breakpoints in your `tailwind.config.js` file:

```html
/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    screens: {
      'tablet': '640px',
      // => @media (min-width: 640px) { ... }

      'laptop': '1024px',
      // => @media (min-width: 1024px) { ... }

      'desktop': '1280px',
      // => @media (min-width: 1280px) { ... }
    },
  }
}
```

