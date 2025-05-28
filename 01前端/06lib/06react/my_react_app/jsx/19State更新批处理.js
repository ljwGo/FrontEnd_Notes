// React不会跨多个需要刻意触发的事件（如点击）进行批处理——每次点击都是单独处理的。
// 请放心，React 只会在一般来说安全的情况下才进行批处理。
// 这可以确保，例如，如果第一次点击按钮会禁用表单，
// 那么第二次点击就不会再次提交它。

function Counter(){
    const [count, setCount] = useState(0);

    function handleClick(){
        // 等效于+4
        setCount(count + 1);
        setCount(count + 1);
        setCount(count => count + 1);
        setCount(count => count + 1);
        setCount(count => count + 1);
    }
    
    return <h1 onClick={handleClick}>
        点击我{count}</h1>
}

// setState将新的state值或操作加入到队列中
// 只有进入下一个渲染周期, 才会遍历队列中每个state操作, 计算新的state
// setState加入函数, 该函数加入到队列中
function Counter(){
    const [count, setCount] = useState(0);

    function handleClick(){
        setCount(count => count + 1);
    }
}

// 批处理
// 在React中，批处理（Batching）是指将多个状态更新合并为单个更新，
// 批处理不会跨越多个需要刻意触发的事件（如点击）进行

// 实现原理简化版
export function getFinalState(baseState, queue) {
    let finalState = baseState;
  
    for (let update of queue) {
      if (typeof update === 'function') {
        // 调用更新函数
        finalState = update(finalState);
      } else {
        // 替换下一个 state
        finalState = update;
      }
    }
  
    return finalState;
  }