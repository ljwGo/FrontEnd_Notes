// useCallback 会在第二个参数中传入的依赖项保持不变的情况下，为函数提供相同的引用

// 使用 useCallback 的常见场景包括：
// 1. 避免在每次渲染时重新创建函数。
// 2. 在组件树中传递函数，而不需要通过 props 传递。
// 3. 在函数组件中创建记忆化函数，以提高性能。

// 使用 useCallback 时，需要注意以下几点：
// 1. 依赖项数组中的值发生变化时，useCallback 才会重新创建函数。

// 与 useMemo 不同，useCallback 不会返回记忆化值，而是返回记忆化函数
// useCallback 应该和 React.memo 配套使用，以避免不必要的重新渲染
const handleClick = useCallback(() => {
    // ...
  }, [todos]);