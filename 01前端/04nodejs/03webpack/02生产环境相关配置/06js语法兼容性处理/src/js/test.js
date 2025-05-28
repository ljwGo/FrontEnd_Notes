// 解决所有兼容性问题, 使用
// import "@babel/polyfill" 弃用

// 改用下方
// import "core-js/stable";
// import "regenerator-runtime/runtime";

const awgewgwa = 'hhahaha';

new Promise((resolve, reject)=>{
    resolve("你好啊")
}).then(value=>{
  console.log(value)
})

console.log(awgewgwa)