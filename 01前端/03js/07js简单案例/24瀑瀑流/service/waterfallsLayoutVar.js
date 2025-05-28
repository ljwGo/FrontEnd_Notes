/* 预设组 */
let previousLoadedOffset = 200; // 提前加载新的预设组的偏移
let groupMark = 0; // 接收组的编号, 即第几组
let acceptGroup = {}; // 接收组
let isOver = false; // 预设组都接受完
// let hasLoadedImg = {}; temporary deprecated

/* 加载预设 */
let theLastPreRow = []; // 预设的最后一行偏移高度
let thePreMinCol = 0; // 所有预设列中,偏移高度最小的列索引

/* 图片尺寸 */
let columns = 4; // 瀑瀑流的列数
let gap = 10; // 图片一边的间隔(左右都有)
let imageWidth = 0;
let cardWidth = 0; // 图片包括间隔gap的宽度
let scale = 0; // 缩放比, 根据列数和串口大小.图片宽度不同, 相对高度也会不同
let uniformWidth = 400; // 服务器中统一图片宽度为400

/* 加载图片 */
let nextLoadCardIndex = 0; // 最后一个加载图片在canvasEle画布中的索引

/* dom元素 */
let canvasEle = null;
let cardsEle = null;   // canvasEle下所有卡片
let repeatLoadBtn = null; // 加载预设的图片组失败时, 重新加载

/* configuration */
let getImgBaseURL = "http://localhost:8080/get_img?img_name=" // 从后端获取图片url的路径

/* fix limit */
let isLoading = false; // 当正在加载一个预设组时, 不要重复加载

/* optimization */
let repeatLoad = true; // 是否获取图片
let loadImgFlag = true; // 加载图片时的节流阀

window.addEventListener("DOMContentLoaded", ()=>{
  canvasEle = document.getElementById("canvas");
  repeatLoadBtn = document.getElementById("repeat-load");

  imageWidth = parseInt(canvasEle.clientWidth / columns) - 2 * gap;
  scale = (imageWidth / uniformWidth).toFixed(2);
  cardWidth = imageWidth + 2*gap;
  for (let i=0; i<columns; i++){
    theLastPreRow.push(0);
  }
})