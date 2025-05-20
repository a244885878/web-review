CSS 属性可以分为可继承属性和不可继承属性。理解这些属性对于高效编写 CSS 代码至关重要。

#### 什么是可继承属性？

> 可继承属性是指父元素的某些样式属性值可以被子元素继承。这意味着，如果你在父元素上设置了某个可继承属性，那么该元素的所有后代元素（子元素、孙元素等）都会自动应用相同的样式，除非它们自身也设置了该属性。

#### 什么是不可继承属性？

> 不可继承属性是指父元素的样式属性值不会被子元素继承。如果想让子元素拥有相同的样式，需要在子元素上单独设置。

#### 常见的可继承属性

以下是一些常见的可继承属性：

- 字体属性：
  - font-family：字体系列
  - font-size：字体大小
  - font-style：字体样式（例如斜体）
  - font-weight：字体粗细
  - font：复合属性，可以一次设置多个字体属性
- 文本属性：
  - color：文本颜色
  - text-align：文本对齐方式
  - text-indent：文本缩进
  - line-height：行高
  - letter-spacing：字母间距
  - word-spacing：单词间距
  - white-space：处理空白符的方式
- 列表属性：
  - list-style：列表样式（包括 list-style-type、list-style-image、list-style-position）
- 其他属性：
  - visibility：元素可见性
  - direction：文本方向
  - cursor：鼠标光标样式

#### 常见的不可继承属性

- 盒子模型属性：
  - width：元素宽度
  - height：元素高度
  - margin：外边距
  - padding：内边距
  - border：边框
- 背景属性：
  - background：背景（包括 background-color、background-image、background-position 等）
- 定位属性：
  - position：定位方式
  - top、right、bottom、left：定位偏移
  - z-index：堆叠顺序
- 浮动属性：
  - float：浮动
- 显示属性：
  - display：元素显示方式
- 文本修饰属性：
  - vertical-align：垂直对齐方式
  - text-decoration：文本装饰（例如下划线）
- 表格属性：大多数表格属性都是不可继承的。

#### 使用继承的优点

- 减少代码量：通过在父元素上设置样式，避免在每个子元素上重复设置相同的样式。
- 提高代码维护性：修改父元素的样式，所有继承该样式的子元素都会自动更新。

#### 使用继承的注意事项

- 并非所有属性都可继承：需要清楚哪些属性是可继承的，哪些是不可继承的。
- 继承具有层叠性：子元素可以覆盖从父元素继承的样式。
- 使用 `inherit` 关键字：可以使用 `inherit` 关键字显式地指定一个属性从父元素继承值。例如：`color: inherit`;
