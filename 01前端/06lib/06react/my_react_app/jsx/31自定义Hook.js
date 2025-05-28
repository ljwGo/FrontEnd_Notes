// 1.自定义Hook使用use开头
import { useState } from "react";

function useOnline(){
    const [online, setOnline] = useState(navigator.onLine);

    useEffect(() => {
        window.addEventListener("online", () => {
            setOnline(true);
        });
        window.addEventListener("offline", () => {
            setOnline(false);
        });
    }, []);

    return online;
}

// 2.自定义Hook注重状态逻辑复用, 而不是状态复用
// 当想要复用状态时, 使用状态提升

// 3.不要创建像 useMount 这样的自定义 Hook。保持目标具体化。