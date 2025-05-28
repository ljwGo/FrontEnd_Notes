// 以 use 开头的函数被称为 Hook。useState 是 React 提供的一个内置 Hook。
// 你可以在 React API 参考 中找到其他内置的 Hook。
// 你也可以通过组合现有的 Hook 来编写属于你自己的 Hook。
// Hook 比普通函数更为严格。你只能在你的组件（或其他 Hook）的 顶层 调用 Hook。
// 如果你想在一个条件或循环中使用 useState，请提取一个新的组件并在组件内部使用它。

// 使用 setReducer 的场景:
// 1. 当 state 的逻辑变得复杂时, 使用 setReducer 可以更好地组织代码
// 2. 当 state 的逻辑需要跨多个组件共享时, 使用 setReducer 可以更好地组织代码

function App(){
    // 复杂的 state
    const initialState = { count: 0 };

    // 所有操作state的动作, 一般包括一个type属性
    const actions = {
        increment: { type: 'increment' },
        decrement: { type: 'decrement' },
        reset: { type: 'reset' },
    }

    // 根据不同action来返回新的state(必须是新对象,地址不同)
    function reducer(state, action) {
        switch (action.type) {
            case 'increment':
                return { count: state.count + 1 };
            case 'decrement':
                return { count: state.count - 1 };
            case 'reset':
                return initialState;
            default:
                throw new Error('Invalid action type');
        }
    }

    // reducer限定了所有操作state的逻辑
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <div>
            <p>Count: {state.count}</p>
            <button onClick={() => dispatch(actions.increment)}>Increment</button>
            <button onClick={() => dispatch(actions.decrement)}>Decrement</button>
            <button onClick={() => dispatch(actions.reset)}>Reset</button>
        </div>
    );
}

/*
把 useState 转化为 useReducer：
通过事件处理函数 dispatch actions；
编写一个 reducer 函数，它接受传入的 state 和一个 action，并返回一个新的 state；
使用 useReducer 替换 useState；
Reducer 可能需要你写更多的代码，但是这有利于代码的调试和测试。
Reducer 必须是纯净的。
每个 action 都描述了一个单一的用户交互。
使用 Immer 来帮助你在 reducer 里直接修改状态。
*/