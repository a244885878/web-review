以下是使用 Nuxt3 开发 SSR 项目的详细流程，以及服务端渲染与客户端代码的区分说明：

#### 一、Nuxt3 SSR 项目开发流程

##### 1. 创建项目

```bash
npx nuxi init <project-name>
cd <project-name>
npm install
```

##### 2. 目录结构

```bash
├── pages/          # 页面组件（自动生成路由）
├── components/     # 可复用的 Vue 组件
├── public/         # 静态资源（直接暴露）
├── server/         # 服务端 API/中间件
├── composables/    # 可复用的逻辑（组合式 API）
├── nuxt.config.ts  # 配置文件
```

##### 3. 配置 SSR

Nuxt3 默认开启 SSR，如需关闭需显式配置：

```ts
// nuxt.config.ts
export default defineNuxtConfig({
  ssr: true, // 默认值，无需修改
});
```

##### 4. 创建页面

```html
<!-- pages/index.vue -->
<template>
  <div>
    <h1>{{ message }}</h1>
    <p>客户端时间: {{ clientTime }}</p>
  </div>
</template>

<script setup>
  // 服务端数据获取
  const { data: message } = await useFetch("/api/hello");

  // 客户端代码
  const clientTime = ref("");
  onMounted(() => {
    clientTime.value = new Date().toLocaleString();
  });
</script>
```

##### 5. 创建服务端 API

```ts
// server/api/hello.ts
export default defineEventHandler((event) => {
  return { message: "Hello from SSR!" };
});
```

##### 6. 运行项目

```bash
npm run dev
```

访问 `http://localhost:3000` 查看 SSR 效果。

##### 7. 构建与部署

```bash
npm run build
npm run preview # 本地预览生产环境
```

部署到支持 Node.js 的服务器（如 AWS EC2、Vercel 等）。

#### 二、服务端渲染代码（Server-Side）

##### 1. 标识位置

- `server/` 目录：所有服务端 API、中间件。
- 页面/组件的 `asyncData` 或 `useFetch`：在服务端预获取数据。
- `onServerPrefetch` 生命周期钩子：服务端数据预取。

##### 2. 典型场景

```html
<script setup>
  // 服务端执行（SSR 阶段）
  const { data } = await useAsyncData('key', () => {
    return $fetch('/api/data')
  })

  // 服务端获取后注入 HTML
</script>
```

##### 3. 服务端 API 示例

```ts
// server/api/user/[id].ts
export default defineEventHandler(async (event) => {
  const id = event.context.params.id;
  const user = await fetchUserFromDatabase(id); // 访问数据库
  return user;
});
```

#### 三、客户端代码（Client-Side）

##### 1. 标识位置

- `onMounted`/`onUpdated` 生命周期钩子：仅在客户端执行。
- 浏览器 API（`window`/`document`）：需在客户端使用。
- 交互事件（点击/滚动等）：客户端处理。

##### 2. 典型场景

```html
<script setup>
  const count = ref(0);

  // 客户端执行
  onMounted(() => {
    console.log("Mounted in browser!");
  });

  const handleClick = () => {
    count.value++; // 客户端交互
  };
</script>
```

#### 四、SSR 与 CSR 代码的混合处理

##### 1. 条件判断环境

```js
if (process.client) {
  // 仅在客户端执行
  const token = localStorage.getItem("token");
}

if (process.server) {
  // 仅在服务端执行
  const cookies = parseCookies(event);
}
```

##### 2. 动态导入客户端库

```js
// 避免服务端加载浏览器库
const heavyLibrary = process.client
  ? await import("heavy-browser-library")
  : null;
```

#### 五、核心区别总结

| 特性         | 服务端渲染 (SSR)       | 客户端渲染 (CSR)         |
| ------------ | ---------------------- | ------------------------ |
| 执行环境     | Node.js 服务器         | 浏览器                   |
| 数据获取     | 直接访问数据库/API     | 通过 AJAX/Fetch 调用 API |
| SEO 支持     | ✅ 完整 HTML 内容      | ❌ 初始 HTML 为空        |
| 生命周期钩子 | `onServerPrefetch`     | `onMounted`/`onUpdated`  |
| 典型用途     | 首屏渲染、SEO 关键页面 | 交互逻辑、私有页面       |

#### 其他

nuxt3 还有一些勾子函数，可以动态设置每个页面的标题、meta 标签等等，用于增强 seo 优化
