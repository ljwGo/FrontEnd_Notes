// 局部变量无法在多次渲染中持久保存。 
// 当 React 再次渲染这个组件时，它会从头开始渲染——不会考虑之前对局部变量的任何更改。
// 更改局部变量不会触发渲染。 React 没有意识到它需要使用新数据再次渲染组件。

// 要使用新数据更新组件，需要做两件事：
// 保留 渲染之间的数据。
// 触发 React 使用新数据渲染组件（重新渲染）。

// useState Hook 提供了这两个功能：
// State 变量 用于保存渲染间的数据。
// State setter 函数 更新变量并触发 React 再次渲染组件。

// Hook 是特殊的函数，只在 React 渲染时有效。
// Hook就像import语句, 只能在组件头部调用, 不能在循环, 条件, 嵌套函数中调用
// 因此, 组件在运行时, 所有的Hook的调用顺序是不变的.

// useState的简化实现版本
let statesInCmp = [];
let stateIndex = 0;  // 每次重新渲染,索引都会重置为0

function useState(initialValue) {
    let pair = statesInCmp[stateIndex];
    // pair存在
    if (pair){
        stateIndex++;
        return pair;
    }

    // pair不存在
    pair = [initialValue, setState];

    function setState(newState){
        pair[0] = newState;
        // UpdateDom...
    }

    statesInCmp[stateIndex] = pair;
    stateIndex++;
    return pair;
}

// 使用
function Counter(){
    const [count, setCount] = useState(0);
    return <h1 onClick={() => setCount(count + 1)}>{count}</h1>
}

// 当 React 重新渲染一个组件时：
// React 会再次调用你的函数
// 函数会返回新的 JSX 快照
// React 会更新界面以匹配返回的快照

/* State相当于一个快照 */
function Counter(){
    const [count, setCount] = useState(0);
    return <h1 onClick={() => {
        setCount(count + 1)
        setCount(count + 1)
        setCount(count + 1)

        console.log(count);
        }}>
        {count}
    </h1>
}

/*
合并关联的 state。如果你总是同时更新两个或更多的 state 变量，请考虑将它们合并为一个单独的 state 变量。
避免互相矛盾的 state。当 state 结构中存在多个相互矛盾或“不一致”的 state 时，你就可能为此会留下隐患。应尽量避免这种情况。
避免冗余的 state。如果你能在渲染期间从组件的 props 或其现有的 state 变量中计算出一些信息，则不应将这些信息放入该组件的 state 中。
避免重复的 state。当同一数据在多个 state 变量之间或在多个嵌套对象中重复时，这会很难保持它们同步。应尽可能减少重复。
避免深度嵌套的 state。深度分层的 state 更新起来不是很方便。如果可能的话，最好以扁平化方式构建 state。
*/

// 1. 合并关联的 state
function Cmp(){
    const x = useState(0);
    const y = useState(0);

    // 合并为
    const [position, setPosition] = useState({x: 0, y: 0});
}

// 2. 避免互相矛盾的 state
function Cmp(){
    // const [isSend, setIsSend] = useState(false);
    // const [isSending, setIsSending] = useState(false);
    // isSend 和 isSending 是矛盾的, 不能同时为true

    // 解决办法: 合并state
    const [state, setState] = useState("isSending");
    let isSend = state === "isSend";
    let isSending = state === "isSending";
}

// 3. 避免冗余的 state
function Cmp(){
    const [firstName, setFirstName] = useState("John");
    const [lastName, setLastName] = useState("Doe");

    // const [fullName, setFullName] = useState(firstName + " " + lastName);
    // 冗余的state问题是很难保持firstName和lastName的一致性(即同步数据会变得很困难)
    const fullName = firstName + " " + lastName;
}

// 4. 避免重复的 state
function Cmp(){
    // const [goodList, setGoodList] = useState([{id: 1, name: 'apple', price: 10}]);
    // const [good, setGood] = useState(goodList[0]);

    // 冗余的state问题是很难保持goodList和good的一致性(即同步数据会变得很困难)
    // 解决办法: 合并state
    const [goodList, setGoodList] = useState({id: 1, name: 'apple', price: 10});
    const goodId = useState(goodList[0].id);
}

// 5. 避免深度嵌套的 state
function Cmp(){
    // const [location, setLocation] = useState({
    //     Earth: {
    //         China: {
    //             Beijing: {
    //                 Haidian: {
    //                     street: "中关村大街"
    //                 }
    //             },
    //             GuangDong: {
    //                 GuangZhou: {
    //                     street: "天河路"
    //                 }
    //             }
    //         }
    //     }
    // })

    // 解决办法: 扁平化state(类似数据库的表结构)

    const [location, setLocation] = useState({
        Earth:{
            id: 1,
            children: [2, 3, 4]
        },
        China: {
            id: 2,
            children: [5, 6, 7]
        },
        Amercian: {
            id: 3,
            children: []
        },
        England: {
            id: 4,
            children: []
        },
        Shandong: {
            id: 5,
            children: []
        },
        Beijing: {
            id: 6,
            children: []
        },
        Haidian: {
            id: 7,
            children: []
        },
    })
}
