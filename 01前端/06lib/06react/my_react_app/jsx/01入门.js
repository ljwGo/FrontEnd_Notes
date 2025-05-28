// 1.vue是数据驱动视图, react是单向数据流
// 2.vue在html中存在控制流程语句, react在jsx中存在html标签

// react在jsx中处理标签, 并且必须使用babel转换jsx语法
// jsx语法: 在js中使用html标签

// 需要使用export让外面的文件能够访问到, default表示这个方法是主要的
export default function App() {
    // 返回一个div标签在js方法中, 这个标签称为jsx语法
    return <div>Hello React</div>;
}

// 组件名称, 必须大写开头
function OnlyWrapperTag(){
    // 返回的jsx标签, 必须使用<>包裹, 否则会报错
    return <>
        <h1>Hello React</h1>
        <p>Hello React</p>
    </>
    // Error
    /*
    return 
        <h1>Hello React</h1>
        <p>Hello React</p>
    */
}

// JSX and React 是相互独立的 东西。但它们经常一起使用，但你 可以 单独使用它们中的任意一个，
// JSX 是一种语法扩展，而 React 则是一个 JavaScript 的库

// JSX 最终会被转化为 JavaScript，而 JSX 中的属性也会变成 JavaScript 对象中的键值对。
// 在你自己的组件中，经常会遇到需要用变量的方式读取这些属性的时候。
// 但 JavaScript 对变量的命名有限制。
// 例如，变量名称不能包含 - 符号或者像 class 这样的js保留字。
// 因此，在 JSX 中，你需要使用驼峰命名法来命名这些属性。
// 例如，class 属性在 JSX 中需要写成 className，而 for 属性需要写成 htmlFor。
// 这些属性在 JSX 中都是有效的，但在 JavaScript 中，它们是无效的。

// {}进入javascript语法, ()回到jsx标签语法中.
