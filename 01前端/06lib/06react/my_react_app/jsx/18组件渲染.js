// 初次渲染 
// 当应用启动时，会触发初次渲染。
// 框架和沙箱有时会隐藏这部分代码，但它是通过调用 createRoot 方法并传入目标 DOM 节点，
// 然后用你的组件调用 render 函数完成的：

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Cmp />);

// 重新渲染
// 在初次渲染中， React 将会为<section>、<h1> 和三个 <img> 标签 创建 DOM 节点。
// 在一次重渲染过程中, React 将计算它们的哪些属性（如果有的话）自上次渲染以来已更改。
// 在下一步（提交阶段）之前，它不会对这些信息执行任何操作。

/* 
对于初次渲染， React 会使用 appendChild() DOM API 将其创建的所有 DOM 节点放在屏幕上。
对于重渲染， React 将应用最少的必要操作（在渲染时计算！），以使得 DOM 与最新的渲染输出相互匹配。
*/

export default function Clock({ time }) {
    return (
      <>
        <h1>{time}</h1>
        <input />
      </>
    );
  }

// input的value在更新时不会变
// 这个例子之所以会正常运行，是因为在最后一步中，React 只会使用最新的 time 更新 <h1> 标签的内容。
// 它看到 <input> 标签出现在 JSX 中与上次相同的位置，因此 React 不会修改 <input> 标签或它的 value！

// 在渲染完成并且 React 更新 DOM 之后，浏览器就会重新绘制屏幕。
// 尽管这个过程被称为“浏览器渲染”（“browser rendering”），但我们还是将它称为“绘制”（“painting”），以避免在这些文档的其余部分中出现混淆。

