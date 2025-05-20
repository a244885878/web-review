> Array.prototype.reduce() 方法用于对数组中的每个元素执行累加器函数，最终将其累积为单个值。该方法常用于对数组元素求和。

##### 语法：

```js
array.reduce(callback(accumulator, currentValue[, index[, array]])[, initialValue])
```

- `callback`：用于执行每个数组元素的函数，包含以下参数：
  - `accumulator`：累加器，累积回调的返回值；它是上一次调用回调时返回的累积值。
  - `currentValue`：数组中正在处理的当前元素。
  - `index`（可选）：数组中正在处理的当前元素的索引。
  - `array`（可选）：调用 reduce 的数组。
- `initialValue`（可选）：作为第一次调用 `callback` 函数时 `accumulator` 的初始值。

##### 示例：

```js
const numbers = [1, 2, 3, 4, 5];
const sum = numbers.reduce(
  (accumulator, currentValue) => accumulator + currentValue,
  0
);
console.log(sum); // 输出: 15
```
