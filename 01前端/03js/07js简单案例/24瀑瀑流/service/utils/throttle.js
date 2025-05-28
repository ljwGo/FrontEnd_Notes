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