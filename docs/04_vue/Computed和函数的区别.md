> `computed`（计算属性）和函数（`methods`）在 Vue 中都用于处理数据并返回结果，但它们之间存在一些关键的区别，主要体现在以下几个方面：

#### 1. 缓存机制：

- `computed`： 具有缓存机制。只有当依赖的响应式数据发生变化时，`computed` 才会重新计算。如果依赖的数据没有变化，则会直接从缓存中读取结果，避免重复计算，提高性能。这是 `computed` 最重要的特性之一。
- 函数`（methods）`： 每次调用函数时都会执行函数体内的代码，无论依赖的数据是否发生变化。这意味着如果频繁调用一个复杂的函数，即使数据没有变化，也会重复执行，造成性能浪费。

```html
<template>
  <div>
    <p>计数器：{{ counter }}</p>
    <p>计算属性结果：{{ computedValue }}</p>
    <p>函数计算结果：{{ methodValue }}</p>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        counter: 0,
      };
    },
    computed: {
      computedValue() {
        console.log("computedValue 被调用"); // 只有 counter 变化时才会输出
        return this.counter * 2;
      },
    },
    methods: {
      methodValue() {
        console.log("methodValue 被调用"); // 每次调用都会输出
        return this.counter * 2;
      },
    },
    mounted() {
      setInterval(() => {
        this.counter++;
      }, 1000);
    },
  };
</script>
```

> 在这个例子中，每秒 `counter` 的值会递增。你会发现 `computedValue` 的输出频率明显低于 `methodValue`，因为 `computedValue` 只在 `counter` 变化时重新计算，而 `methodValue` 每次调用都会执行。

#### 2. 调用方式：

- `computed`： 以属性的形式访问，不需要加括号。例如：`{{ computedValue }}`。
- 函数（`methods`）： 以函数调用的形式访问，需要加括号。例如：`{{ methodValue }}`。

#### 3. 适用场景：

- `computed`： 适用于需要基于现有数据计算出一个新的数据，并且需要在模板中频繁使用这个新数据的情况。由于其缓存特性，可以有效地提高性能。例如：过滤列表、格式化日期、计算总价等。
- 函数（`methods`）： 适用于需要执行一些特定的操作，例如事件处理、异步请求、复杂的逻辑处理等。如果不需要缓存，或者需要传递参数，则应该使用函数。

#### 4. 是否可以设置值：

- `computed`： 默认情况下，`computed` 只能读取值（`getter`）。但也可以通过定义 `setter` 方法来实现可读写。
- 函数（`methods`）： 可以执行任意操作，包括修改数据。

#### 总结：

| 特性     | `computed`                                 | 函数（`methods`）                         |
| -------- | ------------------------------------------ | ----------------------------------------- |
| 缓存     | 有缓存，依赖数据变化时才重新计算           | 无缓存，每次调用都执行                    |
| 调用方式 | 以属性形式访问（`{{ computedValue }}`）    | 以函数调用形式访问（`{{ methodValue }}）` |
| 适用场景 | 计算衍生数据，模板中频繁使用，需要提高性能 | 执行特定操作，事件处理，异步请求等        |
| 是否可写 | 默认只读，可定义 `setter` 实现可写         | 可以执行任意操作，包括修改数据            |

总而言之，如果需要在模板中显示一个基于其他数据计算得出的值，并且希望提高性能，那么应该优先使用 `computed`。如果需要执行一些特定的操作，或者需要传递参数，那么应该使用函数。
