function Add(self, event){
  // event.target.innerText = parseInt(event.target.innerText) + 1;
  self.innerText = parseInt(self.innerText)+1;
}

function throttleByTimer(func, delay=2000){
  let timer = null;
  // 这个会有触发延迟!!!
  function wrapper(...arg){
    if (!timer){
      timer = setTimeout(() => {
        func(this, ...arg);
        timer = null;
      }, delay);
    }
  };
  return wrapper;
}

window.addEventListener("DOMContentLoaded", ()=>{
  let counter = document.getElementById("num");
  // counter.addEventListener("click", throttleByTimestamp(Add, this, 500)); // 这个this是window
  counter.addEventListener("click", throttleByTimer(Add));
});