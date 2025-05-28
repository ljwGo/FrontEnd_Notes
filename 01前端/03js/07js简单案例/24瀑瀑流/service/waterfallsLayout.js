// 使用ajax获取到, 图片信息数组, 预置内容, 格式:[{'图片名':[信息数组], }, ]
function getPerviousGroup({groupMark, method, url, entryURL, successCallback, successParameters, failCallback, failParameters}){
  // 使用函数时, 必须要有acceptGroup全局变量
  let xhr = new XMLHttpRequest();
  method = method === 'GET' || method === 'POST' ? method : 'GET'; 
  url = url ? url : "http://localhost:8080";
  xhr.open(method, `${url}/${entryURL}?img_group_mark=${groupMark}`);
  xhr.send();
  xhr.onreadystatechange = function(){
    if (xhr.readyState === 4){
      if (xhr.status >= 200 && xhr.status <300){
        successCallback && successCallback(xhr.response, successParameters);
      }else{
        failCallback && failCallback(xhr.response, failParameters);
      }
    }
  }
}

// 加载下一组图片的预览
function loadNextGroup(columns, canvasEle){
  /*
    @columns: 行数
    @canvasEle: 挂载的目标
  */
  /* 注: 使用时记得有acceptGroup这个全局变量 */
  let i;
  for (let key of Object.keys(acceptGroup)){
    // 新建预览卡片
    let newCard = document.createElement("div");
    let newImg = document.createElement("img");
    // 计算最后一行偏移高度最低一列的索引, thePreMinCol就是新卡片插入的列
    minIndex=0;
    for (i=1; i<columns; i++){
      if (theLastPreRow[i] < theLastPreRow[minIndex]){
        minIndex = i;
      }
    };
    // 初始化数据--卡片
    newCard.classList.add("card");
      // 设置宽度
    newCard.style.width = imageWidth + "px";
      // 设置高度
    newCard.style.height = acceptGroup[key][0] * scale + "px";
      // 左偏移
    newCard.style.left = gap + cardWidth * minIndex + 'px';
      // 上偏移
    newCard.style.top = theLastPreRow[minIndex] + gap + 'px';
      // 更改最后一行的偏移高度
    theLastPreRow[minIndex] += acceptGroup[key][0] * scale + 2*gap;
    // 初始化图片
    newImg.setAttribute("data-src", key);
    newImg.classList.add("pre");
    // 挂载
    newCard.append(newImg);
    canvasEle.append(newCard); 
    i++;
    // 将已挂载的卡片信息删除, 应该能够在迭代的同时删除
    // hasLoadedImg[key] = acceptGroup[key]; temporary deprecated
    delete acceptGroup[key];
  };
  // 更新完毕后, 最后计算一次最小高度偏移列, 赋值给thePreMinCol
  minIndex=0;
  for (i=1; i<columns; i++){
    if (theLastPreRow[i] < theLastPreRow[minIndex]){
      minIndex = i;
    }
  };
  thePreMinCol = theLastPreRow[minIndex];
}

// 获取新组函数,传入参数的预设. 并且设置了同步还是异步
function loadOncePreGroup(isAsync, resolve, reject){
  isLoading = true;
  getPerviousGroup({
    groupMark: groupMark, 
    entryURL: "get_pre_group", 
    successCallback: (response)=>{
      // 将后端发送的新图片对象合并到接收对象中
      Object.assign(acceptGroup, JSON.parse(response));
      // 渲染新的预设组
      loadNextGroup(columns, canvasEle);
      repeatLoad = true;
      groupMark++;
      isLoading = false;
      // 设置promise的成功回调
      isAsync && resolve();
    }, failCallback: (response)=>{
      // 如果response有值
      if (response){
        // 判断所有组都接受完了
        responseBody = JSON.parse(response);
        if ('isOver' in responseBody){
          isOver = responseBody.isOver;
          return;
        };
      };
      // 如果加载失败
      repeatLoad = false;
      // 显示重载按钮
      repeatLoadBtn.style.display = "block";
      isAsync && reject();
    }
  })
}

// 根据theLastPreRow渲染
function renderNext(canvasEle, callback){
  cardsEle = canvasEle.children;
  // 防止索引越界
  if (nextLoadCardIndex < cardsEle.length){
    let nextCard = cardsEle[nextLoadCardIndex];
    let img = null;
    // 当屏幕滚动过下一个要加载的卡片
    while (nextLoadCardIndex < cardsEle.length && window.scrollY >= nextCard.offsetTop - window.innerHeight){
      img = nextCard.firstChild;
      // 图片加载成功时, 更改类,实现淡出淡入效果
      img.onload = function(event){ event.target.className = "loaded" }
      img.src = getImgBaseURL + img.getAttribute("data-src");
      // 当前图片加载成功, 准备加载下一个
      nextLoadCardIndex++;
      nextCard = cardsEle[nextLoadCardIndex];
    };
  };
  // 调用回调
  callback && callback();
}

// 初始化画布
function initCanvas(){
  new Promise((resolve, reject)=>{
    // 加载第一组预设组
    loadOncePreGroup(true, resolve, reject);
  }).then(()=>{
    // 同时默认渲染一次图片
    if (loadImgFlag){
      loadImgFlag = false;
      renderNext(canvasEle, ()=>{
        loadImgFlag = true;
      })
    }
  });
}

// 滚动图定位置时, 加载新预设组
window.addEventListener("scroll", throttle(()=>{
  if (!isOver && repeatLoad && !isLoading && window.scrollY >= thePreMinCol - window.innerHeight - previousLoadedOffset){
    loadOncePreGroup(false);
  }
}, 500));

// 滚动时加载图片
window.addEventListener("scroll", throttle(()=>{
  // renderNext同步遍历要渲染的图片位置, loadImgFlag是节流阀
  if (loadImgFlag){
    loadImgFlag = false;
    renderNext(canvasEle, ()=>{
      loadImgFlag = true;
    })
  }
}, 300));

// 初始化
window.addEventListener("DOMContentLoaded", ()=>{
  initCanvas();
})