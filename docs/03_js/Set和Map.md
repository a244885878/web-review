> `Set` 和 `Map` 是 ES6 引入的两种新的数据结构，它们提供了更灵活和高效的方式来存储和操作数据。

#### Set

`Set` 是一种存储唯一值的集合。它类似于数组，但是成员的值都是唯一的，没有重复的值。你可以把它想象成一个只存储键，不存储值的 `Map`。

##### 基本用法：

```js
let mySet = new Set(); // 创建一个空 Set
let mySet2 = new Set([1, 2, 3, 2]); // 使用数组初始化，重复值会被自动去除，mySet2 的值为 {1, 2, 3}
```

- 常用方法：
  - `add(value)`：添加一个值，返回 Set 自身。
  - `delete(value)`：删除一个值，返回布尔值，表示是否删除成功。
  - `has(value)`：判断是否包含某个值，返回布尔值。
  - `clear()`：清空 Set 中所有成员。
  - `size`：返回 Set 中成员的数量。

```js
mySet.add(1);
mySet.add(2).add(3); // 链式调用
console.log(mySet.has(2)); // true
mySet.delete(2);
console.log(mySet.size); // 2
mySet.clear();
console.log(mySet.size); // 0
```

- 遍历 Set：
  - `keys()`：返回键名的迭代器。
  - `values()`：返回键值的迭代器（由于 Set 只有键没有值，所以 `keys()` 和 `values()` 返回的结果相同）。
  - `entries()`：返回键值对的迭代器（由于 Set 只有键没有值，所以键名和键值相同）。
  - `forEach()`：使用回调函数遍历每个成员。

```js
let mySet = new Set([1, 2, 3]);
for (let item of mySet.values()) {
  console.log(item); // 依次输出 1, 2, 3
}

mySet.forEach((value) => {
  console.log(value); // 依次输出 1, 2, 3
});
```

#### Map

`Map` 是一种存储键值对的集合。它的键可以是任何类型的值，包括对象。这与普通对象只能使用字符串作为键不同。

##### 基本用法：

```js
let myMap = new Map(); // 创建一个空 Map
let myMap2 = new Map([
  ["name", "张三"],
  ["age", 18],
]); // 使用二维数组初始化
```

- 常用方法：
  - `set(key, value)`：设置一个键值对，返回 Map 自身。
  - `get(key)`：获取键对应的值，如果键不存在，则返回 `undefined`。
  - `has(key)`：判断是否包含某个键，返回布尔值。
  - `delete(key)`：删除一个键值对，返回布尔值，表示是否删除成功。
  - `clear()`：清空 Map 中所有成员。
  - `size`：返回 Map 中成员的数量。

```js
myMap.set("name", "李四");
myMap.set("age", 20);
console.log(myMap.get("name")); // 李四
console.log(myMap.has("age")); // true
myMap.delete("age");
console.log(myMap.size); // 1
```

- 遍历 Map：
  - `keys()`：返回键名的迭代器。
  - `values()`：返回键值的迭代器。
  - `entries()`：返回键值对的迭代器。
  - `forEach()`：使用回调函数遍历每个成员。

```js
let myMap = new Map([
  ["name", "张三"],
  ["age", 18],
]);

for (let [key, value] of myMap.entries()) {
  console.log(key, value); // 依次输出 name 张三, age 18
}

myMap.forEach((value, key) => {
  console.log(key, value); // 依次输出 name 张三, age 18
});
```

#### Map 和 Set 的区别：

| 特性       | Map                  | Set                                  |
| ---------- | -------------------- | ------------------------------------ |
| 存储形式   | 键值对               | 单个值（可以看作只有键没有值的 Map） |
| 键的唯一性 | 键唯一               | 值唯一                               |
| 初始化方式 | 二维数组             | 一维数组                             |
| 主要用途   | 存储键值对，快速查找 | 存储唯一值，去重                     |

#### 应用场景：

- Set：
  - 数组去重。
  - 检查某个值是否存在。
  - 存储需要保持唯一性的数据。
- Map：
  - 存储配置信息。
  - 存储需要通过键快速查找的数据。
  - 需要使用非字符串作为键的场景。
