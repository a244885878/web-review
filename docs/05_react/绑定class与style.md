#### 绑定 Class

##### 直接绑定

```js
<div className="active">Hello World</div>
```

##### 动态绑定

```js
const isActive = true;

<div className={isActive ? "active" : ""}>Hello World</div>;
```

##### 使用 classnames 库

```js
import classNames from "classnames";

const isActive = true;
const hasError = false;

<div className={classNames("active", { error: hasError })}>Hello World</div>;
```

#### 绑定 Style

##### 内联样式

```js
<div style={{ color: "red", fontSize: "20px" }}>Hello World</div>
```

##### 动态绑定

```js
const color = "red";

<div style={{ color }}>Hello World</div>;
```

##### 使用变量

```js
const styles = {
  color: "red",
  fontSize: "20px",
};

<div style={styles}>Hello World</div>;
```

#### 最佳实践

- 使用 classnames 库可以更方便地管理多个 class。
- 尽量使用 CSS Modules 或 styled-components 来管理样式，避免内联样式。
- 动态绑定 class 和 style 时，尽量使用三元运算符或条件语句，保持代码简洁。
