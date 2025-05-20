在 Vue 中保存页面当前状态的方法有很多种，主要可以分为以下几类：

#### 1. 使用 `<keep-alive>` 组件：

这是 Vue 内置的一个抽象组件，用于缓存不活动的组件实例，而不是销毁它们。当组件在 `<keep-alive>` 内切换时，它的状态会被保留。

- 优点： 使用简单，适用于简单的页面缓存场景。
- 缺点： 只能缓存组件实例，不能持久化存储数据，页面刷新后状态会丢失。

```html
<template>
  <keep-alive>
    <router-view v-if="$route.meta.keepAlive"></router-view>
  </keep-alive>
  <router-view v-if="!$route.meta.keepAlive"></router-view>
</template>

<script>
  export default {
    // ...
  };
</script>
```

在路由配置中，通过 `meta` 字段设置是否需要缓存：

```js
const routes = [
  {
    path: "/page1",
    component: Page1,
    meta: { keepAlive: true }, // 需要缓存
  },
  {
    path: "/page2",
    component: Page2,
    meta: { keepAlive: false }, // 不需要缓存
  },
];
```

#### 2. 使用本地存储（LocalStorage 或 SessionStorage）：

将页面状态数据存储在浏览器的本地存储中，页面重新加载后从本地存储中读取并恢复状态。

- 优点： 可以持久化存储数据，页面刷新后状态不会丢失。
- 缺点： 存储容量有限，不适合存储大量数据；需要手动管理数据的存储和读取。

使用方法：

在组件的生命周期钩子函数中进行数据的存储和读取：

```html
<script>
  export default {
    data() {
      return {
        count: 0,
      };
    },
    mounted() {
      // 从本地存储中读取数据
      const storedCount = localStorage.getItem("count");
      if (storedCount) {
        this.count = parseInt(storedCount);
      }
    },
    beforeUnmount() {
      // 将数据存储到本地存储中
      localStorage.setItem("count", this.count);
    },
    // ...
  };
</script>
```

#### 3. 使用 Vuex 或 Pinia 等状态管理库：

将页面状态存储在全局的状态管理库中，页面切换或刷新后可以通过状态管理库恢复状态。

- 优点： 适用于复杂的应用场景，可以更好地管理应用的状态。
- 缺点： 需要引入额外的库，增加了应用的复杂性。

使用方法：

以 Vuex 为例：

```js
// store.js
import Vuex from "vuex";

export default new Vuex.Store({
  state: {
    count: 0,
  },
  mutations: {
    setCount(state, count) {
      state.count = count;
    },
  },
});
```

在组件中使用：

```html
<template>
  <div>
    <p>Count: {{ $store.state.count }}</p>
    <button @click="$store.commit('setCount', $store.state.count + 1)">
      Increment
    </button>
  </div>
</template>
```

#### 4. 使用路由参数或查询参数：

将页面状态信息编码到 URL 中，通过路由参数或查询参数传递和保存状态。

- 优点： 简单直接，适用于简单的状态传递。
- 缺点： 不适合存储复杂的数据结构；URL 长度有限制。

使用方法：

```js
// 路由跳转
this.$router.push({ path: "/page", query: { count: this.count } });

// 在组件中获取参数
this.$route.query.count;
```

#### 总结：

选择哪种方法取决于具体的应用场景和需求。

- 对于简单的页面缓存，可以使用 `<keep-alive>`。
- 对于需要持久化存储少量数据的场景，可以使用本地存储。
- 对于复杂的应用和需要集中管理状态的场景，可以使用状态管理库。
- 对于简单的状态传递，可以使用路由参数或查询参数。
