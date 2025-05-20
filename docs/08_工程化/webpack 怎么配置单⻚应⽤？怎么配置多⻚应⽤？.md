#### 单页应用（SPA）配置

SPA 通常只有一个 HTML 文件，通过 JavaScript 动态地切换页面内容。Webpack 配置 SPA 的关键在于正确设置入口（entry）和输出（output）。

##### 1. 安装依赖

首先，确保你的项目安装了 Webpack 和相关插件：

```bash
npm install --save-dev webpack webpack-cli html-webpack-plugin
```

##### 2. 创建 Webpack 配置文件

在项目根目录下创建 `webpack.config.js` 文件：

```js
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "development", // 设置为开发模式
  entry: "./src/index.js", // 入口文件
  output: {
    filename: "bundle.js", // 输出文件名
    path: path.resolve(__dirname, "dist"), // 输出路径
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html", // HTML 模板文件
    }),
  ],
};
```

##### 3. 配置说明

- `entry`: 指定应用的入口文件，Webpack 从这里开始解析依赖关系。
- `output`: 配置输出文件的名称和路径。
- `plugins`: 使用 HtmlWebpackPlugin 自动生成 HTML 文件，并引入打包后的 JavaScript 文件。

##### 4. 运行 Webpack

在 `package.json` 中添加脚本：

```json
"scripts": {
  "build": "webpack"
}
```

##### 5. 然后运行：

```bash
npm run build
```

Webpack 将会打包你的代码，并在 `dist` 目录下生成 `bundle.js` 和 `index.html` 文件。

#### 多页应用（MPA）配置

MPA 包含多个 HTML 文件，每个文件对应一个页面。Webpack 配置 MPA 的关键在于设置多个入口和输出。

##### 1. 安装依赖

与 SPA 相同，确保安装了 Webpack 和相关插件。

##### 2. 创建 Webpack 配置文件

在项目根目录下创建 `webpack.config.js` 文件：

```js
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "development",
  entry: {
    page1: "./src/page1/index.js", // 页面1 的入口
    page2: "./src/page2/index.js", // 页面 2 的入口
  },
  output: {
    filename: "[name].bundle.js", // 输出文件名，使用 [name] 占位符
    path: path.resolve(__dirname, "dist"),
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/page1/index.html", // 页面 1 的 HTML 模板
      filename: "page1.html", // 输出 HTML 文件名
      chunks: ["page1"], // 指定要引入的 chunk
    }),
    new HtmlWebpackPlugin({
      template: "./src/page2/index.html", // 页面 2 的 HTML 模板
      filename: "page2.html",
      chunks: ["page2"],
    }),
  ],
};
```

##### 3. 配置说明

- `entry`: 使用对象形式定义多个入口，键为页面名称，值为入口文件路径。
- `output`: 使用 `[name]` 占位符，确保每个页面生成不同的 JavaScript 文件。
- `plugins`: 为每个页面创建一个 `HtmlWebpackPlugin` 实例，指定不同的模板文件和输出文件名，并使用 `chunks` 属性指定要引入的 JavaScript 文件。

##### 4. 运行 Webpack

与 SPA 相同，在 `package.json` 中添加脚本，然后运行 `npm run build`。

Webpack 将会为每个页面生成对应的 JavaScript 文件和 HTML 文件。

#### 总结

无论是 SPA 还是 MPA，Webpack 都可以帮助你有效地管理和打包你的代码。关键在于理解入口、输出和插件的配置，并根据你的项目需求进行调整。
