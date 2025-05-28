// 1. 只有在组件显示时, 才使用useEffect. 否则请使用事件处理函数.
// 在组件主体内声明的值是“响应式”的。(useEffect中)

// 2. 想要同步外部的数据源(非网络), 可以使用useSyncExternalStore
function Cmp02(){
    // 订阅者如何接收消息
    function handleLineChange(e){
        return navigator.onLine;
    }

    const isOnline = useSyncExternalStore(
        subscribe, 
        handleLineChange,  // 客户端里如何处理订阅消息
        ()=>{},  // 服务端里如何处理订阅消息
    );

    return <div>
        <p>当前网络状态: {isOnline ? "在线" : "离线"}</p>
    </div>
}
// 订阅谁
function subscribe(callback){
  window.addEventListener("online", callback);
  window.addEventListener("offline", callback);
  return ()=>{
    window.removeEventListener("online", callback);
    window.removeEventListener("offline", callback);
  }
}

// 3.不要在useEffect中同步state
function Cmp03(){
    const [firstName, setFirstName] = useState("张");
    const [lastName, setLastName] = useState("三");
    const [fullName, setFullName] = useState("张三");

    useEffect(()=>{
        setFullName(firstName + lastName);
    }, [firstName, lastName]);

    return <div>
        <p>全名: {fullName}</p>
    </div>
}
function Cmp04(){
    const [count, setCount] = useState(0);

    // 不合适的, 不要在useEffect处理事件处理函数的公用逻辑
    // useEffect(()=>{
    //     console.log("count", count);
    // }, [count]);
    // 改为
    function handleCountChange(e){
        console.log("count", count);
    }

    function handleAdd(){
        setCount(count+1);
        handleCountChange();
    }

    function handleSub(){
        setCount(count-1);
        handleCountChange();
    }

    return <div>
        <p>count: {count}</p>
        <button onClick={handleAdd}>+1</button>
        <button onClick={handleSub}>-1</button>
    </div>
}

// 4.链式调用
function Cmp05(){
    const [count, setCount] = useState(0);
    const [count2, setCount2] = useState(0);
    const [count3, setCount3] = useState(0);

    function handleAdd1(){
        setCount(count+1);
    }
    function handleAdd2(){
        setCount2(count2+1);
    }
    function handleAdd3(){
        setCount3(count3+1);
    }
    
    // 链式调用 count2 依赖 count
    useEffect(()=>{
        handleAdd2();
    }, [count]);
    // 链式调用 count3 依赖 count2
    useEffect(()=>{
        handleAdd3();
    }, [count2]);

    return <div>
        <p>count: {count}</p>
        <p>count2: {count2}</p>
        <p>count3: {count3}</p>
    </div>
}

// 5. 缓存计算结果, 使用useMemo
function Cmp06(filterFn){
    const [todolist, setTodolist] = useState([]);

    const filteredTodolist = useMemo(()=>{
        return todolist.filter(filterFn);
    }, [todolist, filterFn]);

    return <div>
        <p>filteredTodolist: {filteredTodolist}</p>
    </div>
}

// 6.不要让子组件的数据流流向父组件(请使用状态提升)
function Cmp07(){
    const [count, setCount] = useState(0);

    return <div>
        <Children onChange={setCount} />
        <p>count: {count}</p>
    </div>
}

function Children({onChange}){
    const [count, setCount] = useState(0);

    function handleChange(e){
        setCount(count+1);
        onChange(count+1);
    }

    return <div>
        <button onClick={handleChange}>+1</button>
    </div>
}

// 7.根据props重置子组件state(传入不同的key)
function Cmp08(){
    const [key, setKey] = useState(0);

    return <div>
        <Children key={key} />
        <button onClick={()=>setKey(key+1)}>重置key</button>
    </div>
}

function Children(){
    const [count, setCount] = useState(0);

    return <div>
        <button onClick={()=>setCount(count+1)}>+1</button>
        <p>count: {count}</p>
    </div>
}

