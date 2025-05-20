#### 实现思路

##### 1. 封装对话框组件

先编写一个对话框组件，包含标题、内容、按钮（确认、取消）等，内部控制显示/隐藏以及事件的触发。

##### 2. 动态挂载组件实例

- 在 Vue2 中可利用 `Vue.extend` 创建组件构造器，再通过 `new` 生成实例，调用 `$mount` 挂载到新创建的 DOM 节点上，并添加到 `document.body` 上。
- 在 Vue3 中则利用 `createVNode` 和 `render`（均从 vue 包中引入）来动态创建 VNode，然后挂载到一个 DOM 容器中。

##### 3. 全局方法挂载

将创建实例、显示对话框的逻辑封装为一个函数，并分别挂载到 Vue 原型（Vue2）或 app.config.globalProperties（Vue3）上，从而在任意组件中可以直接调用，例如 `this.$dialog(options)`。

##### 4. 关闭逻辑

对话框在点击确认或取消时，调用传入的回调函数，同时执行卸载（在 Vue3 中调用 render(null, container) 并移除 DOM，在 Vue2 中可设置 visible 为 false 并销毁实例）来清理 DOM。

#### Vue2 实现示例

##### 1. 编写对话框组件（Dialog.vue）

```html
<template>
  <div class="dialog" v-if="visible">
    <div class="dialog-overlay" @click="handleClose"></div>
    <div class="dialog-content">
      <h3>{{ title }}</h3>
      <p>{{ message }}</p>
      <button @click="handleConfirm">确定</button>
      <button @click="handleClose">取消</button>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Dialog",
    props: {
      title: {
        type: String,
        default: "提示",
      },
      message: {
        type: String,
        default: "",
      },
      visible: {
        type: Boolean,
        default: false,
      },
    },
    methods: {
      handleConfirm() {
        this.$emit("confirm");
        this.handleClose();
      },
      handleClose() {
        this.$emit("close");
      },
    },
  };
</script>

<style scoped>
  .dialog {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 9999;
  }
  .dialog-overlay {
    position: absolute;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
  }
  .dialog-content {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: #fff;
    padding: 20px;
  }
</style>
```

##### 2. 封装全局对话框调用逻辑（dialog.js）

```js
import Vue from "vue";
import Dialog from "./Dialog.vue";

// 利用 Vue.extend 创建构造器
const DialogConstructor = Vue.extend(Dialog);
let instance = null;

const DialogService = function (options) {
  // 若已有实例，可更新 props 后显示
  if (!instance) {
    instance = new DialogConstructor({
      el: document.createElement("div"),
      propsData: {
        title: options.title || "提示",
        message: options.message || "",
        visible: true,
      },
    });
    document.body.appendChild(instance.$el);
    // 监听关闭事件
    instance.$on("close", () => {
      instance.visible = false;
      // 可选择在动画结束后销毁实例
      // instance.$destroy();
    });
    instance.$on("confirm", () => {
      if (typeof options.onConfirm === "function") {
        options.onConfirm();
      }
    });
  } else {
    // 更新数据后显示对话框
    instance.title = options.title || "提示";
    instance.message = options.message || "";
    instance.visible = true;
  }
};

export default DialogService;
```

##### 3. 全局挂载（main.js）

```js
import Vue from "vue";
import App from "./App.vue";
import DialogService from "./dialog.js";

Vue.config.productionTip = false;
Vue.prototype.$dialog = DialogService;

new Vue({
  render: (h) => h(App),
}).$mount("#app");
```

使用时，在任一组件中可调用：

```js
this.$dialog({
  title: "删除确认",
  message: "确定删除该项吗？",
  onConfirm: () => {
    // 处理确认逻辑
  },
});
```

#### Vue3 实现示例

##### 1. 编写对话框组件（Dialog.vue）

```html
<template>
  <div class="dialog" v-if="modelValue">
    <div class="dialog-overlay" @click="handleClose"></div>
    <div class="dialog-content">
      <h3>{{ title }}</h3>
      <p>{{ message }}</p>
      <button @click="handleConfirm">确定</button>
      <button @click="handleClose">取消</button>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { defineProps, defineEmits } from "vue";
  const props = defineProps({
    title: { type: String, default: "提示" },
    message: { type: String, default: "" },
    modelValue: { type: Boolean, default: false },
  });
  const emits = defineEmits(["update:modelValue", "confirm"]);

  const handleConfirm = () => {
    emits("confirm");
    emits("update:modelValue", false);
  };
  const handleClose = () => {
    emits("update:modelValue", false);
  };
</script>

<style scoped>
  .dialog {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 9999;
  }
  .dialog-overlay {
    position: absolute;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
  }
  .dialog-content {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: #fff;
    padding: 20px;
  }
</style>
```

##### 2. 封装全局对话框调用逻辑（dialogService.js）

```js
import { createVNode, render } from "vue";
import Dialog from "./Dialog.vue";

const openDialog = (options = {}) => {
  // 创建一个容器节点
  const container = document.createElement("div");
  document.body.appendChild(container);

  // 定义 props，modelValue 初始为 true
  const props = {
    title: options.title || "提示",
    message: options.message || "",
    modelValue: true,
    "onUpdate:modelValue": (value) => {
      if (!value) {
        // 关闭时卸载组件并移除容器
        render(null, container);
        document.body.removeChild(container);
      }
    },
    onConfirm: () => {
      if (typeof options.onConfirm === "function") {
        options.onConfirm();
      }
    },
  };

  // 创建 vnode 并渲染
  const vnode = createVNode(Dialog, props);
  render(vnode, container);
};

export default openDialog;
```

##### 3. 全局挂载（main.js）

```js
import { createApp } from "vue";
import App from "./App.vue";
import openDialog from "./dialogService.js";

const app = createApp(App);
// 将 openDialog 挂载到全局属性上
app.config.globalProperties.$dialog = openDialog;

app.mount("#app");
```

使用时，在组件中可这样调用：

```js
this.$dialog({
  title: "删除确认",
  message: "确定删除该项吗？",
  onConfirm: () => {
    // 处理确认逻辑
  },
});
```

这种方式将组件动态挂载到 body 下，避免了局部引入和样式干扰问题，参考了 “vue3 全局弹窗组件 (结合 createVNode 与 render)” 的实现思路

#### 总结

- Vue2 实现：通过 `Vue.extend` 创建单例组件实例，并挂载到动态创建的 DOM 节点上，再通过 Vue 原型（`Vue.prototype.$dialog`）注册全局方法。
- Vue3 实现：利用 `createVNode` 和 `render` 方法动态创建 `VNode` 及挂载，同时利用全局属性（`app.config.globalProperties`）进行注册；利用 `onUpdate:modelValue` 回调实现组件关闭后卸载。
