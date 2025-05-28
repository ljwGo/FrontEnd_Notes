// 写死的账号存在验证
window.addEventListener("DOMContentLoaded", function(){
  let input = document.getElementById("account");
  let span = input.nextElementSibling;
  input.addEventListener("input", simpleDebounce(accountExist, 2000, span));
});

function accountExist(self, args01){
  // 这样写阅读性不太好
  let span = args01[0];
  if (self.value === "ljw"){
    span.style.display = "none";
  }else{
    span.style.display = "block";
  }
}

function simpleDebounce(func, delay=2000, ...args01){
  let timer = null;
  return function (...args02){
    clearTimeout(timer);
    timer = setTimeout(()=>{
      func(this, args01, args02);
      // func.apply() 这个函数真搞不明白
    }, delay);
  };
}