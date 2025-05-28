// jsx中将函数作为可重用组件, 使用时传入props参数
// 1.props是只读的, 不能修改. Props 可能会让你想起 HTML 属性，但你可以通过它们传递任何 JavaScript 值，包括对象、数组和函数。
// 2.props必须是对象, 不能是其他类型
function Component01({props}){
    return <div>Component01: {props}</div>;
}

// Error
/*
function Component01(props){
    return <div>Component01: {props}</div>;
}
*/

function Component02({props01, props02}){
    return <div>Component02: {props01} {props02}</div>;
}

// 组件传参使用"具名参数"
function App(){
    return <div>
        <Component01 props="props" />
        <Component02 props01="props01" props02="props02" />
    </div>
}


// State可以理解为组件的"内部状态", 只能在组件内部使用(c函数的静态成员变量)
function Component03(){
    // useState(0) 初始化state, 返回一个数组, 第一个元素是state, 第二个元素是修改state的函数
    const [count, setCount] = useState(0);

    // 谁持有state, 谁就负责修改state
    function handleClick(){
        setCount(count + 1);
    }

    return <div>
        <p>Count: {count}</p>
        <button onClick={handleClick}>Increment</button>
    </div>
}

// 当state变化时, 组件会重新渲染
function App02(){
    return <div>
        <Component03 />
    </div>
}

// 随着时间推移 保持不变？如此，便不是 state。
// 通过 props 从父组件传递？如此，便不是 state。
// 是否可以基于已存在于组件中的 state 或者 props 进行计算？如此，它肯定不是state！
// 剩下的可能是 state。

// 让我们再次一条条验证它们:

// 原始列表中的产品 被作为 props 传递，所以不是 state。
// 搜索文本似乎应该是 state，因为它会随着时间的推移而变化，并且无法从任何东西中计算出来。
// 复选框的值似乎是 state，因为它会随着时间的推移而变化，并且无法从任何东西中计算出来。
// 过滤后列表中的产品 不是 state，因为可以通过被原始列表中的产品，根据搜索框文本和复选框的值进行计算。