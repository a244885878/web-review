#### 手写 Promise.race 实现

> `Promise.race `接收一个可迭代对象（通常是数组），返回一个新的 `Promise`，并且该 `Promise` 的状态由最先执行完毕的 `Promise` 来决定。无论是成功还是失败，第一个有结果的 `Promise` 的值或错误都会被返回。

```js
function myPromiseRace(iterable) {
  return new Promise((resolve, reject) => {
    if (!Array.isArray(iterable) || iterable.length === 0) {
      return; // 如果是空数组，直接不返回任何 Promise
    }

    for (const promise of iterable) {
      Promise.resolve(promise).then(resolve, reject);
    }
  });
}
```

#### 代码详解

##### 1. 返回一个新的 Promise

- `Promise.race` 的本质是返回一个新的 `Promise`，并监听传入的可迭代对象中的 `Promise`。

##### 2. 遍历 iterable 里的每个 Promise

- `for (const promise of iterable)` 用于遍历 `iterable`，并且对每个元素进行 `Promise.resolve(promise)` 处理，以确保即使传入的是普通值，也能正确转换为 `Promise`。

##### 3. 谁先完成，谁就决定最终结果

- `Promise.resolve(promise).then(resolve, reject)`;
- 只要 任意 `Promise` 先变成 `fulfilled`（成功）或 `rejected`（失败），就立即调用 `resolve` 或 `reject` 让 `myPromiseRace` 变成相应的状态。

##### 4. 处理非 Promise 值

- 如果传入的 `iterable` 包含普通值（比如 `Promise.race([1, new Promise(resolve => setTimeout(() => resolve(2), 1000))])`），普通值会立即被 `Promise.resolve` 包装并成为 最快完成的 Promise，直接使 `Promise.race` 变成 `fulfilled`。

##### 5. 空数组处理

- 如果传入的是 `[]`，标准 `Promise.race([])` 会返回一个永远挂起的 `Promise`（即 `pending` 状态，永远不会 `resolve` 或 `reject`）。

* 这里直接 `return`;，效果类似于原生 `Promise.race([])`。

#### 运行示例

```js
const p1 = new Promise((resolve) =>
  setTimeout(() => resolve("p1 resolved"), 1000)
);
const p2 = new Promise((_, reject) =>
  setTimeout(() => reject("p2 rejected"), 500)
);
const p3 = new Promise((resolve) =>
  setTimeout(() => resolve("p3 resolved"), 800)
);

myPromiseRace([p1, p2, p3])
  .then((value) => console.log("成功:", value))
  .catch((error) => console.log("失败:", error));
```

#### 执行结果

```bash
失败: p2 rejected
```

因为 `p2` 500ms 失败了，它是最早完成的 `Promise`，所以 `myPromiseRace` 直接 `reject('p2 rejected')`。

#### Promise.race 的核心特点

1. 只要有一个 `Promise` 先完成，就直接返回这个 `Promise` 的结果（成功或失败）。
2. 如果 `iterable` 为空，返回的 `Promise` 将永远处于 `pending` 状态。
3. 如果 `iterable` 里有非 `Promise` 值，该值会被立即 `resolve`，并作为最快的结果。

```js
myPromiseRace([
  42,
  new Promise((resolve) => setTimeout(() => resolve(100), 1000)),
]).then(console.log); // 42 (因为 42 不是 Promise，立即 resolve)
```

#### 结论

- Promise.race 适用于竞速场景，比如：
  - 请求超时控制
  - 多个数据源，谁先返回就用谁
  - 用户操作的最快响应
