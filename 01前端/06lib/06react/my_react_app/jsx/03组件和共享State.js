// 想要多个组件共享state, 需要把state提升到他们的父组件中

// 1. 创建一个共享的state
function Parent() {
  const [count, setCount] = useState(0);

  function handleCountChange() {
    setCount(count + 1);
  }

  return (
    <div>
      <Child count={count} onCountChange={handleCountChange} />
      <Child count={count} onCountChange={handleCountChange} />
      <Child count={count} onCountChange={handleCountChange} />
    </div>
  );
}

// 2. 使用props向下传递state
function Child({ count, onCountChange }) {
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={onCountChange}>Increment</button>
    </div>
  );
}

// 1.受控组件和非受控组件
// 通常我们把包含“不受控制”状态的组件称为“非受控组件”。例如，最开始带有 isActive 状态变量的 Panel 组件就是不受控制的，因为其父组件无法控制面板的激活状态。
// 相反，当组件中的重要信息是由 props 而不是其自身状态驱动时，就可以认为该组件是“受控组件”。这就允许父组件完全指定其行为。最后带有 isActive 属性的 Panel 组件是由 Accordion 组件控制的。
// 非受控组件通常很简单，因为它们不需要太多配置。但是当你想把它们组合在一起使用时，就不那么灵活了。受控组件具有最大的灵活性，但它们需要父组件使用 props 对其进行配置。
// 在实践中，“受控”和“非受控”并不是严格的技术术语——通常每个组件都同时拥有内部状态和 props。然而，这对于组件该如何设计和提供什么样功能的讨论是有帮助的。
// 当编写一个组件时，你应该考虑哪些信息应该受控制（通过 props），哪些信息不应该受控制（通过 state）。当然，你可以随时改变主意并重构代码。
