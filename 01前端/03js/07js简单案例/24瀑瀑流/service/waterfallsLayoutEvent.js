window.addEventListener("DOMContentLoaded", function(){
  repeatLoadBtn.addEventListener("click", function(){
    new Promise((resolve, reject)=>{
      // 尝试重新加载新的预设组
      loadOncePreGroup(true, resolve, reject);
    }).then(()=>{
      // 加载成功时, 开启屏幕滚动时加载新预设组
      repeatLoad = true;
    })
    // 隐藏按钮
    repeatLoadBtn.style.display = "none";
  })
})