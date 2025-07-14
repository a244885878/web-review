## 在 TypeScript 中，type 和 interface 都可以用来定义对象的类型结构，但它们在使用方式和扩展性方面有一些区别。下面从几个方面来对比它们：

### 一、基本语法对比

```ts
// interface
interface Person {
  name: string;
  age: number;
}

// type
type Person = {
  name: string;
  age: number;
};
```

两者在定义基本对象类型时几乎等价。

### 二、扩展（继承）

#### ✅ interface 支持多继承：

```ts
interface A {
  a: string;
}
interface B {
  b: string;
}
interface C extends A, B {
  c: string;
}
```

#### ✅ type 使用交叉类型（Intersection）：

```ts
type A = { a: string };
type B = { b: string };
type C = A & B & { c: string };
```

### 三、合并（声明合并）

#### ✅ interface 可以自动合并（同名时）：

```ts
interface Animal {
  name: string;
}
interface Animal {
  age: number;
}

// 等价于
// interface Animal {
//   name: string;
//   age: number;
// }
```

#### ❌ type 不允许重复定义同名类型：

```ts
type Animal = { name: string };
type Animal = { age: number }; // ❌ 报错：重复定义
```

### 四、适用范围

#### ✅ type 更通用，可用于联合类型、原始类型、映射等：

```ts
type ID = string | number;
type ClickHandler = (event: MouseEvent) => void;
type StringMap = Record<string, string>;
```

#### ❌ interface 只能描述对象结构：

```ts
interface ID = string | number; // ❌ 报错
```

### 五、推荐使用场景

| 使用场景                                | 推荐用法                             |
| --------------------------------------- | ------------------------------------ |
| 定义对象结构                            | 优先用 `interface`（支持合并和继承） |
| 联合类型 / 函数 / 元组 / 映射等复杂类型 | 用 `type` 更灵活                     |
| 第三方库定义类型（如 React 的 props）   | 多用 `interface`                     |

### 六、总结对比表

| 特性                | `interface`  | `type` |
| ------------------- | ------------ | ------ |
| 定义对象结构        | ✅           | ✅     |
| 定义联合类型        | ❌           | ✅     |
| 定义元组 / 原始类型 | ❌           | ✅     |
| 继承扩展            | ✅ `extends` | ✅ `&` |
| 声明合并            | ✅           | ❌     |
| 使用复杂类型工具    | 一般 ❌      | ✅     |
