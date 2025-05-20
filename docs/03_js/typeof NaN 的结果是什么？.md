### typeof NaN 的结果是什么？

typeof NaN 的结果是 "number"。

**为什么是 number 类型？**

- NaN 的含义: NaN 是 "Not a Number" 的缩写，即“不是一个数字”。它通常出现在数学运算无法得到有效数值结果时，比如 0 除以 0、对负数开平方根等。
- 类型判断: 虽然 NaN 表示“不是一个数字”，但 JavaScript 将其归类为 number 类型。这是因为 NaN 是一个特殊的数值，用于表示计算错误或无效的数值结果。

#### 总结

- typeof NaN === "number"
- NaN 是一个特殊的数值，用于表示计算错误。
- 虽然表示“不是一个数字”，但类型上属于 number。

#### 常见出现 NaN 的场景：

- 数学运算错误: 0 除以 0、对负数开平方根等。
- 类型转换失败: 将无法转换为数字的字符串转换为数字时。
- 其他函数返回 NaN: 一些数学函数在特定输入下会返回 NaN，比如 Math.sqrt(-1)。

#### 如何判断一个值是否为 NaN？

**isNaN() 函数:**

```js
isNaN(NaN); // true
isNaN(undefined); // true
isNaN("hello"); // true (字符串无法转换为数字)
```

**Number.isNaN() 函数: ES6 引入了 Number.isNaN() 函数，它比 isNaN() 函数更精确，因为它只对 Number 类型的值返回 true。**

```js
Number.isNaN(NaN); // true
Number.isNaN(undefined); // false
```

#### 注意事项

- NaN 与任何值都不相等，包括它自己： NaN !== NaN 为 true。
- NaN 的出现通常表示程序中存在错误，需要仔细检查代码。
