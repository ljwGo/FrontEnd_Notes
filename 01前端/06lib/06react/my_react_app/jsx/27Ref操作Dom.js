// 1. 让自定义组件可以接受ref, 使用forwardRef
import { forwardRef } from "react";
const Cmp = forwardRef((props, ref) => {
    return <input ref={ref} />
})

// ref只能用在内置的标签上
function App(){
    const ref = useRef(null);

    // ref.current指向Cmp中的input
    // 父组件通过ref拿到了子组件的DOM元素
    return <Cmp ref={ref} />
}

// 2. 强制更新dom, 使用flushSync
import { flushSync} from 'react-dom'
let nextId = 11;
function App01(){
    const [todoList, setTodoList] = useState([{id: 1, title: '吃饭'}, {id: 2, title: '睡觉'}, {id: 3, title: '学习'}, {id: 4, title: '打游戏'}, {id: 5, title: '学习'}, {id: 6, title: '打游戏'}, {id: 7, title: '学习'}, {id: 8, title: '打游戏'}, {id: 9, title: '学习'}, {id: 10, title: '打游戏'}]);
    const todoListRef = useRef(null);

    function handleAdd(){
        // 异步更新Dom
        // setTodoList(todoList => [...todoList, {id: nextId++, title: '学习' + nextId}])
        // ref的current指向的Dom不会立即更新, 这时候操作的不含最新的li标签

        // 强制同步Dom
        flushSync(() => {
            setTodoList(todoList => [...todoList, {id: nextId++, title: '学习' + nextId}])
        })
        todoListRef.current.scrollIntoView({behavior: 'smooth', block: 'nearest'})
    }

    return (
        <>
            <div style={{height: '1000px', backgroundColor: 'red'}}></div>
            <button onClick={handleAdd}>添加</button>
            <ul ref={todoListRef}>
                {todoList.map(todo => (
                    <li key={todo.id}>{todo.title}</li>
                ))}
            </ul>
        </>
    )
}

// 3.不要删除,修改,增加ref存储的dom

// 4. 句柄限制ref的访问
import { useImperativeHandle } from "react";  // Imperative极重要的
const Cmp02 = forwardRef((props, ref) => {
    const inputRef = useRef(null);

    // 替换ref, 暴露focus方法
    useImperativeHandle(ref, () => {
        return {
            focus(){
                inputRef.current.focus();
            }
        }
    })

    return <input ref={inputRef} />
});

function App02(){
    const inputRef = useRef(null);

    return <>
        <button onClick={() => inputRef.current.focus()}>聚焦</button>
        <Cmp02 ref={inputRef} />
    </>
}

// ref小结
// React 何时添加 refs 
// 在 React 中，每次更新都分为 两个阶段：
// 在 渲染 阶段， React 调用你的组件来确定屏幕上应该显示什么。
// 在 提交 阶段， React 把变更应用于 DOM。
// 通常，你 不希望 在渲染期间访问 refs。这也适用于保存 DOM 节点的 refs。在第一次渲染期间，DOM 节点尚未创建，因此 ref.current 将为 null。在渲染更新的过程中，DOM 节点还没有更新。所以读取它们还为时过早。
// React 在提交阶段设置 ref.current。在更新 DOM 之前，React 将受影响的 ref.current 值设置为 null。更新 DOM 后，React 立即将它们设置到相应的 DOM 节点。

// Brief
// Refs 是一个通用概念，但大多数情况下你会使用它们来保存 DOM 元素。
// 你通过传递 <div ref={myRef}> 指示 React 将 DOM 节点放入 myRef.current。
// 通常，你会将 refs 用于非破坏性操作，例如聚焦、滚动或测量 DOM 元素。
// 默认情况下，组件不暴露其 DOM 节点。 您可以通过使用 forwardRef 并将第二个 ref 参数传递给特定节点来暴露 DOM 节点。
// 避免更改由 React 管理的 DOM 节点。
// 如果你确实修改了 React 管理的 DOM 节点，请修改 React 没有理由更新的部分。