> 在 HTML5 的 `<canvas>` 画布中，`width` 和 `height` 可以通过 HTML 属性 或 CSS 来设置，它们的作用不同，具体区别如下：

#### 1. HTML 属性设置宽高 (width 和 height 属性)

```html
<canvas id="myCanvas" width="500" height="300"></canvas>
```

##### 特点：

- 直接 定义画布的内部尺寸（像素大小），影响 Canvas 绘制的坐标系。
- 不会影响 CSS 样式，但会改变 Canvas 内部的像素密度。
- 如果不指定，默认值是 300px × 150px。

##### 影响：

- 画布的绘图坐标系是 500 × 300，如果绘制 ctx.fillRect(0, 0, 500, 300)，它会填满整个画布。
- 修改 width 和 height 属性会 清空整个 Canvas。

#### 2. CSS 方式设置宽高

```html
<canvas id="myCanvas" style="width: 500px; height: 300px;"></canvas>
```

##### 特点：

- 只是 改变 `Canvas` 在页面中的显示尺寸，不影响其内部绘图坐标系。
- 不会改变 `Canvas` 内部的像素密度，如果 `canvas` 仍然是 `300 × 150`，但 CSS 设为 `500px × 300px`，画布会被拉伸或缩小。

影响：

- 可能导致画布内容变形或模糊（因为内部像素没有变化，但外部显示尺寸改变了）。
- 适用于仅调整显示效果，而不影响绘图精度的情况。

#### 3. HTML 属性 vs. CSS 方式的区别

| 方式                       | 作用范围     | 是否影响绘图坐标系 | 是否影响像素密度 | 画布是否会清空 | 适用场景               |
| -------------------------- | ------------ | ------------------ | ---------------- | -------------- | ---------------------- |
| HTML 属性 (width / height) | 画布内部尺寸 | ✅ 是              | ✅ 影响          | ✅ 画布会清空  | 控制绘制精度、避免变形 |
| CSS 样式 (width / height)  | 画布显示尺寸 | ❌ 否              | ❌ 不影响        | ❌ 不清空      | 仅调整显示大小         |

#### 4. 最佳实践（避免模糊）

如果想要 高分辨率清晰显示，推荐 同时设置 `HTML` 宽高和 `CSS` 宽高，并按 设备像素比 (devicePixelRatio) 进行调整：

```html
<canvas id="myCanvas"></canvas>
<script>
  const canvas = document.getElementById("myCanvas");
  const ctx = canvas.getContext("2d");

  const dpr = window.devicePixelRatio || 1;
  const width = 500;
  const height = 300;

  // 设置 HTML 画布大小（内部像素尺寸）
  canvas.width = width * dpr;
  canvas.height = height * dpr;

  // 设置 CSS 尺寸，保持外观大小不变
  canvas.style.width = width + "px";
  canvas.style.height = height + "px";

  // 适配高分辨率绘制
  ctx.scale(dpr, dpr);
  ctx.fillRect(50, 50, 100, 100);
</script>
```

##### 原理：

- `canvas.width = width \* dpr`; → 增加像素密度，避免模糊
- `canvas.style.width = width + "px"`; → 让其在页面上显示正确大小
- `ctx.scale(dpr, dpr)`; → 让绘制内容适应高像素密度

这样，在 Retina 屏幕（如 Mac） 上，Canvas 内容会更加清晰！

#### 拓展

Canvas 提供了 `isPointInPath` 方法，用于判断一个点是否位于当前路径内。 在绘制图形后，可以使用该方法来检测点击位置。

```js
// 获取 canvas 元素和上下文
const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

// 绘制矩形
ctx.beginPath();
ctx.rect(50, 50, 100, 100);
ctx.fillStyle = "blue";
ctx.fill();

// 监听点击事件
canvas.addEventListener("click", (e) => {
  // 获取点击位置
  const rect = canvas.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  // 判断点击位置是否在矩形内
  if (ctx.isPointInPath(x, y)) {
    console.log("点击在矩形内");
  } else {
    console.log("点击在矩形外");
  }
});
```
