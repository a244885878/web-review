> 在移动端开发中，尤其是高分辨率屏幕，经常会遇到 1px 的边框、分割线等元素被渲染成 2px 甚至更粗的问题。这是因为移动设备的像素密度（Pixel Ratio）通常高于桌面设备，导致 CSS 中的 1px 在物理屏幕上对应多个像素。

#### 问题产生的原因

- 设备像素比（Pixel Ratio）： 高分辨率屏幕的像素密度更高，导致 CSS 中的 1px 在物理屏幕上对应多个像素。
- 浏览器渲染： 浏览器在渲染时，会根据设备的像素比对 CSS 像素进行缩放，从而导致 1px 变粗。

#### 解决方法

1. 使用物理像素单位
   - vw/vh: 相对于视口宽度的百分比和相对于视口高度的百分比。
   - vmin/vmax: 相对于视口宽度和高度中较小的值和较大的值的百分比。

```css
.line {
  height: 1vw; /* 根据视口宽度设置高度 */
  background-color: #000;
}
```

2. 媒体查询适配

根据不同的设备像素比，设置不同的样式。

```css
@media (min-device-pixel-ratio: 2) {
  .line {
    height: 0.5px;
  }
}
```

3.  使用 CSS3 的 transform 属性
    通过缩放来解决像素问题。

```css
.line {
  height: 1px;
  transform: scaleY(0.5); /* 缩放Y轴 */
}
```

4. 使用 CSS 预处理器（Sass/Less）

利用 CSS 预处理器提供的变量和函数，可以更方便地管理不同分辨率下的样式。

```css
$base-font-size: 16px;
$one-px: 1px / $base-font-size * 1rem;

.line {
  height: $one-px;
}
```

5. JavaScript 动态计算

通过 JavaScript 获取设备的像素比，动态计算 1px 对应的实际像素值。

```js
const dpr = window.devicePixelRatio;
const line = document.querySelector(".line");
line.style.height = `${1 / dpr}px`;
```

##### 总结

移动端 1px 渲染成 2px 问题是由于设备像素比和浏览器渲染机制导致的。通过合理使用 CSS 属性、媒体查询、SVG 等技术，可以有效解决这个问题，保证页面在不同设备上的显示效果。
