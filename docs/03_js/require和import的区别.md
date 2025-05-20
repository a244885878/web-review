> 在 JavaScript 中，require 和 import 都用于模块导入，但二者有本质区别，主要体现在以下几个方面：

#### 1. 规范来源不同

- require
  属于 CommonJS 规范，是 Node.js 默认的模块系统（非浏览器环境）。

```js
const fs = require("fs"); // CommonJS
```

- import

属于 ES Modules (ESM) 规范，是 ECMAScript 2015 (ES6) 的标准模块系统，适用于现代浏览器和 Node.js（需配置支持）。

```js
import fs from "fs"; // ES Modules
```

#### 2. 加载方式

- require
  - 动态加载：在代码运行时按需加载模块。
  - 可以写在代码块中（如条件语句、函数内）。

```js
if (condition) {
  const module = require("./module");
}
```

- import
  - 静态加载：在代码编译阶段解析依赖，提升到模块顶部（类似 `const`）。
  - 必须写在模块顶层，不能动态使用（但可通过 `import()` 动态导入）。

```js
// 静态导入（必须顶层）
import module from './module';

// 动态导入（返回 Promise）
if (condition) {
  import('./module').then(module => { ... });
}
```

#### 3. 导出与导入语法

- require
  - 导出：`module.exports` 或 `exports`。
  - 导入：直接获取导出对象。

```js
// 导出
module.exports = { name: "foo" };
// 或
exports.name = "foo";

// 导入
const obj = require("./module");
console.log(obj.name); // 'foo'
```

- import
  - 导出：`export` 或 `export default`。
  - 导入：支持按需导入、别名、全量导入等灵活语法。

```js
// 导出
export const name = 'foo';
export default function() { ... };

// 导入
import { name } from './module';
import myFunction from './module'; // 默认导出
import * as module from './module'; // 全量导入
```

#### 4. 模块导出值的本质

- require
  - 导出的是值的浅拷贝（对于引用类型是共享的）。
  - 允许在导入后修改模块内部状态（不推荐）。

* import
  - 导出的是值的只读引用（类似 `const` 声明）。
  - 严格模式下修改导入值会报错。

#### 5. 循环依赖处理

- require
  动态加载可能导致循环依赖处理不够直观，未完成的模块可能被提前引用。

* import
  静态分析使得循环依赖更容易被检测和处理，但需谨慎设计代码结构。

#### 6. 环境支持

- require
  Node.js 原生支持，浏览器需通过工具（如 Webpack、Browserify）转换。

* import
  现代浏览器原生支持，Node.js 需在 `package.json` 中设置 `"type": "module"` 或使用 .mjs 扩展名。

#### 7. 性能优化

- require
  动态加载不利于静态分析和 Tree Shaking（删除未使用代码）。

* import
  静态特性使得打包工具（如 Webpack）能进行 Tree Shaking，优化代码体积。

#### 总结

| 特性         | `require` (CommonJS) | `import` (ES Modules)    |
| ------------ | -------------------- | ------------------------ |
| 规范         | Node.js / CommonJS   | ES6 (ECMAScript Modules) |
| 加载时机     | 运行时动态加载       | 编译时静态解析           |
| 动态导入     | 支持                 | 需用 import() 函数       |
| 导出值类型   | 值的浅拷贝（可修改） | 值的只读引用（不可修改） |
| 语法灵活性   | 简单，但功能较少     | 灵活（按需导入、别名等） |
| 循环依赖处理 | 可能存在问题         | 更安全（依赖预解析）     |
| Tree Shaking | 不支持               | 支持                     |
| 浏览器支持   | 需打包工具转换       | 现代浏览器原生支持       |
| Node.js 支持 | 原生支持             | 需配置 type: "module"    |
