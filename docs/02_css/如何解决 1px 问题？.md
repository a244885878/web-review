> 在移动端 Web 开发中，UI 设计稿中常常会有 1px 边框的设计。然而，在高清屏（如 Retina 屏）的设备上，如果直接使用 `border: 1px`，实际显示效果会比设计稿更粗，这就是经典的“1px 问题”。这是因为设备像素比（Device Pixel Ratio, DPR）的存在，导致 CSS 中的 1px 逻辑像素在高清屏上会被渲染成多个物理像素。

以下是几种常见的 CSS 解决 1px 问题的方法：

##### 1 . 使用 transform: scale() 缩放

这是目前比较推荐和常用的方法。其原理是利用伪元素（`::before` 或 `::after`）创建一个视觉上的边框，然后通过 `transform: scale()` 进行缩放。

```css
.border-1px {
  position: relative; /* 必须设置，为伪元素定位提供基准 */
}

.border-1px::after {
  content: "";
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 1px; /* 或根据需要调整 */
  background-color: #000; /* 边框颜色 */
  transform: scaleY(0.5); /* Y 轴方向缩放 0.5 倍 */
  transform-origin: 50% 100%; /* 设置缩放基点 */
}

/* 如果是上下左右都有边框，可以这样写 */
.border-all-1px::after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 200%;
  height: 200%;
  transform: scale(0.5);
  transform-origin: 0 0;
  box-sizing: border-box;
  border: 1px solid #000;
}
```

- **优点**： 兼容性好，效果清晰。
- **缺点**： 需要使用伪元素和定位，稍微复杂。如果需要四个方向的边框，代码会相对冗余。

##### 2. 使用 meta viewport 缩放（不推荐）

通过设置 `meta viewport` 的 `initial-scale` 属性来缩放页面，从而使 1px 逻辑像素对应更少的物理像素。

```html
<meta
  name="viewport"
  content="width=device-width, initial-scale=0.5, maximum-scale=0.5, minimum-scale=0.5, user-scalable=no"
/>
```

- **优点**： 简单。
- **缺点**： 会导致整个页面缩放，影响其他元素的显示效果，用户体验差，不推荐使用。

##### 3. 使用 box-shadow 模拟边框

使用 `box-shadow` 属性来模拟边框效果。

```css
.border-1px {
  box-shadow: 0 1px 0 0 #000; /* 下边框 */
}

/* 上下左右都有边框 */
.border-all-1px {
  box-shadow: 0 1px 0 0 #000, 1px 0 0 0 #000, 0 -1px 0 0 #000, -1px 0 0 0 #000;
}
```

- **优点**： 简单。
- **缺点**： 无法实现内边框，且在某些情况下效果可能不够清晰，特别是圆角边框。

##### 4. 使用 0.5px（部分浏览器支持）

一些现代浏览器开始支持 `0.5px` 的边框。可以直接写 `border: 0.5px solid #000`。

- **优点**： 最简单。
- **缺点**： 兼容性问题，并非所有浏览器都支持。

#### 总结

综合来看，使用 `transform: scale()` 配合伪元素是目前解决 `1px` 问题的最佳方案，兼容性好，效果清晰。在实际开发中，可以根据具体情况选择合适的解决方案。建议优先考虑使用 `transform: scale()` 的方法。
