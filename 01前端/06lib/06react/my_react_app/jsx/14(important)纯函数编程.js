// 纯函数编程
// 纯函数性质
// 1. 相同的输入总是得到相同的输出。
// 2. 在执行过程中不会产生任何副作用(不会修改外部状态)。
// 纯函数的好处
// 1. 可预测性： 纯函数的行为只取决于输入，不依赖于外部状态，因此更容易理解和调试。
// 2. 可测试性： 纯函数可以独立于其他代码进行测试，因为它们不依赖于外部状态。
// 3. 并发性： 纯函数在并发环境中更容易管理和测试，因为它们不会受到其他并发操作的影响。
// 4. 可缓存性： 纯函数的结果可以被缓存，因为它们不依赖于外部状态。
// 5. 可移植性： 纯函数可以在不同的环境中移植，因为它们不依赖于外部状态。
// 6. 可重用性： 纯函数可以在不同的场景中重用，因为它们不依赖于外部状态。
// 7. 可组合性： 纯函数可以很容易地组合在一起，因为它们不依赖于外部状态。
// 8. 可维护性： 纯函数更容易维护，因为它们不依赖于外部状态。

// 纯函数编程的例子
// 1. 加法函数
function add(a, b) {
    return a + b;
}

// 违反纯函数性质的例子
let count = 0;

function Cmp(){
    return <div>Count is : {count++}</div>
}

// 每创建一个Cmp，输出的结果都不一样
function App(){
    return (
        <div>
            <Cmp/>
            <Cmp/>
            <Cmp/>
        </div>
    )
}

// 通过设置state, 来刷新界面, 也就是将副作用交给setState来处理
// 而state的改变是在事件处理函数中, 在渲染过程中, 事件处理函数并不会执行, 只执行纯函数
// 所以, 在渲染过程中, 不会执行setState, 也就不会刷新界面

// React的严格模式, 检查是否有副作用(通过创建两个相同的的组件来检查)
<React.StrictMode>
    <Cmp/>
</React.StrictMode>

// 如果你用尽一切办法，仍无法为副作用找到合适的事件处理程序，
// 你还可以调用组件中的 useEffect 方法将其附加到返回的 JSX 中。
// 这会告诉 React 在渲染结束后执行它。
// 然而，这种方法应该是你最后的手段。