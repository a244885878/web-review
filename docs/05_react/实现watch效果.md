#### 1. 使用 useEffect Hook

这是最常见的方法，`useEffect` 允许你在函数组件中执行副作用操作，包括监听状态变化。

```jsx
import React, { useState, useEffect } from "react";

function MyComponent() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log("Count changed:", count);
    // 在这里执行 count 变化时的操作
  }, [count]); // 只有 count 变化时才会执行

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}
```

在上面的例子中，`useEffect` 的第二个参数 `[count]` 指定了依赖项，只有当 `count` 变化时，`useEffect` 中的回调函数才会执行。

#### 2. 使用 usePrevious Hook

`usePrevious` 是一个自定义 Hook，可以用来获取前一个状态的值。

```jsx
import React, { useState, useEffect, useRef } from "react";

function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

function MyComponent() {
  const [count, setCount] = useState(0);
  const prevCount = usePrevious(count);

  useEffect(() => {
    if (prevCount !== undefined) {
      console.log("Count changed from", prevCount, "to", count);
      // 在这里执行 count 变化时的操作
    }
  }, [count, prevCount]);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}
```

#### 3. 使用第三方库

有一些第三方库提供了更方便的 `watch` 功能，例如 `use-watch`。

```jsx
import React, { useState } from "react";
import useWatch from "use-watch";

function MyComponent() {
  const [count, setCount] = useState(0);

  useWatch(count, (newCount, oldCount) => {
    console.log("Count changed from", oldCount, "to", newCount);
    // 在这里执行 count 变化时的操作
  });

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}
```
