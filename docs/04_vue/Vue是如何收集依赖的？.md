#### 什么是依赖收集？

在 Vue 中，当我们使用模板语法（如 `{{ message }}`）或者计算属性时，Vue 会自动追踪哪些模板或计算属性依赖了哪些数据。这个追踪的过程就是依赖收集。一旦被依赖的数据发生变化，Vue 就能精准地找到并更新相关的视图。

#### 依赖收集的过程

1. 数据劫持：
   1. Vue 在初始化数据时，会对数据的每个属性使用 `Object.defineProperty` 进行劫持，为每个属性添加 getter 和 setter。
   2. 当我们访问一个属性时，触发 getter，此时会创建一个 Dep 实例（依赖收集器），并把当前执行的 Watcher（观察者）添加到 Dep 的订阅者列表中。
   3. 当我们修改一个属性时，触发 setter，Dep 会通知所有订阅者，触发视图更新。
2. Watcher：
   1. Watcher 是一个观察者，它会订阅一个或多个属性。
   2. 当订阅的属性发生变化时，Watcher 会收到通知，并执行相应的回调函数，从而触发视图更新。
   3. Vue 中有三种类型的 Watcher：
      1. 渲染 Watcher：用于跟踪模板中的数据变化，触发组件的重新渲染。
      2. 计算属性 Watcher：用于计算属性的依赖收集和更新。
      3. 侦听器 Watcher：用于监听某个事件，触发回调函数。
3. Dep：
   1. Dep 是一个依赖收集器，它负责收集依赖这个属性的所有 Watcher。
   2. 当属性的值发生变化时，Dep 会通知所有订阅者。

```html
<template>
  <div>{{ message }}</div>
</template>

<script>
  export default {
    data() {
      return {
        message: "Hello, Vue!",
      };
    },
  };
</script>
```

当组件初始化时，Vue 会：

1. 劫持 `message` 属性。
2. 创建一个渲染 Watcher，用于跟踪模板中 `{{ message }}` 的变化。
3. 当渲染 Watcher 访问 `message` 时，会触发 getter，将自己添加到 `message` 属性对应的 Dep 的订阅者列表中。
4. 当 `message` 的值发生变化时，Dep 会通知渲染 Watcher，触发组件的重新渲染。

#### 总结

Vue 的依赖收集机制，通过数据劫持、Watcher 和 Dep 的协作，实现了高效的响应式系统。当数据发生变化时，Vue 能精准地定位到需要更新的视图，从而保证数据和视图的一致性。
