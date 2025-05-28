var asyncTaskQueue = []

function addAsyncTask(func){
    asyncTaskQueue.push(func)
}

// 同步任务1
console.log(1)
// 模拟的异步任务1,省略了异步处理程序,直接将异步任务存放到异步队列中
addAsyncTask(function(){
    console.log(2)
})
// 模拟的异步任务2
addAsyncTask(function(){
    console.log(3)
})
// 同步任务2
console.log(4)

// 模拟的事件循环
// var timeoutObj = new Timeout()
var timer = 0

timeoutObj = {
    preTime : 0,
    _newTime : 0,
    _timeout : 0,

    reset : function (){
        this.preTime = 0
    },
    getTimeout : function (){
        if (0 === this.preTime){
            return 0
        }
        else{
            this._nowTime = +new Date() / 1000
            this._timeout = (this._nowTime - this.preTime)
            this.preTime = this._nowTime
            return this._timeout
        }
    },
}

while (true){
    // 每三秒执行一次函数,可省略
    if (timer > 3){
        if (asyncTaskQueue[0] !== undefined){
            asyncTaskQueue[0]()
            asyncTaskQueue.shift()
        }
        timer = 0
    }
    timer += timeoutObj.getTimeout()
}

// 封装的时间差构造函数,功能是计算两次函数执行的时间差
// function Timeout(){
//     this.preTime = 0;
//     this.reset = function (){
//         this.preTime = 0
//     };
//     this.getTimeout = function (){
//         if (0 === this.preTime){
//             return 0
//         }
//         else{
//             this._nowTime = +new Date() / 1000
//             this._timeout = (this._nowTime - this.preTime)
//             this.preTime = this._nowTime
//             return this._timeout
//         }
//     };
//     this._newTime = 0;
//     this._timeout = 0;
// }