#### memo

> React.memo 是一个高阶组件，用于优化函数式组件的渲染性能。它接收一个函数式组件作为参数，并返回一个新的组件。这个新的组件会对传入的 props 进行浅比较，如果 props 没有发生变化，那么组件就不会重新渲染。

#### useMemo

> useMemo 是一个 React Hook，用于缓存计算结果。它接收一个函数和一个依赖项数组作为参数。只有当依赖项数组中的任何一个值发生变化时，useMemo 才会重新计算函数的结果。否则，它会返回缓存的结果。

#### 区别

1. 作用不同：`React.memo` 用于优化组件的渲染，而 `useMemo` 用于缓存计算结果。
2. 使用方式不同：`React.memo` 是一个高阶组件，需要包裹在函数式组件的外面。`useMemo` 是一个 Hook，可以在函数式组件内部直接调用。

#### 总结

- 当需要优化组件的渲染性能时，可以使用 React.memo。
- 当需要缓存计算结果时，可以使用 useMemo。

#### 示例

```jsx
import React, { useMemo } from "react";

const MyComponent = React.memo((props) => {
  const expensiveValue = useMemo(() => {
    // 一些昂贵的计算
    return props.value * 2;
  }, [props.value]);

  return <div>{expensiveValue}</div>;
});
```

在这个例子中，MyComponent 组件使用了 React.memo 进行优化，只有当 props.value 发生变化时，组件才会重新渲染。同时，expensiveValue 使用了 useMemo 进行缓存，只有当 props.value 发生变化时，才会重新计算。
