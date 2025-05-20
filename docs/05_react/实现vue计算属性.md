#### 使用 useMemo Hook

这是在函数式组件中实现计算属性最常见的方法。`useMemo` 可以缓存计算结果，只有当依赖项发生变化时才会重新计算。

```jsx
import React, { useState, useMemo } from "react";

function MyComponent() {
  const [a, setA] = useState(1);
  const [b, setB] = useState(2);

  const sum = useMemo(() => {
    console.log("计算sum"); // 只有当a或b变化时才会打印
    return a + b;
  }, [a, b]);

  return (
    <div>
      <p>a: {a}</p>
      <p>b: {b}</p>
      <p>sum: {sum}</p>
      <button onClick={() => setA(a + 1)}>增加a</button>
      <button onClick={() => setB(b + 1)}>增加b</button>
    </div>
  );
}
```

##### 优点

- 简单易用，符合 React 函数式组件的编程习惯。
- 性能优化，避免不必要的重复计算。

##### 缺点

- 需要手动管理依赖项，容易出错。
- 对于复杂的计算逻辑，代码可读性可能较差。

##### 适用场景

- 简单的计算属性，依赖项不多。
- 需要进行性能优化的场景。

#### 使用自定义 Hook

对于复杂的计算逻辑，可以将其封装在自定义 Hook 中，提高代码可读性和复用性。

```jsx
import React, { useState, useMemo } from "react";

function useSum(a, b) {
  return useMemo(() => {
    console.log("计算sum"); // 只有当a或b变化时才会打印
    return a + b;
  }, [a, b]);
}

function MyComponent() {
  const [a, setA] = useState(1);
  const [b, setB] = useState(2);

  const sum = useSum(a, b);

  return (
    <div>
      <p>a: {a}</p>
      <p>b: {b}</p>
      <p>sum: {sum}</p>
      <button onClick={() => setA(a + 1)}>增加a</button>
      <button onClick={() => setB(b + 1)}>增加b</button>
    </div>
  );
}
```

#### 使用第三方库

有一些第三方库提供了更方便的计算属性实现，例如 `reselect`。这些库通常具有更强大的功能，例如支持 memoized selectors。

```bash
npm install reselect
```

```jsx
import { useState } from "react";
import { createSelector } from "reselect";

const selectA = (state) => state.a;
const selectB = (state) => state.b;

const selectSum = createSelector([selectA, selectB], (a, b) => {
  console.log("计算sum"); // 只有当a或b变化时才会打印
  return a + b;
});

function MyComponent() {
  const [a, setA] = useState(1);
  const [b, setB] = useState(2);

  const sum = selectSum({ a, b });

  return (
    <div>
      <p>a: {a}</p>
      <p>b: {b}</p>
      <p>sum: {sum}</p>
      <button onClick={() => setA(a + 1)}>增加a</button>
      <button onClick={() => setB(b + 1)}>增加b</button>
    </div>
  );
}
```
