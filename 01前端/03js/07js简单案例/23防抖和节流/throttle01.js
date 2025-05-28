// 实现点击自增一
// window.addEventListener("DOMContentLoaded", ()=>{
//   let counter = document.getElementById("num");
//   counter.addEventListener("click", function(){
//     this.innerText = parseInt(this.innerText) + 1;
//   })
// });

// 通过计时(时间戳方式)的防抖和节流
function throttleByTimestamp(func, self, delay=2000){
  if(func){
    // console.log(self); 这个self是window
    let startTime = new Date();
    function wrapper(...arg){
      let newTime = new Date();
      // console.log(newTime - startTime); 时间戳单位是毫秒
      if (newTime - startTime >= delay){
        // console.log(this); // 这个this居然是span, 就是事件的拥有者
        func(this, ...arg);
        // func(self, ...arg);
        // func.apply(null, arg); 这个apply方法调用,似乎能够指定作用域
        startTime = newTime;
      };
    };
    return wrapper;
  };
}

function Add(self, event){
  // event.target.innerText = parseInt(event.target.innerText) + 1;
  self.innerText = parseInt(self.innerText)+1;
}

window.addEventListener("DOMContentLoaded", ()=>{
  let counter = document.getElementById("num");
  // counter.addEventListener("click", throttleByTimestamp(Add, this, 500)); // 这个this是window
  counter.addEventListener("click", throttleByTimestamp(Add));
});