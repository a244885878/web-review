#### hash 路由

```js
/* 
    hash 模式
    核心通过监听url中的hash来进行路由跳转
  */

// 定义Router
class Router {
  constructor() {
    this.routes = {}; //存放路由path以及callback
    this.currentUrl = "";

    // 监听路由change调用相对应的路由回调
    window.addEventListener("load", this.refresh);
    window.addEventListener("hashchange", this.refresh);
  }

  route(path, callback) {
    this.routes[path] = callback;
  }

  push(path) {
    // 改变hash并执行回调
    window.location.hash = `#${path}`;
    this.routes[path] && this.routes[path]();
  }
}

Router.prototype.refresh = () => {
  console.log("刷新");
};

// 使用 router
window.router = new Router();
router.route("/", () => {
  console.log("path:/");
});

router.route("/page2", () => {
  console.log("path:page2");
});

router.push("/");
router.push("/page2");
```

#### history 路由

```js
/* 
    history模式
    history 模式核心借用 HTML5 history api，api 提供了丰富的 router 相关属性先了解一个几个相关的api
      history.pushState 浏览器历史纪录添加记录
      history.replaceState修改浏览器历史纪录中当前纪录
      history.popState 当 history 发生变化时触发

    ps:history路由模式需要服务器做重定向，否则会在线上出现页面跳转刷新404的情况
  */

// 定义 Router
class Router {
  constructor() {
    this.routes = {};
    this.listerPopState();
  }

  init(path) {
    history.replaceState({ path }, null, path);
    this.routes[path] && this.routes[path]();
  }

  route(path, callback) {
    this.routes[path] = callback;
  }

  push(path) {
    // 改变url
    history.pushState({ path }, null, path);
    this.routes[path] && this.routes[path]();
  }

  listerPopState() {
    window.addEventListener("popstate", (e) => {
      const path = e.state && e.state.path;
      this.routers[path] && this.routers[path]();
    });
  }
}

// 使用 Router
window.miniRouter = new Router();
miniRouter.route("/", () => console.log("page1"));
miniRouter.route("/page2", () => console.log("page2"));

miniRouter.push("/");
miniRouter.push("/page2");
```
