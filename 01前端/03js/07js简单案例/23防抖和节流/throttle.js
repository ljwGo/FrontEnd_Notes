// 结合时间戳和计时器,实现更精确的节流
function Add(){
  console.log(this);
  this.innerText = parseInt(this.innerText)+1;
}

// 比较麻烦的实现
// function throttle(func, delay=2000){
//   let startTime = new Date();
//   let timer = null;
//   // 表示经过的时间
//   let passTime = 0;
//   // 表示到事件触发的时间点 还剩下的时间
//   let restTime = delay;

//   function wrapper(...args){
//     passTime = new Date() - startTime;
//     // 如果经过的时间大于剩下的时间, 事件能够被触发了
//     if (passTime >= restTime){
//       func(this, ...args);
//       passTime = 0;
//       restTime = delay;
//       timer = null;
//       startTime = new Date();
//     }
//     else{
//       // 否则剩余时间减少
//       restTime -= passTime;
//       startTime = new Date();
//       // 设置一个计时器, 让它延时触发第二次事件
//       clearTimeout(timer);
//       timer = setTimeout(()=>{
//         func(this, ...args);
//         startTime = new Date();
//         passTime = 0;
//         restTime = delay;
//       }, restTime);
//     }
//   };
//   return wrapper;
// };

function throttle(func, delay=2000){
  let startTime = Date.now();
  let timer = null;
  function wrapper(...args){
    let currentTime = Date.now();
    let remainTime = delay - (currentTime - startTime);
    clearTimeout(timer);
    if (remainTime <= 0){
      func.apply(this, args);
      startTime = Date.now();
    }else{
      timer = setTimeout(()=>{
        func.apply(this, args);
      }, remainTime);
    }
  };
  return wrapper;
}

window.addEventListener("DOMContentLoaded", ()=>{
  let counter = document.getElementById("num");
  counter.addEventListener("click", throttle(Add));
});