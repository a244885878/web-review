> 下面给出一个简化版的 Promise 实现，并在代码后详细解释其原理和工作机制。需要注意的是，这个实现仅用于理解 Promise 的基本原理，并未涵盖所有细节（例如严格遵循 Promise/A+ 规范中的所有边界情况）。

```js
// 简单版的 Promise 实现
class MyPromise {
  constructor(executor) {
    // Promise 的三种状态：pending、fulfilled、rejected
    this.status = "pending";
    this.value = undefined;
    this.reason = undefined;
    // 存放 then 中注册的成功、失败回调（处理异步情况）
    this.onFulfilledCallbacks = [];
    this.onRejectedCallbacks = [];

    // resolve 函数，状态由 pending -> fulfilled，并保存 value
    const resolve = (value) => {
      if (this.status === "pending") {
        this.status = "fulfilled";
        this.value = value;
        // 执行所有注册的成功回调
        this.onFulfilledCallbacks.forEach((fn) => fn());
      }
    };

    // reject 函数，状态由 pending -> rejected，并保存 reason
    const reject = (reason) => {
      if (this.status === "pending") {
        this.status = "rejected";
        this.reason = reason;
        // 执行所有注册的失败回调
        this.onRejectedCallbacks.forEach((fn) => fn());
      }
    };

    // 执行 executor，捕获其中可能抛出的异常
    try {
      executor(resolve, reject);
    } catch (error) {
      reject(error);
    }
  }

  then(onFulfilled, onRejected) {
    // 保证 onFulfilled 和 onRejected 至少为函数
    onFulfilled =
      typeof onFulfilled === "function" ? onFulfilled : (value) => value;
    onRejected =
      typeof onRejected === "function"
        ? onRejected
        : (reason) => {
            throw reason;
          };

    // 为了实现链式调用，then 必须返回一个新的 Promise
    const promise2 = new MyPromise((resolve, reject) => {
      if (this.status === "fulfilled") {
        // 保证 then 中的回调异步执行（微任务/宏任务中均可，这里用 setTimeout 模拟）
        setTimeout(() => {
          try {
            const x = onFulfilled(this.value);
            resolvePromise(promise2, x, resolve, reject);
          } catch (error) {
            reject(error);
          }
        }, 0);
      } else if (this.status === "rejected") {
        setTimeout(() => {
          try {
            const x = onRejected(this.reason);
            resolvePromise(promise2, x, resolve, reject);
          } catch (error) {
            reject(error);
          }
        }, 0);
      } else if (this.status === "pending") {
        // 如果当前状态还是 pending，将回调存储起来，等待状态改变时调用
        this.onFulfilledCallbacks.push(() => {
          setTimeout(() => {
            try {
              const x = onFulfilled(this.value);
              resolvePromise(promise2, x, resolve, reject);
            } catch (error) {
              reject(error);
            }
          }, 0);
        });
        this.onRejectedCallbacks.push(() => {
          setTimeout(() => {
            try {
              const x = onRejected(this.reason);
              resolvePromise(promise2, x, resolve, reject);
            } catch (error) {
              reject(error);
            }
          }, 0);
        });
      }
    });

    return promise2;
  }
}

// 用于解析 then 回调的返回值
function resolvePromise(promise2, x, resolve, reject) {
  // 防止循环引用
  if (promise2 === x) {
    return reject(new TypeError("Chaining cycle detected for promise"));
  }
  let called = false; // 确保 resolve 或 reject 只调用一次

  // 如果 x 是对象或函数，则可能是一个 Promise 或 thenable 对象
  if (x !== null && (typeof x === "object" || typeof x === "function")) {
    try {
      const then = x.then;
      if (typeof then === "function") {
        // 认为 x 是一个 thenable，调用 then 方法
        then.call(
          x,
          (y) => {
            if (called) return;
            called = true;
            // 递归解析 y
            resolvePromise(promise2, y, resolve, reject);
          },
          (r) => {
            if (called) return;
            called = true;
            reject(r);
          }
        );
      } else {
        // 如果 then 不是函数，则 x 是普通值
        resolve(x);
      }
    } catch (error) {
      if (called) return;
      called = true;
      reject(error);
    }
  } else {
    // x 为基本类型，直接 resolve
    resolve(x);
  }
}
```

#### 原理解释

##### 1. 状态和状态转换

每个 Promise 实例都有一个初始状态 pending，以及可能的两种终态：fulfilled（成功）和 rejected（失败）。状态只能从 pending 转换为 fulfilled 或 rejected，一旦转换就不可更改。

##### 2. 构造函数与 Executor

- 构造函数接收一个执行器函数（executor），它会立即执行，并传入两个函数：resolve 和 reject。
- 如果执行器中出现异常，则通过 catch 捕获并调用 reject，从而使 Promise 进入失败状态。

##### 3. 异步执行与回调队列

- 为了支持异步任务，Promise 内部维护两个队列：`onFulfilledCallbacks` 和 `onRejectedCallbacks`。
- 当状态还是 `pending` 时，调用 `.then` 方法注册的回调会被存入相应队列中；状态改变后，再依次执行队列中的回调。
- 在回调中使用 `setTimeout`（实际环境中可以使用微任务，如 `process.nextTick` 或 `queueMicrotask`）确保异步执行，符合规范要求。

##### 4. 链式调用

- `.then` 方法返回一个新的 Promise，这样就可以链式调用。
- 在 then 回调中得到的返回值 x，可能是普通值，也可能是一个 Promise 或 thenable 对象，因此需要使用 `resolvePromise` 函数来解析并确保链式调用的正确执行。

##### 5. resolvePromise 函数

- 该函数用于判断 then 回调返回的值 x 的类型。如果 x 是一个 Promise 或 thenable，需要递归解析，确保最终获得一个普通值。
- 同时，防止循环引用（即 then 回调返回的是自身），以避免死循环或无限递归。

> 这种手写 Promise 实现展示了 Promise 的核心思想：状态管理、异步回调队列和链式调用机制，同时也体现了对 thenable 对象的兼容处理。这是理解 JavaScript 异步编程中 Promise 工作原理的一个非常好的入门示例。
