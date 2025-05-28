function task1(preData){
    // 模拟io延迟
    setTimeout(() => {
        data = "获取到的用户数据\n"
        console.log(1)
        myTask.next(preData + data)
    }, 1000);
}

function task2(preData){
    // 模拟io延迟
    setTimeout(() => {
        data = "根据用户数据获取的数据\n"
        console.log(2)
        myTask.next(preData + data)
    }, 2000);
}

function task3(preData){
    // 模拟io延迟
    setTimeout(() => {
        data = "进一步数据\n"
        console.log(3)
        myTask.next(preData + data)
    }, 3000);
}

// 生成器
function * taskList(data, callback){
    let data1 = yield task1(data);
    let data2 = yield task2(data1);
    let data3 = yield task3(data2);
    yield callback(data3);
}

let myTask = taskList('原始数据\n', (data)=>{
    console.log(data)
})

myTask.next()