// 8.尽可能在渲染期间计算.
// 假设你在浏览商城, 可以切换分页. 每切换一次分页,你希望重置一次子组件的state
const list = [
    [{id: 1, name: "商品1"}, {id: 2, name: "商品2"}],
    [{id: 3, name: "商品3"}, {id: 4, name: "商品4"}],
    [{id: 5, name: "商品5"}, {id: 6, name: "商品6"}],
]
function Cmp09(){
    const [pageIx, setPageIx] = useState(0);

    return <div>
        <List pageIx={pageIx} />
        <button onClick={()=>setPageIx((pageIx+1)%list.length)}>+1</button>
    </div>
}
function List({pageIx}){
    const page = list[pageIx];
    const [selectedItemId, setSelectedItemId] = useState(null);

    // 不太好, 渲染->useEffect->selectedItemId变化->渲染
    // useEffect(()=>{
    //     setSelectedItemId(null);
    // }, [pageIx]);

    // 更好的方式, 在渲染期间计算
    const selectItem = page.find(item=>item.id === selectedItemId) ?? null; 

    return <div>
        {page.map(item=>{
            return <div key={item.id} onClick={()=>setSelectedItemId(item.id)}>{item.name}</div>
        })}
        <div>{selectItem?.name}</div>
    </div>
}

// 9.函数也会成为依赖项
function Cmp10() {
    const [count, setCount] = useState(0);
  
    // 每次渲染, 都会创建一个新的函数, 由于闭包, 函数使用的count都是渲染时确定的
    function handleClick() {
      console.log("count", count);
      setCount(count + 1);
    }
  
    useEffect(() => {
      window.addEventListener("click", handleClick);
      return () => {
        window.removeEventListener("click", handleClick);
      };
    }, [handleClick]);
  }

/*
代码中的每个 Effect 应该代表一个独立的同步过程。
在上面的示例中，删除一个 Effect 不会影响另一个 Effect 的逻辑。这表明它们同步不同的内容，因此将它们拆分开是有意义的。另一方面，如果将一个内聚的逻辑拆分成多个独立的 Effects，代码可能会看起来更加“清晰”，但 维护起来会更加困难。这就是为什么你应该考虑这些过程是相同还是独立的，而不是只考虑代码是否看起来更整洁。
*/

/*
可变值（包括全局变量）不是响应式的。
例如，像 location.pathname 这样的可变值不能作为依赖项。它是可变的，因此可以在 React 渲染数据流之外的任何时间发生变化。更改它不会触发组件的重新渲染。因此，即使在依赖项中指定了它，React 也无法知道在其更改时重新同步 Effect。这也违反了 React 的规则，因为在渲染过程中读取可变数据（即在计算依赖项时）会破坏 纯粹的渲染。相反，应该使用 useSyncExternalStore 来读取和订阅外部可变值。
另外，像 ref.current 或从中读取的值也不能作为依赖项。useRef 返回的 ref 对象本身可以作为依赖项，但其 current 属性是有意可变的。它允许 跟踪某些值而不触发重新渲染。但由于更改它不会触发重新渲染，它不是响应式值，React 不会知道在其更改时重新运行 Effect。
正如你将在本页面下面学到的那样，检查工具将自动检查这些问题。
*/

/*
检查 Effect 是否表示了独立的同步过程。如果 Effect 没有进行任何同步操作，可能是不必要的。如果它同时进行了几个独立的同步操作，将其拆分为多个 Effect。
如果想读取 props 或 state 的最新值，但又不想对其做出反应并重新同步 Effect，可以将 Effect 拆分为具有反应性的部分（保留在 Effect 中）和非反应性的部分（提取为名为 “Effect Event” 的内容）。阅读关于将事件与 Effect 分离的内容。
避免将对象和函数作为依赖项。如果在渲染过程中创建对象和函数，然后在 Effect 中读取它们，它们将在每次渲染时都不同。这将导致 Effect 每次都重新同步。阅读有关从 Effect 中删除不必要依赖项的更多内容。
*/
