> 在 JavaScript 中，var、let 和 const 都是用于声明变量的关键字，但它们之间存在重要的区别。理解这些区别对于编写高质量的 JavaScript 代码至关重要。以下是对这三个关键字的详细比较：

#### 1. 作用域

- `var`: 使用 var 声明的变量具有函数作用域。这意味着变量在声明它的函数内部以及该函数的所有子函数中都是可见的。如果在函数外部声明 `var` 变量，则它具有全局作用域，即在整个脚本中都可用。`var` 没有块级作用域的概念。

```js
function myFunction() {
  if (true) {
    var x = 10;
  }
  console.log(x); // 输出 10，因为 var 没有块级作用域
}

myFunction();

var y = 20; // 全局作用域
function anotherFunction() {
  console.log(y); // 输出 20
}
anotherFunction();
```

- `let` 和 `const`: 使用 `let` 和 `const` 声明的变量具有块级作用域。这意味着变量只在其声明所在的块（通常是由花括号 `{}` 包围的代码段，例如 `if` 语句、`for` 循环等）内部可见。

```js
function myFunction() {
  if (true) {
    let x = 10;
    const PI = 3.14159;
  }
  //console.log(x); // 报错：x is not defined，因为 x 超出了作用域
  //console.log(PI); // 报错：PI is not defined，因为 PI 超出了作用域
}
myFunction();
```

#### 2. 变量提升

- `var`: `var` 声明的变量存在变量提升。这意味着在代码执行之前，JavaScript 引擎会将 `var` 声明的变量提升到其作用域的顶部。在声明之前访问该变量，其值为 `undefined`。

```js
console.log(myVar); // 输出 undefined
var myVar = 5;
```

- `let` 和 `const`: `let` 和 `const` 声明的变量不存在变量提升，或者更准确地说是存在“暂时性死区”（Temporal Dead Zone，TDZ）。这意味着在变量声明语句之前访问这些变量会导致错误。

```js
//console.log(myLet); // 报错：Cannot access 'myLet' before initialization
let myLet = 5;

//console.log(myConst); // 报错：Cannot access 'myConst' before initialization
const myConst = 10;
```

#### 3. 重复声明

- `var`: 可以使用 `var` 重复声明同一个变量，后面的声明会覆盖前面的声明（但通常这不是一个好的实践）。

```js
var myVar = 5;
var myVar = 10;
console.log(myVar); // 输出 10
```

- `let` 和 `const`: 在同一作用域内，不能使用 `let` 或 `const` 重复声明同一个变量，否则会导致语法错误。

```js
let myLet = 5;
//let myLet = 10; // 报错：Identifier 'myLet' has already been declared

const myConst = 5;
//const myConst = 10; // 报错：Identifier 'myConst' has already been declared
```

#### 4. 可变性

- `var` 和 `let`: 使用 `var` 和 `let` 声明的变量可以被重新赋值。

```js
let myLet = 5;
myLet = 10; // 合法

var myVar = 5;
myVar = 10; // 合法
```

- `const`: 使用 `const` 声明的变量必须在声明时进行初始化，并且之后不能被重新赋值。但是，如果 `const` 声明的是一个对象，则可以修改该对象的属性。

```js
const myConst = 5;
//myConst = 10; // 报错：Assignment to constant variable

const myObject = { value: 5 };
myObject.value = 10; // 合法，修改的是对象的属性
console.log(myObject.value); // 输出 10

//myObject = { value: 15 }; // 报错：Assignment to constant variable，不能重新赋值对象
```

#### 总结

| 特性         | var                                | let        | const                                  |
| ------------ | ---------------------------------- | ---------- | -------------------------------------- |
| 作用域       | 函数作用域                         | 块级作用域 | 块级作用域                             |
| 变量提升     | 有                                 | 无         | 无                                     |
| 重复声明     | 允许                               | 不允许     | 不允许                                 |
| 可变性       | 可变                               | 可变       | 不可变（基本类型），可修改属性（对象） |
| 全局对象属性 | 是（在浏览器中挂载到 window 对象） | 否         | 否                                     |

#### 最佳实践

- 尽可能使用 `const`，除非你需要重新赋值变量。这有助于提高代码的可读性和可维护性，并减少意外错误的发生。
- 如果需要重新赋值变量，则使用 `let`。
- 避免使用 `var`，除非你需要兼容旧版本的 JavaScript 代码。
