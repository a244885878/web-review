> Object.create() 是 ECMAScript 5 引入的一个静态方法，其主要作用是用来创建一个新对象，同时将传入的对象作为新对象的原型（即内部的 [[Prototype]] 链接到该对象）。这使得新对象能够继承传入对象上的属性和方法，从而实现原型继承，同时还可以配合第二个参数一次性定义新对象的自有属性。

具体来说，Object.create() 的作用包括：

1. 创建继承关系
   1. 通过指定一个原型对象，可以让新创建的对象自动继承该对象上的属性和方法，而不必通过构造函数来设置。例如，如果你有一个对象 person，调用 Object.create(person) 得到的新对象的内部 [[Prototype]] 就会指向 person，从而可以访问 person 上的所有可枚举属性。
2. 定义自有属性
   1. Object.create() 的第二个参数允许你传入一个属性描述符对象，这些属性会直接定义到新对象上，并且你可以精细地控制这些属性的可写性、可枚举性和可配置性。这比直接用字面量创建对象更灵活，因为你可以设置属性描述符。
3. 实现原型式继承
   1. 利用 Object.create()，你可以不用定义构造函数，就直接创建一个基于某个现有对象的“子对象”，这在某些设计模式（比如寄生式继承）中非常有用。

#### 手写实现

```js
function create(proto, propertiesObject) {
  // 参数 proto 必须是对象或者 null，否则抛出异常
  if (
    (typeof proto !== "object" && typeof proto !== "function") ||
    proto === null
  ) {
    throw new TypeError("Object prototype may only be an Object or null");
  }
  // 定义一个空构造函数
  function F() {}
  // 将构造函数 F 的原型指向传入的 proto 对象
  F.prototype = proto;
  // 利用 new F() 创建一个新对象，新对象的内部[[Prototype]] 就指向 proto
  var obj = new F();
  // 如果提供了第二个参数 propertiesObject，则使用 Object.defineProperties 将其定义到新对象上
  if (propertiesObject !== undefined) {
    Object.defineProperties(obj, propertiesObject);
  }
  return obj;
}
```

说明：

- 原型继承
  - 上面的实现通过定义一个空函数 F，并将 F.prototype 设为传入的 proto，从而利用 new F() 得到的新对象的内部 [[Prototype]] 指向了 proto。这正好模拟了 Object.create() 的基本原理，即“以指定对象为原型”创建新对象。
- 可选的属性定义
  - 如果传入了第二个参数 propertiesObject，则调用 Object.defineProperties 将这些属性（以及对应的属性描述符）直接定义在新对象上，达到同时初始化多个属性的效果。

#### 使用说明：

- 传入的第一个参数是作为新对象原型的对象；
- 如果传入了第二个参数，就可以一次性定义新对象上的多个属性（这些属性描述符与 Object.defineProperties 中的用法一致）。

#### 例如：

```js
var person = {
  name: "张三",
  greet: function () {
    return "你好，我是" + this.name;
  },
};

var newPerson = create(person);
newPerson.name = "李四";
console.log(newPerson.greet()); // 输出：你好，我是李四
```
