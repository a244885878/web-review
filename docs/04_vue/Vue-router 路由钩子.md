> 路由钩子 是 Vue Router 提供的一种机制，允许我们在路由导航的过程中执行一些自定义操作。这些操作可以发生在导航发生前、导航发生时或导航完成之后。

生命周期 则是 Vue 组件从创建到销毁过程中经历的一系列过程，每个阶段都会触发对应的钩子函数，让我们有机会在这些阶段执行特定的逻辑。

两者结合 起来，我们可以更精细地控制组件的行为，实现诸如：

- **导航守卫**: 在路由跳转前、跳转时或跳转后进行权限校验、数据获取等操作。
- **组件复用**: 在组件被缓存或复用时执行特定的逻辑。
- **异步数据获取**: 在组件即将渲染前获取异步数据。

#### 路由钩子在生命周期中的体现

1. 全局守卫
   1. **beforeEach**: 路由跳转前执行，可以用来做全局的权限校验、页面初始化等。
   2. **afterEach**: 路由跳转后执行，可以用来做一些全局的统计或操作。

这些全局守卫并不属于某个组件的生命周期，而是针对所有的路由跳转。

2. 路由组件守卫
   1. **beforeRouteEnter**: 在路由组件被渲染前调用，此时组件实例还未被创建，不能访问 `this`。
   2. **beforeRouteUpdate**: 当当前路由改变，并且该组件被复用时调用。
   3. **beforeRouteLeave**: 导航离开该组件时调用。

这些守卫与组件的生命周期紧密相关，可以在组件内部对路由跳转进行控制。

```js
// router/index.js
import Vue from "vue";
import Router from "vue-router";
import Home from "./components/Home.vue";

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: "/",
      name: "Home",
      component: Home,
      meta: { requiresAuth: true }, // 添加 meta 信息用于权限校验
    },
  ],
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    // 判断是否需要登录
    if (!auth.isAuthenticated()) {
      next({
        path: "/login",
        query: { redirect: to.fullPath },
      });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
```

```html
// components/Home.vue
<template>
  <div>
    <h1>Home</h1>
  </div>
</template>

<script>
  export default {
    beforeRouteEnter(to, from, next) {
      // 在组件被渲染前获取数据
      axios.get("/api/data").then((response) => {
        next((vm) => {
          vm.data = response.data;
        });
      });
    },
  };
</script>
```

#### 总结

Vue-router 的路由钩子与 Vue 组件的生命周期相互配合，提供了强大的路由控制能力。通过合理利用这些钩子，我们可以实现更复杂的单页面应用。

- **全局守卫**: 用于处理全局性的路由跳转逻辑，例如权限校验、页面初始化等。
- **路由组件守卫**: 用于控制组件内部的路由跳转行为，例如获取异步数据、组件复用等。

#### 注意:

- 异步导航: 在使用 `next` 函数时，可以传入一个回调函数来获取组件实例，以便在组件渲染完成后执行一些操作。
- 组件复用: `beforeRouteUpdate` 钩子在组件被复用时调用，可以用于更新组件数据。
- 导航取消: 如果在路由守卫中调用 `next(false)`，则导航会被取消。
