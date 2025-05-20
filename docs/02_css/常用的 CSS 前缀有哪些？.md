### CSS 前缀：浏览器兼容性的一道坎

> CSS 前缀是不同浏览器厂商为了在 CSS 标准正式制定之前，实现一些新的 CSS 特性而引入的。它们通常加在 CSS 属性名前面，以标识该属性是某个特定浏览器所支持的。

#### 为什么需要 CSS 前缀？

- CSS 标准化进程缓慢： 浏览器厂商为了抢占市场，往往会提前实现一些 CSS 特性，但由于标准尚未统一，因此需要加上前缀来区分。
- 浏览器内核不同： 不同的浏览器内核对 CSS 的解析方式也不同，因此需要不同的前缀来适配。

#### 常用的 CSS 前缀

- -webkit-： 适用于 Safari、Chrome、Opera 等基于 WebKit 内核的浏览器。
- -moz-： 适用于 Firefox 浏览器。
- -ms-： 适用于 IE 浏览器。
- -o-： 适用于早期版本的 Opera 浏览器。

```css
/* 设置元素的圆角 */
.element {
  -webkit-border-radius: 10px; /* Safari 和 Chrome */
  -moz-border-radius: 10px; /* Firefox */
  -ms-border-radius: 10px; /* IE */
  border-radius: 10px; /* 标准写法 */
}
```

#### 为什么现在越来越少使用 CSS 前缀了？

- CSS 标准化进程加速： 随着 W3C 标准的不断完善，越来越多的 CSS 特性得到了广泛支持，浏览器厂商也更加重视标准的兼容性。
- Autoprefixer 工具： Autoprefixer 是一款能够自动添加和删除 CSS 前缀的工具，大大减轻了开发者手动添加前缀的工作量。
- 浏览器兼容性越来越好： 现代浏览器对 CSS 的支持越来越全面，很多 CSS 特性已经不需要添加前缀了。
