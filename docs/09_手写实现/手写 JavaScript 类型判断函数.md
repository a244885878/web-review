> 在 JavaScript 中，类型判断通常使用 `typeof` 和 `Object.prototype.toString.call()`，但 typeof 不能准确区分 `null`、对象、数组等复杂类型。因此，我们可以手写一个更加准确的类型判断函数。

```js
function getType(value) {
  // 直接判断 null
  if (value === null) return "null";

  // 使用 typeof 处理基础类型（但 typeof null 是 'object'，需要提前返回）
  const type = typeof value;
  if (type !== "object" && type !== "function") {
    return type;
  }

  // 通过 Object.prototype.toString.call() 获取更准确的类型
  const typeString = Object.prototype.toString.call(value);
  return typeString.slice(8, -1).toLowerCase(); // 提取 [object Xxx] 中的 Xxx
}

// 测试
console.log(getType(null)); // "null"
console.log(getType(undefined)); // "undefined"
console.log(getType(123)); // "number"
console.log(getType("hello")); // "string"
console.log(getType(true)); // "boolean"
console.log(getType(Symbol())); // "symbol"
console.log(getType(BigInt(10))); // "bigint"
console.log(getType({})); // "object"
console.log(getType([])); // "array"
console.log(getType(() => {})); // "function"
console.log(getType(new Date())); // "date"
console.log(getType(new RegExp())); // "regexp"
console.log(getType(new Map())); // "map"
console.log(getType(new Set())); // "set"
console.log(getType(new WeakMap())); // "weakmap"
console.log(getType(new WeakSet())); // "weakset"
console.log(getType(new Error())); // "error"
```

#### 详细解析

##### 1. 判断 null：

- `typeof null` 返回 `'object'`，所以需要单独处理 `null`，直接返回 `'null'`。

##### 2. 处理基础类型：

- `typeof` 对于 `number`、`string`、`boolean`、`undefined`、`symbol`、`bigint` 都能准确返回，不需要额外处理。

##### 3. 使用 Object.prototype.toString.call(value) 处理复杂类型：

- `Object.prototype.toString.call(value)` 返回 `[object Xxx]` 的格式，我们可以提取 `Xxx` 作为类型名称：

```js
Object.prototype.toString.call([]); // "[object Array]"
Object.prototype.toString.call(new Date()); // "[object Date]"
```

- 通过 `slice(8, -1)` 提取 `Xxx` 并转小写，得到最终类型名称。

##### 4. 支持所有常见类型：

- `array`、`date`、`regexp`、`map`、`set`、`weakmap`、`weakset`、`error` 都能正确识别。
