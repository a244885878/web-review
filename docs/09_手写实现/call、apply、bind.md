> 在 JavaScript 中，`call`、`apply` 和 `bind` 是 `Function.prototype` 上的方法，它们的作用是改变函数的 `this` 指向，并传递参数执行函数（`call、apply` 立即执行，`bind` 返回一个新的函数）。

#### 1. 手写 call 方法

- `call` 方法的作用是：让一个函数以指定的 this 值执行，并逐个传递参数。
- 关键点
  - `this` 为空时，默认指向 `window`（严格模式下为 `undefined`）。
  - 将函数作为 `this` 对象的临时方法执行。
  - 执行完后删除该临时方法，避免对原对象造成污染。

```js
Function.prototype.myCall = function (context, ...args) {
  if (typeof this !== "function") {
    throw new TypeError("myCall 只能在函数上调用");
  }

  context = context || globalThis; // 兼容 window 和 Node 环境
  const fnKey = Symbol(); // 避免对象已有同名属性
  context[fnKey] = this; // 将当前函数赋值给 context 对象

  const result = context[fnKey](...args); // 执行函数
  delete context[fnKey]; // 删除临时属性

  return result; // 返回执行结果
};

// 测试
function greet(name, age) {
  console.log(`Hello, my name is ${name}, I'm ${age} years old.`);
  console.log("this 指向:", this);
}

const person = { type: "human" };
greet.myCall(person, "Alice", 25);
```

#### 2. 手写 apply 方法

- apply 方法和 call 的区别在于 参数以数组形式传递。
- 其他逻辑与 call 类似。

```js
Function.prototype.myApply = function (context, args) {
  if (typeof this !== "function") {
    throw new TypeError("myApply 只能在函数上调用");
  }

  context = context || globalThis;
  const fnKey = Symbol();
  context[fnKey] = this;

  const result = args ? context[fnKey](...args) : context[fnKey]();
  delete context[fnKey];

  return result;
};

// 测试
greet.myApply(person, ["Bob", 30]);
```

#### 3. 手写 bind 方法

- `bind` 方法返回一个 新的函数，不会立即执行。
- `this` 绑定后，即使该函数被赋值给其他变量，或者作为对象的方法调用，它的 `this` 依然保持绑定的值。
- 传递的参数会 作为默认参数 预设到返回的新函数中。

```js
Function.prototype.myBind = function (context, ...args) {
  if (typeof this !== "function") {
    throw new TypeError("myBind 只能在函数上调用");
  }

  const self = this; // 保存原函数

  return function boundFunction(...innerArgs) {
    return self.apply(context, [...args, ...innerArgs]); // 预设参数 + 新调用时的参数
  };
};

// 测试
const boundGreet = greet.myBind(person, "Charlie");
boundGreet(40); // 传递剩余参数
```

#### 总结

| 方法    | 作用                    | 是否立即执行 | 参数传递方式       |
| ------- | ----------------------- | ------------ | ------------------ |
| `call`  | 改变 `this`，执行函数   | ✅ 立即执行  | 逐个传递参数       |
| `apply` | 改变 `this`，执行函数   | ✅ 立即执行  | 数组传递参数       |
| `bind`  | 绑定 `this`，返回新函数 | ❌ 不执行    | 预设参数，可继续传 |

这些方法的本质是 修改函数执行时的 `this` 绑定，`call` 和 `apply` 是立即执行的，而 `bind` 是返回新的函数，适用于需要延迟调用的场景。
