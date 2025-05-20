下面是一种常见的手写 Promise.all 的实现方式，并附上详细解释：

```js
function promiseAll(promises) {
  return new Promise((resolve, reject) => {
    // 1. 参数检查：如果传入的不是数组，则直接返回一个拒绝的 promise
    if (!Array.isArray(promises)) {
      return reject(new TypeError("参数必须是一个数组"));
    }

    const results = []; // 用于保存每个 promise 的结果，顺序与 promises 数组保持一致
    let resolvedCount = 0; // 记录已经成功解决（fulfilled）的 promise 数量
    const len = promises.length;

    // 特殊情况：如果传入空数组，则立即 resolve 空数组
    if (len === 0) {
      return resolve(results);
    }

    // 2. 遍历 promises 数组，为每个元素（可能是 Promise 或非 Promise 值）包装成 Promise 对象
    promises.forEach((item, index) => {
      // 使用 Promise.resolve 来处理非 Promise 值
      Promise.resolve(item)
        .then((value) => {
          results[index] = value; // 保持结果的顺序
          resolvedCount++;
          // 当所有的 Promise 都成功后，才最终调用 resolve
          if (resolvedCount === len) {
            resolve(results);
          }
        })
        .catch((err) => {
          // 如果任意一个 Promise 被拒绝，Promise.all 立即拒绝，并返回该错误
          reject(err);
        });
    });
  });
}
```

#### 代码原理说明

##### 1. 参数检查

- 首先判断传入的参数是否为数组，如果不是，则返回一个拒绝的 Promise，这符合 Promise.all 对非数组参数应抛出异常的设计。

##### 2. 处理空数组情况

- 如果数组为空，按照规范，Promise.all 应该返回一个状态为 fulfilled 的 Promise，并且值为空数组。

##### 3. 统一转换为 Promise

- 为了兼容数组中包含非 Promise 对象，我们使用 `Promise.resolve(item)` 将每个元素包装成一个 Promise，这样即使是普通值也会被当作已经 resolved 的 Promise 来处理。

##### 4. 保存结果及顺序保证

- 定义了一个 `results` 数组用来存储每个 Promise 的返回值。由于异步操作可能无序完成，通过记录每个 Promise 在原数组中的索引，可以保证最终返回的数组顺序与输入一致。

##### 5. 计数器机制

- 通过 `resolvedCount` 来统计已经解决的 Promise 数量。当所有 Promise 都成功解决后，调用 `resolve(results)` 返回结果数组。

##### 6. 异常处理

- 如果其中任意一个 Promise 发生拒绝（reject），则整个 `promiseAll` 返回的 Promise 会立即 reject，并抛出该错误，不再等待其他 Promise 完成。

> 这种实现方式充分利用了 Promise 的特性，通过并行执行所有异步任务，并在全部任务完成后收集结果，从而实现了 Promise.all 的基本功能和原理。这种思路不仅符合 Promise.all 的规范，还展示了如何利用计数器和索引来保证结果的顺序一致，非常适合理解 Promise 的工作机制。
