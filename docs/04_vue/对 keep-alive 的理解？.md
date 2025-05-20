> `keep-alive` 是 Vue 内置的一个组件，用于缓存不活动的组件实例，而不是销毁它们。这在需要频繁切换组件，但又不希望每次都重新渲染组件的情况下非常有用，可以提升性能和用户体验。

#### 核心作用：

- **缓存组件实例**： 当组件被 `keep-alive` 包裹时，组件的状态会被保存在内存中，而不是被销毁。当再次切换到该组件时，会直接从缓存中取出，避免了重新创建和渲染的过程。
- **避免重复渲染**： 减少了不必要的 DOM 操作和组件生命周期钩子的执行，从而提高了性能。
- **保留组件状态**： 组件的状态（例如输入框的内容、滚动位置等）会被完整地保留下来，用户体验更佳。

#### 基本用法：

使用 `keep-alive` 非常简单，只需要将其包裹在需要缓存的组件外面即可。通常与 `<router-view>` 结合使用，缓存路由组件。

```html
<template>
  <keep-alive>
    <router-view></router-view>
  </keep-alive>
</template>
```

#### `include` 和 `exclude` 属性：

`keep-alive` 提供了 `include` 和 `exclude` 属性，用于指定需要缓存或不需要缓存的组件，匹配的是组件的`name`

- `include`：字符串或正则表达式，只有匹配的组件会被缓存。
- `exclude`：字符串或正则表达式，任何匹配的组件都不会被缓存。

```html
<template>
  <keep-alive include="ComponentA,ComponentB">
    <router-view></router-view>
  </keep-alive>
</template>
```

或使用动态绑定：

```html
<template>
  <keep-alive :include="includedComponents">
    <router-view></router-view>
  </keep-alive>
</template>

<script>
  export default {
    data() {
      return {
        includedComponents: ["ComponentA", "ComponentB"],
      };
    },
  };
</script>
```

#### 生命周期钩子：

被 `keep-alive` 缓存的组件会新增两个生命周期钩子：

- `activated`：组件被激活时调用。
- `deactivated`：组件被停用时调用。

当组件在 `keep-alive` 中切换时，`activated` 和 `deactivated` 会代替 `mounted` 和 `unmounted` 执行。

#### 使用场景：

- **频繁切换的标签页**： 例如电商网站的商品分类、后台管理系统的菜单等。
- **需要保留状态的表单**： 例如分步填写的表单，用户在填写过程中切换到其他页面，返回时可以继续填写。
- **需要缓存数据的列表**： 例如新闻列表、商品列表等，避免重复加载数据。

#### 注意事项：

- `keep-alive` 只能用于直接子组件使用了条件渲染的场景。如果组件是通过 `v-for` 渲染的，`keep-alive` 无法正常工作。
- 过度使用 `keep-alive` 可能会导致内存占用过高，需要根据实际情况进行权衡。
