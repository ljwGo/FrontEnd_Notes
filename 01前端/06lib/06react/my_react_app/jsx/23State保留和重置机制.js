import { useState } from "react";

function Counter({ wordColor = "black" }) {
    const [count, setCount] = useState(0);
  
    function handleClick() {
      setCount(count + 1);
    }
  
    return (
      <div style={{ color: wordColor }}>
        {count}
        <button onClick={handleClick}>Add</button>
      </div>
    );
  }

function Counter02({ toggle = true }) {
const [count, setCount] = useState(0);

function handleClick() {
    setCount(count + 1);
}

let result = toggle ? (
    <div>
    {count}
    <button onClick={handleClick}>Add</button>
    </div>
) : (
    <div>
    <p>
        {count}
        <button onClick={handleClick}>Add</button>
    </p>
    </div>
);
return result;
}

//0. 组件树占位
function App() {
  const [showFirst, setShowFirst] = useState(true);
  
    function handleClick() {
        setShowFirst(!showFirst);
    }

  return (
    <>
      <div>
        {showFirst && <Counter />}  {/* showFirst为false时, 这里仍然占据组件树的一个结点 */}
        <Counter />
      </div>
      <button onClick={handleClick}>
        {showFirst ? "Hide" : "Show"}
      </button>
    </>
  );
}

// 1. React中state的保留和去除是根据组件树位置决定的
function App01() {
    const [showFirst, setShowFirst] = useState(true);
  
    function handleClick() {
      setShowFirst(!showFirst);
    }
  
    return (
      <>
        <div>
          {/* 虽然返回的组件不同, 但是它们在组件树中的位置是不变的, 故state不变 */}
          {showFirst ? <Counter wordColor="red" /> : <Counter wordColor="blue" />}
        </div>
        <button onClick={handleClick}>{showFirst ? "Hide" : "Show"}</button>
      </>
    );
  }

// 2.当组件树父节点发生改变时, 其子组件都会更新
function App02() {
    const [showFirst, setShowFirst] = useState(true);
  
    function handleClick() {
      setShowFirst(!showFirst);
    }
  
    return (
      <>
        {
            showFirst ? 
            (<div><Counter wordColor="red" /></div>) :
            (<p><Counter wordColor="blue" /></p>)
        }
        <button onClick={handleClick}>{showFirst ? "Hide" : "Show"}</button>
      </>
    );
}
// 可见, 组件树的形容是不准确的, 应该是标签树的变化;
// 这里div变为p标签.

// 3.组件内部发生标签变化时, state不会改变(这要组件位置不变)
function App03() {
    const [showFirst, setShowFirst] = useState(true);
  
    function handleClick() {
      setShowFirst(!showFirst);
    }

    return (
        <div>
            <Counter02 toggle={showFirst}/>
            <button onClick={handleClick}>{showFirst ? "Hide" : "Show"}</button>
        </div>
    )
}

// 4.相同位置的不同组件, state不会保留
function App04() {
    const [toggle, setToggle] = useState(true);

    function handleClick() {
        setToggle(!toggle);
    }

    return (
        <div>
            {toggle ? <Counter wordColor="red"/> : <Counter02/>}
            <button onClick={handleClick}>{toggle ? "Hide" : "Show"}</button>
        </div>
    )
}

// 5.重置同一类同位置的组件state(使用不同key来标识组件)
function App05() {
    const [itemId, setItemId] = useState(0);

    function handleClick() {
        setItemId(itemId + 1);
    }

    return (
        <div>
            <Counter key={itemId}/>
            <button onClick={handleClick}>Reset</button>
        </div>
    )
}

// 6.重置同一类同位置的组件state(改变位置)
function App06() {
    const [change, setChange] = useState(false);

    function handleClick() {
        setChange(!change);
    }

    return (
        change ? 
        (<div>
            <p>我是一段文本</p>
            <Counter/>
            <button onClick={handleClick}>Reset</button>
        </div>) :
        (<div>
            {null}
            <Counter/>
            <button onClick={handleClick}>Reset</button>
        </div>)
    )
}
{/* null是占位, 但是不渲染, 为了保证Counter组件位置不变 */}


function Item({name}){
    const [count, setCount] = useState(0);
    
    function handleClick(){
        setCount(count + 1);
    }

    return <li>{name + " " + count} 
        <button onClick={handleClick}>Add</button>
    </li>
}
// 7.保留不同位置的组件state(使用key来标识组件)
function App07() {
    const [list, setList] = useState([{id: 0, name: "张三"}, {id: 1, name: "李四"}, {id: 2, name: "王五"}]); 
    
    function reverseList() {
        setList(list.reverse().slice());
    }

    return (
        <>
            <ul>
                {list.map((item) => (
                    <Item key={item.id} name={item.name}/>
                ))}
            </ul>
            <button onClick={reverseList}>Reverse</button>
        </>
    )
}

// 8.在分支结构下, 允许key相同
function App08() {
    const [first, setFirst] = useState(true);

    function handleClick() {
        setFirst(!first);
    }

    let result = first ? (
        <div>
          <p></p>
          <Counter key="1" wordColor="blue"/>
          <button onClick={handleClick}>Reset</button>
        </div>
    ) : (
        <div>
          <Counter key="1" wordColor="red"/>
          <button onClick={handleClick}>Reset</button>
        </div>
    )

    return result;
}

// 9. 保留被删除的组件的state
// 9.1 三种方式--(伪删除, 将所有组件都渲染出来, 但是使用display隐藏组件)
// 9.2 使用状态提升
// 9.3 使用localstorage或sessionstorage持久化数据, 初始化state, 那么组件在重新创建时, 会使用持久化的数据初始化state
// ...

