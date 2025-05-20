#### nextTick 原理解析（Vue 3）

##### 1. nextTick 是什么？

`nextTick` 是 Vue 提供的一个异步 API，用于在 DOM 更新后执行回调函数。它常用于获取最新的 DOM 结构或执行依赖于更新后的 UI 逻辑。

```HTML
<template>
  <div ref="box">{{ message }}</div>
  <button @click="updateMessage">更新</button>
</template>

<script setup>
import { ref, nextTick } from "vue";

const message = ref("Hello Vue!");

const updateMessage = () => {
  message.value = "Updated!";
  nextTick(() => {
    console.log("DOM 更新完成:", document.querySelector("div").innerText);
  });
};
</script>
```

##### 2. nextTick 的原理

Vue 3 的 `nextTick` 主要基于 微任务（Microtask）队列 来执行回调，使其在 DOM 变化后立即执行。它的实现步骤如下：

1. 收集回调任务
   1. Vue 允许在 `nextTick` 中添加多个回调，所有回调会存入一个任务队列（pendingQueue）。
2. 利用微任务队列调度执行
   1. Vue 3 首选 `Promise.then` 来安排 `nextTick` 任务，因为它是 微任务，会比宏任务（如 `setTimeout`）更快执行。
   2. 如果 `Promise` 不可用，会退化到 `MutationObserver`，再不行就用 `setTimeout(0)` 作为兜底方案。
3. 避免重复执行
   1. Vue 维护了一个标志变量 `isFlushing`，确保 `nextTick` 只在当前执行周期中触发一次，而不会重复执行。

#### 3. nextTick 的源码（简化版）

Vue 3 `nextTick` 主要利用 `Promise.then` 触发微任务，实现如下：

```ts
const resolvedPromise = Promise.resolve(); // 复用 Promise 实例
const pendingQueue: Function[] = [];
let isFlushing = false;

export function nextTick(fn?: () => void): Promise<void> {
  return fn ? resolvedPromise.then(fn) : resolvedPromise;
}

function flushJobs() {
  if (isFlushing) return;
  isFlushing = true;

  resolvedPromise.then(() => {
    let job;
    while ((job = pendingQueue.shift())) {
      job();
    }
    isFlushing = false;
  });
}
```

#### 流程解析：

1. `nextTick(fn)` 将回调 fn 推入 `pendingQueue`，并返回一个 `Promise`。
2. `flushJobs()` 通过 `Promise.then` 触发微任务，确保所有回调在 DOM 更新后执行。
3. `isFlushing` 避免重复执行，确保 flushJobs() 仅触发一次。

#### 4. 为什么 nextTick 需要？

- 确保 DOM 已更新
  Vue 采用异步渲染机制，修改 `ref` 或 `reactive` 时，DOM 不会立即更新，而是批量更新。如果需要获取最新的 DOM 状态，`nextTick` 能保证回调在 DOM 更新后执行。

* 避免额外的 `setTimeout`
  `nextTick` 使用微任务，比 `setTimeout(0)` 更快，避免了不必要的性能损耗。

#### 5. nextTick 与 setTimeout 区别

| 方式          | 执行时机              | 优先级 |
| ------------- | --------------------- | ------ |
| nextTick      | 微任务 (Promise.then) | 高     |
| setTimeout(0) | 宏任务                | 低     |

结论：`nextTick` 比 `setTimeout(0)` 先执行，适合等待 DOM 更新的场景。

#### 6. nextTick 使用场景

- 获取最新 DOM（如 $refs）
- 依赖 DOM 计算的动画
- 避免不必要的重复渲染

#### 总结

1. `nextTick` 利用 `Promise.then` 调度微任务，在 DOM 更新后执行回调。
2. Vue 通过任务队列和批处理机制避免重复执行 `nextTick` 逻辑。
3. `nextTick` 适用于获取最新的 DOM 结构或在 DOM 变化后执行逻辑。

🚀 结论：Vue 3 的 `nextTick` 是一个基于微任务的优化手段，确保回调在 DOM 更新后立即执行，避免不必要的性能开销！
