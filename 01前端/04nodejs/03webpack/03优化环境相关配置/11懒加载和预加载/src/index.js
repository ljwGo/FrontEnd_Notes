console.log("index.js已经加载了")

/* 
  预加载和普通并行加载的不同:
    预加载:
      内容之间有先后顺序, 加载完基本内容后, 在浏览器空闲时间时, 加载剩下内容
    并行加载:
      内容之间没有先后顺序, http协议支持的最大并发数是有限的, 一般为6
*/


/* 直接导入 */
// import语句也会有提升
// import {mul} from "./demo.js"

// console.log(mul(1,2))

/* 使用import函数动态导入, 实现懒加载 */
const btn = document.querySelector('button')
btn.addEventListener('click', ()=>{
  // 可以使用魔术注释, 为独立开来的包取名称
  import(/* webpackChunkName:'name'*/"./demo").then(({mul})=>{
    console.log(mul(2, 3))
  }).catch(e=>{
    console.log(e)
  })
})

/* 使用import函数动态导入, 实现预加载 */
// btn.addEventListener('click', ()=>{
//   // webpackPreFetch: true 开启预加载
//   import(/* webpackChunkName:'name', webpackPrefetch: true*/"./demo").then(({mul})=>{
//     console.log(mul(2, 3))
//   }).catch(e=>{
//     console.log(e)
//   })
// })