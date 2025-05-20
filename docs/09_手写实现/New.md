#### new 操作符的原理

在 JavaScript 中，使用 new 调用一个构造函数时，实际上会按照下面 4 个步骤执行：

##### 1. 创建一个空对象

- 新建一个空对象（例如：`let obj = {}`），这个对象将最终作为实例被返回。

##### 2. 设置原型

- 将该空对象的内部属性 `[[Prototype]]`（即 `__proto__`）指向构造函数的 prototype 属性。这样，创建的对象就可以通过原型链访问构造函数原型上定义的属性和方法。例如：

```js
obj.__proto__ = Constructor.prototype;
```

或者使用 `Object.create` 方法来完成这一步骤。

##### 3. 绑定 this 并执行构造函数

使用构造函数执行代码，并将其内部的 `this` 绑定到新创建的对象上。也就是说，执行：

```js
const result = Constructor.apply(obj, args);
```

这一步会在新对象上添加构造函数中定义的属性和方法。

##### 4. 返回对象

如果构造函数返回的是一个对象（或函数），那么 new 表达式的结果就是该返回值；否则，忽略构造函数的返回值，返回第 1 步创建的对象。

这种机制保证了使用 new 后得到的对象不仅拥有构造函数内部初始化的属性，还能继承构造函数原型上的方法和属性。

#### 手写 new 操作符

```js
function myNew(Constructor, ...args) {
  // 1. 创建一个空对象
  const obj = {};

  // 2. 将空对象的 __proto__ 指向构造函数的 prototype
  obj.__proto__ = Constructor.prototype;
  // 或者： const obj = Object.create(Constructor.prototype);

  // 3. 执行构造函数，将 this 绑定到新对象，并传入参数
  const result = Constructor.apply(obj, args);

  // 4. 如果构造函数返回对象，则返回该对象，否则返回新创建的对象
  return result !== null &&
    (typeof result === "object" || typeof result === "function")
    ? result
    : obj;
}
```

##### 代码说明

- 步骤 1：我们先创建一个空对象 obj。
- 步骤 2：将这个空对象的 **proto** 指向构造函数的 prototype，从而建立原型链，使得实例可以访问构造函数原型上的属性和方法。
- 步骤 3：通过 `Constructor.apply(obj, args)` 执行构造函数，传入 `obj` 作为 `this`，让构造函数内部的赋值操作在这个对象上生效。
- 步骤 4：检查构造函数的返回值。如果返回了一个对象（或函数），则认为构造函数主动返回了一个新对象，直接使用它；否则返回我们刚刚创建的 `obj`。

#### 小结

使用 new 操作符时，JavaScript 内部会：

- 创建新对象
- 建立原型链（将对象的 `proto` 指向构造函数的 `prototype`）
- 绑定 `this` 并执行构造函数
- 根据构造函数的返回值决定返回哪个对象
