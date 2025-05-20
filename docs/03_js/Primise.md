> “Promise” 在 JavaScript 中是一个用于处理异步操作的对象。它代表了一个异步操作的最终结果。一个 Promise 可能处于以下三种状态之一：

- `pending` (进行中): 初始状态，既没有成功，也没有失败。
- `fulfilled` (已成功): 操作成功完成。
- `rejected` (已失败): 操作失败。

状态一旦改变，就无法再次改变。例如，从 `pending` 变为 `fulfilled` 后，就不能再变为 `rejected` 或再次变为 `fulfilled`。

Promise 的出现是为了解决传统回调函数（callback）可能导致的回调地狱（callback hell）问题，使异步代码更加清晰和易于管理。

#### Promise 的基本用法

```js
const myPromise = new Promise((resolve, reject) => {
  // 异步操作
  setTimeout(() => {
    const success = true; // 假设这是异步操作的结果
    if (success) {
      resolve("操作成功!"); // 调用 resolve 表示成功
    } else {
      reject("操作失败!"); // 调用 reject 表示失败
    }
  }, 1000); // 模拟 1 秒的延迟
});
```

在这个例子中，`new Promise()` 接受一个函数作为参数，这个函数被称为 executor。executor 接收两个参数：`resolve` 和 `reject`，它们都是函数。在异步操作成功时调用 `resolve`，并将结果作为参数传递；在异步操作失败时调用 `reject`，并将错误信息作为参数传递。

使用 Promise 的结果：

```js
myPromise
  .then((result) => {
    // 处理成功的结果
    console.log("成功:", result); // 输出：成功: 操作成功!
  })
  .catch((error) => {
    // 处理失败的情况
    console.error("失败:", error); // 如果 success 为 false，则输出此信息
  });
```

`.then() `方法用于处理 Promise 成功（fulfilled）状态的回调。它接收一个函数作为参数，该函数的参数是 `resolve` 传递的值。

`.catch()` 方法用于处理 Promise 失败（rejected）状态的回调。它也接收一个函数作为参数，该函数的参数是 reject 传递的值。

`.finally(callback)`: 用于指定不管 Promise 最后是成功还是失败，都会执行的回调函数。这对于清理操作非常有用，例如关闭加载指示器或释放资源。

#### Promise 的链式调用

Promise 的强大之处在于它可以进行链式调用，使得多个异步操作可以按顺序执行，避免了回调地狱。

```js
function asyncOperation1() {
  return new Promise((resolve) =>
    setTimeout(() => resolve("操作 1 完成"), 500)
  );
}

function asyncOperation2(result) {
  return new Promise((resolve) =>
    setTimeout(() => resolve(result + "，操作 2 完成"), 500)
  );
}

function asyncOperation3(result) {
  return new Promise((resolve) =>
    setTimeout(() => resolve(result + "，操作 3 完成"), 500)
  );
}

asyncOperation1()
  .then(asyncOperation2)
  .then(asyncOperation3)
  .then((result) => console.log(result)) // 输出：操作 1 完成，操作 2 完成，操作 3 完成
  .catch((error) => console.error(error));
```

在这个例子中，三个异步操作通过 `.then()` 链式调用，确保它们按顺序执行。

#### Promise 的方法

- `Promise.resolve(value)`: 返回一个状态为 `fulfilled` 的 Promise，并将给定的 `value` 作为结果值。如果 `value` 本身就是一个 Promise，则直接返回该 Promise。

```js
const resolvedPromise = Promise.resolve(42);
resolvedPromise.then((value) => console.log(value)); // 输出 42

const anotherPromise = new Promise((resolve) =>
  setTimeout(() => resolve("Hello"), 1000)
);
const resolvedWithPromise = Promise.resolve(anotherPromise); // 直接返回 anotherPromise

resolvedWithPromise.then((value) => console.log(value)); // 一秒后输出 "Hello"
```

- `Promise.reject(reason)`: 返回一个状态为 rejected 的 Promise，并将给定的 reason 作为拒绝原因。

```js
const rejectedPromise = Promise.reject("Something went wrong!");
rejectedPromise.catch((reason) => console.error(reason)); // 输出 "Something went wrong!"
```

- `Promise.all(promises)`: 接收一个 Promise 数组作为参数，当数组中所有的 Promise 都成功时，返回一个新的 Promise，该 Promise 的结果是一个包含所有 Promise 结果的数组。如果其中任何一个 Promise 失败，则返回的 Promise 也会失败，并返回第一个失败的 Promise 的错误信息。

```js
const promise1 = Promise.resolve(3);
const promise2 = 42;
const promise3 = new Promise((resolve, reject) => {
  setTimeout(resolve, 100, "foo");
});

Promise.all([promise1, promise2, promise3]).then((values) => {
  console.log(values); // 输出: Array [3, 42, "foo"]
});
```

- `Promise.race(promises)`: 接收一个 Promise 数组作为参数，返回一个新的 Promise，该 Promise 的结果是数组中第一个完成（无论是成功还是失败）的 Promise 的结果。

```js
const promise1 = new Promise((resolve, reject) => {
  setTimeout(resolve, 500, "one");
});

const promise2 = new Promise((resolve, reject) => {
  setTimeout(resolve, 100, "two");
});

Promise.race([promise1, promise2]).then((value) => {
  console.log(value); // 输出: "two"
});
```

