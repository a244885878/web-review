> JavaScript 的 包装类型（Wrapper Object） 是指 Boolean、Number 和 String 这些构造函数，它们可以将基本数据类型（boolean、number 和 string）转换为对象，以提供额外的方法和属性。

#### 1. 包装类型概述

在 JavaScript 中，基本数据类型（原始类型, Primitive Types） 有：

- `string`
- `number`
- `boolean`
- `null`
- `undefined`
- `bigint`
- `symbol`

基本数据类型本身是不可变的值，它们没有方法或属性。然而，在需要使用方法时，JavaScript 会临时将基本类型转换为对应的包装对象，使其能够调用对象的方法。

```js
const str = "hello";
console.log(str.toUpperCase()); // "HELLO"
```

在这行代码执行时：

1. `str` 是一个基本类型的字符串（`string`）。
2. JavaScript 自动 将 `str` 转换为 `String` 类型的包装对象。
3. 这个 `String` 对象提供了 `toUpperCase()` 方法。
4. 方法执行完毕后，临时对象被销毁，`str` 仍然是基本类型。

#### 2. 三种包装类型

JavaScript 提供了三种主要的包装类型：

- Boolean
- Number
- String

##### 2.1 Boolean

```js
const bool = new Boolean(false);
console.log(bool); // Boolean { false }
console.log(typeof bool); // "object"
console.log(bool.valueOf()); // false
```

⚠️ 注意：

- `new Boolean(false)` 创建的是一个对象，即使它的值是 `false`，在 `if` 语句中仍然被认为是 true：

```js
if (new Boolean(false)) {
  console.log("执行了"); // 这行代码会执行
}
```

##### 2.2 Number

```js
const num = new Number(42);
console.log(num); // Number { 42 }
console.log(typeof num); // "object"
console.log(num.valueOf()); // 42
```

⚠️ 不建议使用 `new Number()`，因为它返回的是对象，而不是普通的数字。

##### 2.3 String

```js
const str = new String("hello");
console.log(str); // String { "hello" }
console.log(typeof str); // "object"
console.log(str.valueOf()); // "hello"
```

同样，不建议使用 new String()，因为它会创建对象，而不是基本类型的字符串。

#### 3. 包装类型的自动转换

JavaScript 允许基本类型直接调用方法，是因为它在幕后进行了自动装箱（Auto-Boxing）：

```js
const str = "hello";
console.log(str.length); // 5
console.log(str.toUpperCase()); // "HELLO"
```

执行 `str.length` 时：

1. JavaScript 创建 `String` 的包装对象 `new String("hello")`。
2. 访问 `length` 属性，得到 `5`。
3. 临时对象被销毁，`str` 仍然是基本类型。

但是，如果你手动创建包装对象，就会有问题：

```js
const str1 = "hello";
const str2 = new String("hello");

console.log(str1 === str2); // false，不同类型
console.log(str1 == str2); // true，包装对象会自动转换为基本类型
```

- str1 是基本类型 string
- str2 是 String 对象
- === 比较时不会进行类型转换，因此 false
- == 允许类型转换，所以 true

#### 4. 为什么不推荐使用 new Boolean()、new Number()、new String()？

- 这些包装对象是 `Object`，和基本类型 `boolean`、`number`、`string` 不是同一种类型，可能导致意想不到的行为：

```js
console.log(typeof new Boolean(false)); // "object"
console.log(typeof new Number(42)); // "object"
console.log(typeof new String("hello")); // "object"
```

- 在 `if` 语句中，所有对象都被视为 `true`，即使 `new Boolean(false)` 也是 `true`：

```js
if (new Boolean(false)) {
  console.log("这会执行");
}
```

- 一般情况下，使用基本类型即可，包装对象几乎没有必要使用。

#### 正确的做法：

✅ 直接使用基本类型：

```js
const bool = false;
const num = 42;
const str = "hello";
```

❌ 避免 new：

```js
const bool = new Boolean(false); // 不推荐
const num = new Number(42); // 不推荐
const str = new String("hello"); // 不推荐
```

#### 5. 相关的包装对象：Object

除了 `Boolean`、`Number` 和 `String`，`Object` 也是一个通用的包装类型：

```js
const obj1 = new Object(42);
console.log(obj1); // Number { 42 }

const obj2 = new Object("hello");
console.log(obj2); // String { "hello" }

const obj3 = new Object(true);
console.log(obj3); // Boolean { true }
```

- Object() 可以将基本类型转换为对应的包装对象。
- 但通常不会直接用 new Object()，而是用对象字面量 {}。

#### 6. 结论

- 包装类型 允许基本类型像对象一样调用方法，但 JavaScript 会自动处理，不需要手动 `new`。
- 不要使用 `new Boolean()`、`new Number()`、`new String()`，因为它们返回的是对象，而不是基本类型。
- 在 `if` 语句中，所有对象都被视为 `true`，包括 `new Boolean(false)`。
- 默认使用基本类型，避免不必要的 `new`，减少潜在的错误。
