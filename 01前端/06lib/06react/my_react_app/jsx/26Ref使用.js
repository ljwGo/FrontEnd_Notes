// 1. ref 和 state 的不同之处 
// ref	state
// useRef(initialValue)返回 { current: initialValue }	useState(initialValue) 返回 state 变量的当前值和一个 state 设置函数 ( [value, setValue])
// 更改时不会触发重新渲染	更改时触发重新渲染。
// 可变 —— 你可以在渲染过程之外修改和更新 current 的值。	“不可变” —— 你必须使用 state 设置函数来修改 state 变量，从而排队重新渲染。
// 你不应在渲染期间读取（或写入） current 值(事件处理函数中除外)。	你可以随时读取 state。但是，每次渲染都有自己不变的 state 快照。
// :
// 不要在渲染过程中读取或写入 ref.current。 如果渲染过程中需要某些信息，请使用 state 代替。
//由于 React 不知道 ref.current 何时发生变化，即使在渲染时读取它也会使组件的行为难以预测。
//（唯一的例外是像 if (!ref.current) ref.current = new Thing() 这样的代码，它只在第一次渲染期间设置一次 ref。）

// 2. 何时使用 ref 
// 通常，当你的组件需要“跳出” React 并与外部 API 通信时，你会用到 ref —— 通常是不会影响组件外观的浏览器 API。以下是这些罕见情况中的几个：
// 存储 timeout ID
// 存储和操作 DOM 元素，我们将在 下一页 中介绍
// 存储不需要被用来计算 JSX 的其他对象。
// 如果你的组件需要存储一些值，但不影响渲染逻辑，请选择 ref。

// 3. 使用 ref 操作 DOM 元素(ref.current访问元素)
function TextInputWithFocusButton() {
    const inputRef = useRef(null);

    function handleClick() {
        inputRef.current.focus();
        window.scrollTo({
            top: inputRef.current.offsetTop,
            behavior: "smooth"
        })
    }

    return (
        <>
            <div style={{ height: "1000px", backgroundColor: "red" }}></div>
            <div>
                {/* 使用ref内置prop将input元素的引用传递给inputRef */}
                <input ref={inputRef} type="text" />
                <button onClick={handleClick}>Focus the input</button>
            </div>
            <div style={{ height: "1000px", backgroundColor: "blue" }}></div>
        </>
    )
}

// 4. 使用ref存储setTimeoutID(不要在渲染期间读取或写入ref.current, 保证渲染期间的纯粹)
function SendButton() {
    const timeoutIDRef = useRef(0);

    function handleSend() {
        clearTimeout(timeoutIDRef.current);
        timeoutIDRef.current = setTimeout(() => {
            alert("发送中...")
        }, 3000)
    }

    function handleClear() {
        clearTimeout(timeoutIDRef.current)
    }
    
    return (
        <>
            <button onClick={handleSend}>Send</button>
            <button onClick={handleClear}>Clear</button>
        </>
    )
}

// 5. 使用ref存储其它与组件渲染无关的任何信息
// ...