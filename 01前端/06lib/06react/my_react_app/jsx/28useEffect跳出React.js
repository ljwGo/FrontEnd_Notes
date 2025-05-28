// 0.
// 不要急着在你的组件中使用 Effect。记住，Effect 通常用于暂时“跳出” React 并与一些 外部 系统进行同步。这包括浏览器 API、第三方小部件，以及网络等等。如果你的 Effect 只是根据其他状态来调整某些状态，那么 你可能并不需要一个 Effect。

// useEffect 的执行时机
// 每当你的组件渲染时，React 会先更新页面，然后再运行 useEffect 中的代码。换句话说，useEffect 会“延迟”一段代码的运行，直到渲染结果反映在页面上。

import { useEffect, useState } from "react";
// 1. 处理不由事件处理函数产生的副作用(在渲染期间产生, 延迟到渲染后执行)
function Cmp01(){
    const [time, setTime] = useState(Date.now().toString());

    // 组件在挂起时, 就启动一个定时器, 每隔1秒, 打印一个数字
    useEffect(()=>{
        const timer = setInterval(()=>{
            setTime(Date.now().toString());
        }, 1000);

        // 组件被销毁时, 调用消除函数 ,清除定时器
        return ()=>{
            clearInterval(timer);
        }
    }, []);

    return <div>time: {time}</div>
}

// 第二个参数为依赖列表(使用Object.is比较)
// 依赖列表为undefined, useEffect在每次渲染后都会执行
// 依赖列表为空数组, useEffect在组件挂起时执行
// 依赖列表为非空数组, 依赖列表中的值发生变化时, useEffect会执行

// 2.每次调用useEffect时, 都会执行清除函数
function CreateConnection({to}){
    let timer = null;

    return {
        connect(){
            clearTimeout(timer);
            console.log("连接中...");
            timer = setTimeout(()=>{
                console.log(`连接${to}成功`);
            }, 3000);
        },
        disconnect(){
            clearTimeout(timer);
            console.log(`连接${to}断开`);
        }
    }
}

const personList =  [
    {
        id: 0,
        name: '张三',
        age: 18
    },
    {
        id: 1,
        name: '李四',
        age: 19
    }
]
function Cmp02(){
    const [personsList, setPersonList] = useState(personList);
    const [selectedId, setSelectedId] = useState(0);

    function handleChange(e){
        setSelectedId(e.target.value);
    }

    // 这种写法尽量避免. Effect 只用来执行那些显示给用户时组件 需要执行 的代码
    useEffect(()=>{
        const connection = CreateConnection({to: personsList[selectedId].name});
        connection.connect();
        return ()=>{
            connection.disconnect();
        }
    }, [selectedId]);

    return <>
        <select onChange={handleChange}>
            {personsList.map(person => (
                <option key={person.id} value={person.id}>{person.name}</option>
            ))}
        </select>
    </>
}

// 3.每轮useEffect执行时, 都会保留执行时的状态(闭包)
function Cmp03(){
    const [text, setText] = useState('');
    const inputRef = useRef(null);

    function handleChange(e){
        setText(e.target.value);
    }

    // inputRef不变, 不用传入依赖列表
    useEffect(()=>{
        let timer = setTimeout(()=>{
            alert("text: " + text);
            console.log("inputRef: " + inputRef.current.value);
        }, 3000);

        // 注释掉清理函数后, 计时器响应是在text更新后, 但每个useEffect使用的是那一次渲染的state快照
        // return ()=>{
        //     clearTimeout(timer);
        // }
    }, [text]);

    return <>
        <input type="text" onChange={handleChange} ref={inputRef} />
    </>
}

// 4.在严格模式下, useEffect会执行两次(组件销毁并重新挂载), 以检测副作用是否在多次渲染中保持一致
// ...

// 5.获取数据
function Cmp05({p}){
    const [data, setData] = useState(null);
    const [personList, setPersonList] = useState(p);
    const [selectedId, setSelectedId] = useState(0);

    function handleChange(e){
        setSelectedId(e.target.value);
    }

    // 竞争条件: 当多个异步请求同时进行, 谁获胜(后面请求覆盖前面请求)不取决于请求的顺序, 而是取决于请求的响应时间(由于网络条件)
    // 解决: 做不到取消已发出的请求, 只能忽略掉撤销的请求.
    useEffect(()=>{
        let ignore = false;
        fetch(`https://api.example.com/data?id=${person.id}`)
            .then(response => response.json())
            .then(data => {
                if(!ignore){
                    setData(data);
                }
            });

        return ()=>{
            ignore = true;
        }
    }, [selectedId]);

    return <>
        <select onChange={handleChange}>
            {personList.map(person => (
                <option key={person.id} value={person.id}>{person.name}</option>
            ))}
        </select>
        <div>Data: {data}</div>
    </>
}

// 6.订阅事件
function Cmp06(){
    useEffect(()=>{
        const handleClick = ()=>{
            console.log("click");
        }
        window.addEventListener("click", handleClick);

        return ()=>{
            window.removeEventListener("click", handleClick);
        }
    }, []);
}

// 7.播放动画
function Cmp07(){
    const tagRef = useRef(null);
    
    useEffect(()=>{
        tagRef.current.style.opacity = 1;
        // 重置动画
        return ()=>{
            tagRef.current.style.opacity = 0;
        }
    }, []);

    return <div ref={tagRef}>Hello</div>
}

// 8.同步第三方库
function Cmp08(){
    const tagRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);

    useEffect(()=>{
        if(isPlaying){
            tagRef.current.play();
        }else{
            tagRef.current.pause();
        }
    }, [isPlaying]);

    return <div><video ref={tagRef} src="https://www.w3schools.com/html/mov_bbb.mp4" /></div>
}

// 9.发送分析报告
//...

/*
在 Effect 中直接编写 fetch 请求 是一种常见的数据获取方式，特别是在完全客户端渲染的应用中。然而，这种方法非常手动化，并且有明显的弊端：

Effect 不会在服务端运行。这意味着最初由服务器渲染的 HTML 只会包含加载状态，而没有实际数据。客户端必须先下载所有的 JavaScript 并渲染应用，才会发现它需要加载数据——这并不高效。
直接在 Effect 中进行数据请求，容易产生“网络瀑布（network waterfall）”。首先父组件渲染时请求一些数据，随后渲染子组件，接着子组件开始请求它们的数据。如果网络速度不快，这种方式会比并行获取所有数据慢得多。
直接在 Effect 中进行数据请求往往无法预加载或缓存数据。例如，如果组件卸载后重新挂载，它必须重新获取数据。
不够简洁。编写 fecth 请求时为了避免 竞态条件（race condition） 等问题，会需要很多样板代码。
这些弊端并不仅限于 React。任何库在组件挂载时进行数据获取都会遇到这些问题。与路由处理一样，要做好数据获取并非易事，因此我们推荐以下方法：

如果你正在使用 框架 ，请使用其内置的数据获取机制。现代 React 框架集成了高效的数据获取机制，不会出现上述问题。
否则，请考虑使用或构建客户端缓存。流行的开源解决方案包括 React Query、useSWR 和 React Router v6.4+。你也可以自己构建解决方案：在底层使用 Effect，但添加对请求的去重、缓存响应以及避免网络瀑布（通过预加载数据或将数据请求提升到路由层次）的逻辑。
如果这些方法都不适合你，你可以继续直接在 Effect 中获取数据。
*/