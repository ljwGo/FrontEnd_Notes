// 保持state的不变性, 直接修改对象state的属性值不会触发组件重新渲染
function Cmp(){
    const [obj, setObj] = useState({name: '张三', age: 18});

    function handleClick(){
        obj.age = 20;  // 并没有改变对象地址. preObj === obj
        setObj({...obj, age: 20});  // 使用展开语法, 便捷创建一个新对象
    }

    return (
        <div>
            <button onClick={handleClick}>add</button>
        </div>
    )
}

// 展开语法是浅拷贝
function Cmp02(){
    const [person, setPerson] = useState({
        name: '张三', age: 18, 
        address: {
            city: '北京', country: '中国'
        }
    });

    // 需要依次从最深的对象开始, 依次展开
    function handleClick(){
        setPerson({
            ...person,
            address: {
                ...person.address,
                city: '上海'
            }
        });
    }

    return (
        <div>
            <button onClick={handleClick}>transform</button>
            <p>name: {person.name}</p>
            <p>age: {person.age}</p>
            <p>city: {person.address.city}</p>
            <p>country: {person.address.country}</p>
        </div>
    )
}

// 动态对象名称: 使用[]表示对象属性名
function Cmp03(){
    const [person, setPerson] = useState({
        name: '张三', 
        age: 18,
        address: {
            city: '北京', country: '中国'
        }
    });

    // []表示用字符串命名对象属性
    function handleChange(e){
        setPerson({
            ...person,
            [e.target.name]: e.target.value,
            address: {
                ...person.address,
                [e.target.name]: e.target.value
            }
        });
    }

    return (
        <div>
            <p>name: <input type="text" name="name" value={person.name} onChange={handleChange}/></p>
            <p>age: <input type="text" name="age" value={person.age} onChange={handleChange}/></p>
            <p>city: <input type="text" name="city" value={person.address.city} onChange={handleChange}/></p>
            <p>country: <input type="text" name="country" value={person.address.country} onChange={handleChange}/></p>
            <h1>{person.name + ' ' + person.age + ' ' + person.address.city + ' ' + person.address.country}</h1>
        </div>
    )
}

// 可以使用immer库, 简化state对象的修改
/*
    npm install use-immer
    import { useImmer } from 'use-immer';
*/

// 使用useImmer代替useState
import { useImmer } from 'use-immer';

//由 Immer 提供的 draft 是一种特殊类型的对象，被称为 Proxy，它会记录你用它所进行的操作。
//这就是你能够随心所欲地直接修改对象的原因所在！
//从原理上说，Immer 会弄清楚 draft 对象的哪些部分被改变了，并会依照你的修改创建出一个全新的对象。

function Cmp04(){
    const [person, setPerson] = useImmer({
        name: '张三', age: 18, address: {city: '北京', country: '中国'}});

    function handleChange(e){
        // 必须传入函数, draft是state对象的代理, 复制操作交由immer库完成
        setPerson(draft => {
            draft.name = e.target.value;
        });
    }

    return <div>
        <input type="text" value={person.name} onChange={handleChange}/>
        <div>{person.name}</div>
    </div>
}


// 保持state不变性的优点
/*
调试：如果你使用 console.log 并且不直接修改 state，你之前日志中的 state 的值就不会被新的 state 变化所影响。这样你就可以清楚地看到两次渲染之间 state 的值发生了什么变化
优化：React 常见的 优化策略 依赖于如果之前的 props 或者 state 的值和下一次相同就跳过渲染。如果你从未直接修改 state ，那么你就可以很快看到 state 是否发生了变化。如果 prevObj === obj，那么你就可以肯定这个对象内部并没有发生改变。
新功能：我们正在构建的 React 的新功能依赖于 state 被 像快照一样看待 的理念。如果你直接修改 state 的历史版本，可能会影响你使用这些新功能。
需求变更：有些应用功能在不出现任何修改的情况下会更容易实现，比如实现撤销/恢复、展示修改历史，或是允许用户把表单重置成某个之前的值。这是因为你可以把 state 之前的拷贝保存到内存中，并适时对其进行再次使用。如果一开始就用了直接修改 state 的方式，那么后面要实现这样的功能就会变得非常困难。
更简单的实现：React 并不依赖于 mutation ，所以你不需要对对象进行任何特殊操作。它不需要像很多“响应式”的解决方案一样去劫持对象的属性、总是用代理把对象包裹起来，或者在初始化时做其他工作。这也是 React 允许你把任何对象存放在 state 中——不管对象有多大——而不会造成有任何额外的性能或正确性问题的原因。
*/

