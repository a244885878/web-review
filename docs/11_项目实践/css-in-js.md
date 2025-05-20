> CSS-in-JS 是一种将 CSS 样式与 JavaScript 代码结合的技术，常见的库包括 Styled Components 和 Emotion。

#### 特点：

- 样式隔离： 每个组件的样式都是局部的，避免了全局样式冲突。
- 动态样式： 可以根据组件的 props 或 state 动态计算样式。
- JavaScript 集成： 样式与组件逻辑紧密结合，方便维护和理解。

#### 使用示例：

以下是使用 Styled Components 创建一个按钮组件的示例：

```js
import styled from "styled-components";

const Button = styled.button`
  background-color: ${(props) => (props.primary ? "blue" : "gray")};
  color: white;
  padding: 10px 20px;
  border-radius: 5px;
  border: none;
  cursor: pointer;

  &:hover {
    background-color: ${(props) => (props.primary ? "darkblue" : "darkgray")};
  }
`;

function App() {
  return <Button primary>Click Me</Button>;
}
```

#### 在这个示例中，Button 组件的样式根据 primary prop 动态变化。

##### 比较：

- 开发体验： Tailwind CSS 通过实用工具类提供快速的样式构建，而 CSS-in-JS 通过将样式与组件逻辑结合，提供更高的封装性和动态样式能力。
- 性能： Tailwind CSS 通过 PurgeCSS 等工具优化生产环境的 CSS 文件大小，而 CSS-in-JS 可能在运行时引入额外的性能开销。
- 可维护性： CSS-in-JS 提供了更强的样式隔离和动态样式能力，适合复杂的组件和动态样式需求。
