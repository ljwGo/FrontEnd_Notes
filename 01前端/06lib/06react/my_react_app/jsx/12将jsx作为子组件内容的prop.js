// props收集参数
function Parent(){
    return (
        <>
        {/* <Child {...{arg01 : "arg01", arg02 : "arg02"}} /> */}
        <Child arg01="arg01" arg02="arg02" />
        {/* <Child>
            {{arg01 : "arg01", arg02 : "arg02"}}
        </Child> */}
        </>
    )
}

// props展开语法
function Child(props){
    return <Son {...props}/>
}

function Son({arg01, arg02}){
    return (
        <div>
            <h1>Son</h1>
            <p>{arg01}</p>
            <p>{arg02}</p>
        </div>
    )
}

// 这里将嵌套的jsx组件, 作为prop传入父组件
function JsxParent(){
    return <JsxChild>
        <JsxSon />
    </JsxChild>
}

function JsxChild({prop}){
    return <>
        I am JsxChild
        {prop}
    </>
}

function JsxSon(){
    return <div>I am JsxSon</div>
}