- `Promise.allSettled(promises)`: ES2020 引入，接收一个 Promise 数组，并返回一个新的 Promise。该 Promise 在所有输入的 Promise 都已敲定时（settled，即已完成，无论是 fulfilled 还是 rejected）兑现。返回的 Promise 的值是一个数组，数组中的每个元素对应输入 Promise 的结果。每个元素都是一个对象，包含 `status` 属性（值为 "`fulfilled`" 或 "`rejected`"）和 `value` 属性（如果状态为 fulfilled）或 `reason` 属性（如果状态为 rejected）。这对于需要知道所有 Promise 结果的情况很有用，即使其中一些 Promise 失败了。

```js
const promise1 = Promise.resolve(3);
const promise2 = new Promise((resolve, reject) =>
  setTimeout(reject, 100, "Error!")
);
const promises = [promise1, promise2];

Promise.allSettled(promises).then((results) => {
  console.log(results);
  // [
  //   { status: "fulfilled", value: 3 },
  //   { status: "rejected", reason: "Error!" }
  // ]
});
```

#### Promise 的深入特性

- **Promise 的微任务队列**（Microtask Queue）: Promise 的 `.then()`、`.catch()` 和 `.finally()` 方法的回调函数不是立即执行的，而是会被放入一个微任务队列中。在当前宏任务（例如 script 脚本、setTimeout 回调等）执行完毕后，事件循环会检查微任务队列，并依次执行其中的微任务。这保证了 Promise 回调的异步执行，但又比普通的异步任务（例如 setTimeout）执行得更快。
- **Promise 的错误处理**: 如果在 Promise 链中没有使用 `.catch()` 方法来捕获错误，那么错误会一直冒泡到 Promise 链的末尾。在浏览器环境中，未捕获的 Promise 错误会触发 `unhandledrejection` 事件。在 Node.js 环境中，未捕获的 Promise 错误会导致进程崩溃。因此，始终建议在 Promise 链的末尾添加 `.catch()` 方法，以确保所有错误都被正确处理。
- **避免 Promise 陷阱**:
  - 忘记 return: 在 `.then()` 回调中，如果需要将结果传递给下一个 `.then()`，必须 return 一个值或一个新的 `Promise`。否则，后续的 `.then()` 将接收到 `undefined`。

```js
// 错误示例
Promise.resolve(1)
  .then((value) => {
    value + 1; // 忘记 return
  })
  .then((value) => console.log(value)); // 输出 undefined

// 正确示例
Promise.resolve(1)
  .then((value) => {
    return value + 1;
  })
  .then((value) => console.log(value)); // 输出 2
```

- 在 `.then()` 中抛出错误: 如果在 `.then()` 回调中抛出错误，该错误会被传递给下一个 `.catch()` 处理。

```js
Promise.resolve(1)
  .then((value) => {
    throw new Error("Something went wrong!");
  })
  .catch((error) => console.error(error)); // 输出 Error: Something went wrong!
```

#### async/await

`async/await` 是 JavaScript 中处理异步操作的一种语法糖，它建立在 Promise 之上，使异步代码看起来更像同步代码，从而提高了代码的可读性和可维护性。它是在 ES2017 (ES8) 中引入的。

##### async 函数

- `async` 关键字用于定义一个异步函数。
- `async` 函数总是返回一个 Promise 对象。
- 在 `async` 函数内部，你可以使用 `await` 关键字。

##### await 表达式

- `await` 关键字用于等待一个 Promise 对象 resolve。
- `await` 只能在 `async` 函数内部使用。
- `await` 会暂停 `async` 函数的执行，直到 `Promise resolve`，然后返回 `Promise` 的 `resolve` 值。
- 如果 `Promise reject`，`await` 会抛出一个异常，你可以使用 `try...catch` 块来捕获这个异常。

#### async/await 的工作原理

当 JavaScript 引擎遇到 `async` 函数时，它会将该函数转换成一个状态机。当遇到 `await` 表达式时，状态机会暂停函数的执行，并将控制权交给 JavaScript 运行时。当 Promise resolve 时，状态机会恢复函数的执行，并将 Promise 的 resolve 值返回给 `await` 表达式。

下面是一个使用 `async/await` 的示例：

```js
function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function myAsyncFunction() {
  console.log("Start");

  await delay(1000); // 等待 1 秒

  console.log("After 1 second");

  const result = await Promise.resolve(42); // 等待 Promise resolve
  console.log("Result:", result);

  try {
    await Promise.reject("Error!"); // 等待 Promise reject，并捕获异常
  } catch (error) {
    console.error("Caught an error:", error);
  }

  console.log("End");
}

myAsyncFunction();
```

输出：

```txt
Start
After 1 second
Result: 42
Caught an error: Error!
End
```

##### 与 Promise 的比较

使用 `async/await` 可以使异步代码更加简洁易懂，避免了 Promise 链式调用带来的 `.then()` 和 `.catch()` 的嵌套。

##### 总结

- `async/await` 是处理异步操作的强大工具，它使异步代码更易于编写和理解。
- `async` 用于定义异步函数，`await` 用于等待 Promise resolve。
- `async/await` 建立在 Promise 之上，是 Promise 的语法糖。
- 使用 `try...catch` 块可以捕获 `await` 抛出的异常。
