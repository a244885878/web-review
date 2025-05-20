### 什么是 position: sticky;？

`position: sticky`; 可以被认为是 `position: relative`; 和 `position: fixed`; 的混合体。元素在容器中“粘滞”地定位。起初，它像 `position: relative`; 一样正常地在文档流中定位。然后，当元素滚动到特定阈值时（例如，滚动到顶部），它会“粘住”并像 `position: fixed`; 一样固定在那个位置。

#### 如何使用 position: sticky;？

要使元素具有粘性定位，需要执行以下操作：

1. 设置 `position: sticky`;： 将元素的 `position` 属性设置为 `sticky`。
2. 定义粘滞的阈值： 使用 `top、bottom、left` 或 `right` 属性来指定元素应该在何时“粘住”。例如，`top: 0`; 表示当元素顶部到达视口顶部时粘住。

```html
<!DOCTYPE html>
<html>
  <head>
    <style>
      body {
        height: 200vh; /* 使页面可滚动 */
      }

      .sticky {
        position: sticky;
        top: 0; /* 当元素顶部到达视口顶部时粘住 */
        background-color: lightblue;
        padding: 10px;
      }

      .content {
        padding: 20px;
      }
    </style>
  </head>
  <body>
    <div class="sticky">我是粘性元素</div>

    <div class="content">
      <p>这是一些内容。</p>
      <p>这是一些内容。</p>
      <p>这是一些内容。</p>
      <p>这是一些内容。</p>
      <p>这是一些内容。</p>
      <p>这是一些内容。</p>
      <p>这是一些内容。</p>
      <p>这是一些内容。</p>
      <p>这是一些内容。</p>
      <p>这是一些内容。</p>
      <p>这是一些内容。</p>
      <p>这是一些内容。</p>
      <p>这是一些内容。</p>
      <p>这是一些内容。</p>
    </div>
  </body>
</html>
```

在这个例子中，当滚动页面时，“我是粘性元素”这个 div 会一直保持在其正常位置，直到其顶部到达视口顶部。然后，它会粘在顶部并保持固定，直到页面滚动到它原来的位置以下。

#### 关键点和注意事项：

- **父元素的高度**： 粘性元素的父元素高度必须足够大，才能使元素可以滚动到粘滞点。如果父元素的高度小于粘性元素的高度，粘性定位将不起作用。
- **overflow** 属性： 如果父元素或任何祖先元素设置了 `overflow: hidden、overflow: scroll` 或 `overflow: auto`，则粘性定位可能无法正常工作。这是因为 `overflow` 会创建一个新的包含块，影响粘性元素的定位上下文。
- `z-index`： 你可以使用 `z-index` 属性来控制粘性元素与其他元素的堆叠顺序。
- **浏览器兼容性**： `position: sticky`; 在现代浏览器中得到了很好的支持，但在一些旧版本浏览器中可能不兼容。可以使用前缀 `-webkit-sticky` 来提高兼容性，但现在通常不再需要。

#### 与其他定位方式的比较：

- `position: relative`;： 粘性定位在初始状态下类似于相对定位，但它会在滚动到阈值时变为固定定位。
- `position: fixed`;： 固定定位始终相对于视口固定，而粘性定位只在滚动到阈值时才固定。

#### 使用场景：

`position: sticky`; 常用于以下场景：

- 导航栏：使导航栏在滚动时始终保持在页面顶部。
- 侧边栏：使侧边栏在滚动时部分或完全保持可见。
- 表格标题：使表格标题在滚动时始终可见。
