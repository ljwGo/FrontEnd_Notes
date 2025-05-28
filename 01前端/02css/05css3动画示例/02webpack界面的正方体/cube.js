let outCubeCenterDegrees = 0;
let cubeRotateEvent = null;
let cubeRotateFunc = null;
let smallCubeRotateEvent = null;
let smallCubeRotateFunc = null;

window.addEventListener("load", function(){
  // 外正方体的中心点
  let outCubeCenter = document.getElementsByClassName("out-cube-center")[0];
  // 正方体的六个面
  let allFace = document.getElementsByClassName("one-face");
  // 正方形的顶面
  let roofFace = document.getElementsByClassName("roof-face")[0];
  // 小正方形的中心
  let smallCubeCenter = document.querySelector(".in-cube-center");
  let leftSideFaceIndex = 0;
  let rightSideFaceIndex = 0;
  let backgroundFaceIndex = [0, 0];
  let roofSideFaceBorder = "";
  // 外正方形旋转事件
  cubeRotateFunc = () => {
    outCubeCenterDegrees += 90;
    outCubeCenter.style.transform = `rotateX(-30deg) rotateY(${outCubeCenterDegrees}deg)`;
    let remainder = outCubeCenterDegrees % 360;
    // 设置正方体粗外边距
    // if (remainder === 0){
    //   allFace[3].style.borderWidth = "1px 1px 6px 6px";
    //   allFace[0].style.borderWidth = "1px 6px 6px 1px";
    //   allFace[1].style.borderWidth = "1px";
    //   allFace[2].style.borderWidth = "1px";
    //   roofFace.style.borderWidth = "6px 1px 1px 6px";
    // }else if (remainder === 90){
    //   allFace[2].style.borderWidth = "1px 1px 6px 6px";
    //   allFace[3].style.borderWidth = "1px 6px 6px 1px";
    //   roofFace.style.borderWidth = "6px 6px 1px 1px";
    //   allFace[1].style.borderWidth = "1px";
    //   allFace[0].style.borderWidth = "1px";
    // }else if (remainder === 180){
    //   allFace[1].style.borderWidth = "1px 1px 6px 6px";
    //   allFace[2].style.borderWidth = "1px 6px 6px 1px";
    //   roofFace.style.borderWidth = "1px 6px 6px 1px";
    //   allFace[3].style.borderWidth = "1px";
    //   allFace[0].style.borderWidth = "1px";
    // }else{
    //   allFace[0].style.borderWidth = "1px 1px 6px 6px";
    //   allFace[1].style.borderWidth = "1px 6px 6px 1px";
    //   roofFace.style.borderWidth = "1px 1px 6px 6px";
    //   allFace[2].style.borderWidth = "1px";
    //   allFace[3].style.borderWidth = "1px";
    // }
    // 优化
    if (remainder === 0){
      leftSideFaceIndex = 3;
      rightSideFaceIndex = 0;
      backgroundFaceIndex = [1, 2];
      roofSideFaceBorder = "6px 1px 1px 6px";
    }else if (remainder === 90){
      leftSideFaceIndex = 2;
      rightSideFaceIndex = 3;
      backgroundFaceIndex = [0, 1];
      roofSideFaceBorder = "6px 6px 1px 1px";
    }else if (remainder === 180){
      leftSideFaceIndex = 1;
      rightSideFaceIndex = 2;
      backgroundFaceIndex = [3, 0];
      roofSideFaceBorder = "1px 6px 6px 1px";
    }else {
      leftSideFaceIndex = 0;
      rightSideFaceIndex = 1;
      backgroundFaceIndex = [2, 3];
      roofSideFaceBorder = "1px 1px 6px 6px";
    }
      allFace[leftSideFaceIndex].style.borderWidth = "1px 1px 6px 6px";
      allFace[rightSideFaceIndex].style.borderWidth = "1px 6px 6px 1px";
      roofFace.style.borderWidth = roofSideFaceBorder;
      allFace[backgroundFaceIndex[0]].style.borderWidth = "1px";
      allFace[backgroundFaceIndex[1]].style.borderWidth = "1px";
  };
  // 内正方形旋转事件
  smallCubeRotateFunc = () => {
    smallCubeCenter.style.transform = `rotateX(-30deg) rotateY(-${outCubeCenterDegrees}deg)`;
  };
  cubeRotateEvent = setInterval(cubeRotateFunc, 3000);
  smallCubeRotateEvent = setInterval(smallCubeRotateFunc, 3000);
});

// 解决窗口最小化和切换页面导致的渲染堆积
window.addEventListener("blur", function(){
  clearInterval(cubeRotateEvent);
  clearInterval(smallCubeRotateEvent);
});
window.addEventListener("focus", function(){
  cubeRotateEvent = setInterval(cubeRotateFunc, 3000);
  smallCubeRotateEvent = setInterval(smallCubeRotateFunc, 3000);
})

