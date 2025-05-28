// 1. useEffect是响应式的
// 副作用函数中使用响应式变量, 会形成闭包, 闭包中使用的变量是渲染时确定的, 不是最新的
// 响应式值 包括 props 以及所有你直接在组件中声明的变量和函数

// connect.js
function createConnection(roomId){
    // 模拟连接
    return {
        connect(){
            console.log("连接中...", roomId);
        },
        disconnect(){
            console.log("断开房间", roomId);
        },
        connected(callback, ...args){
            console.log("连接成功", roomId);
            callback(...args);
        }
    }
}

// cmp.js
// 想要在effect中使用theme, 需要将theme添加到依赖中.
// 但是, 如果theme是一个响应式变量, 那么每次theme变化时, 都会重新执行effect.
// 但是, theme变化不应该导致重新连接.

import {experimental_useEffectEvent as useEffectEvent} from "react";

function ChatRoom(){
    const [theme, setTheme] = useState("light");
    const [roomId, setRoomId] = useState(0);
    
    
    // 2. 使用effectEvent将effect中的非响应式代码提取到effect外部(注意它还处于实验阶段)
    const themeNotifier = useEffectEvent(
        ()=>{
            if (theme === "light") {
                alert("连接成功light" + roomId);
            }
            else{
                alert("连接成功dark" + roomId);
            }
        }
    );

    useEffect(()=>{
        const connection = createConnection(roomId);
        connection.connect();
        // connection.connected(
        //     ()=>{
        //         if (theme === "light") {
        //             alert("连接成功light" + roomId);
        //         }
        //         else{
        //             alert("连接成功dark" + roomId);
        //         }
        //     }
        // );

        // 替换为
        themeNotifier();
        return ()=>{
            connection.disconnect();
        }
    // }, [roomId, theme]);
    }, [roomId]);

    return (
        <div>
            <input type="text" value={roomId} onChange={(e)=>setRoomId(e.target.value)}/>
            <input type="text" value={theme} onChange={(e)=>setTheme(e.target.value)}/>
        </div>
    )
}

// 3.useEffectEvent中所有的state和props都是最新的. 不像useEffect, 它不会形成闭包.

// 4.useEffectEvent的限制
// 只能在 Effect 内部使用
// 不能在函数组件内部使用
// 不能在自定义 Hook 内部使用
// 不能在服务器端渲染时使用
// 不能在 React Native 中使用

// 5.当依赖对象时,要特别小心. 每次创建的对象(即使从父节点传递的)都是不同的
function ChatRoom({ options }) {
    const [message, setMessage] = useState('');
  
    // 当创建的对象含有响应式变量时, 它本身也会成为响应式变量.
    // 每次渲染时, 都会创建一个新的对象.
    // const obj = {
    //     roomId: options.roomId,
    // }

    // 提前拿取对象中的值
    const { roomId, serverUrl } = options;
    useEffect(() => {
      const connection = createConnection({
        roomId: roomId,
        serverUrl: serverUrl
      });
      connection.connect();
      return () => connection.disconnect();
    }, [roomId, serverUrl]); // ✅ 所有依赖已声明
    // ...
}

/*
摘要
依赖应始终与代码匹配。
当你对依赖不满意时，你需要编辑的是代码。
抑制 linter 会导致非常混乱的错误，你应该始终避免它。
要移除依赖，你需要向 linter “证明”它不是必需的。
如果某些代码是为了响应特定交互，请将该代码移至事件处理的地方。
如果 Effect 的不同部分因不同原因需要重新运行，请将其拆分为多个 Effect。
如果你想根据以前的状态更新一些状态，传递一个更新函数。
如果你想读取最新值而不“反应”它，请从 Effect 中提取出一个 Effect Event。
在 JavaScript 中，如果对象和函数是在不同时间创建的，则它们被认为是不同的。
尽量避免对象和函数依赖。将它们移到组件外或 Effect 内。
*/

