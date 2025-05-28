// 这样的写法利于撤销的操作
function Persistent(){
    const [arr, setArr] = useState([]);

    function handleClick(){
        // 每次点击都会创建一个新的数组, 而不是在原来的基础上添加
        setArr([...arr, 'a'])
    }

    return (
        <div>
            <button onClick={handleClick}>add</button>
            <ul>
                {arr.map((item, index) => (
                    <li key={index}>{item}</li>
                ))}
            </ul>
        </div>
    )
}

// mutation突变(指修改了外部变量, 导致外部原本啥都没干, 但内容发生了变化)
function Mutation(){
    const [obj, setObj] = useState({name: '张三', age: 18});

    function handleClick(){
        obj.age = 20;
        setObj({...obj});  // 会重新渲染, 是一个新的对象, 不是同一个对象
        // setObj(obj);  // 不会重新渲染, 虽然内部发生了变化, 但外部没有变化
    }

    return (
        <div>
            <button onClick={handleClick}>add</button>
            <Cmp obj={obj} />
            <Cmp obj={obj} />
            <Cmp obj={obj} />
        </div>
    )
}

function Cmp({obj}){
    return (
        <div>
            {obj.name}
            {obj.age}
        </div>
    )
}