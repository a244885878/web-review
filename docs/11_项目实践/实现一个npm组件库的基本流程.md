#### 项目内

1. 公共的组件放在 `/src/components`下
2. 公共的方法可以放在 `/src/utils`下
3. 在`/src`目录创建一个 `index.js` 文件用来暴露公共的方法和组件

#### 打包配置

在`package.json`文件中配置打包成`lib`的命令，目录指向统一暴露的文件

```bash
"build-lib": "vue-cli-service build --target lib --dest lib src/index.js",
```

指定当前库的版本号

```bash
"version": "0.1.0"
```

执行`build-lib`命令后会生成一个`lib`文件夹，配置该项目的入口

```bash
"main": "lib/star-common.umd.min.js"
```

指定 npm 包能拉取的文件配置(如果需要暴露整个项目可以不配置)

```bash
"files": [
  "lib/",
  "README.md"
],
```

#### 发布 npm

1. 注册 npm 账号
2. 配置 npm 源
   为避免使用淘宝镜像（通常不支持发包），建议将 registry 设置为官方地址：

```bash
npm config set registry https://registry.npmjs.org
```

3. 登录 npm

```bash
npm login
```

或者

```bash
npm adduser
```

根据提示输入用户名、密码和邮箱即可。

4. 发布包
   发布前请再次确认 package.json 中的各项配置无误，然后执行：

```bash
npm publish
```

5. 更新包
   每次修改代码后，如果需要更新发布的版本，必须修改 package.json 中的 version 字段。建议遵循语义化版本管理规则：

- patch：修复小 bug（最后一位数字递增）
- minor：新增向下兼容的功能（中间位递增）
- major：大改动，不向下兼容（首位数字递增）
  可通过命令更新版本，例如：

```bash
npm version patch
```

更新版本后，再执行 `npm publish` 即可。

##### 配置私有仓库地址

- 全局设置
  如果你希望所有 npm 操作（安装、发布等）都使用你的私有仓库，可以在终端中执行：

```bash
npm config set registry http://your-private-registry-address
```

- 项目级配置
  如果只想针对某个项目使用私有仓库，可以在项目根目录下创建（或编辑）一个 `.npmrc` 文件，内容写入：

```bash
registry=http://your-private-registry-address
```

- 登录私有仓库
  在配置好私有仓库地址后，需要登录才能进行发布。执行下面的命令并输入你的用户名、密码和邮箱：

```bash
npm login --registry=http://your-private-registry-address
```

最后还是`npm publish`发布即可

#### 其他项目使用该 npm 包

##### 安装

```bash
npm install <npm name>
```

##### 引入

在`main.js`引入打包后的 css 文件

```js
import "star-common/lib/star-common.css";
```

在需要引入组件或方法的地方引入

```js
import { commonMixins, NewMultipleSelect, CascaderCheckAll } from "xxx";
```

#### 如何调试未发布的 npm 包

在开发过程中，调试尚未发布的 npm 包是常见需求。以下是两种常用的方法：

##### 1. 使用 npm link：

`npm link` 允许你在本地开发的 npm 包与其他项目之间建立符号链接，方便调试。

##### 步骤：

1. 在 npm 包项目中：
   1. 进入包的根目录。
   2. 执行 `npm link`，将包链接到全局 `node_modules`。
2. 在目标项目中：
   1. 进入项目根目录。
   2. 执行 `npm link <包名>`，将全局链接的包链接到项目的 `node_modules`。
3. 在项目中使用该包：
   1. 正常引入并使用该包。

##### 注意事项：

- 使用 `npm link` 时，确保全局和项目的 `node_modules` 中没有同名的包，以避免冲突。
- 在调试完成后，使用 `npm unlink` 解除链接。

#### 2. 使用 yalc：

`yalc` 是一个本地包管理工具，允许你在本地发布和管理 npm 包，避免了 `npm link` 的一些潜在问题。

##### 全局安装 yalc：

```bash
npm install -g yalc
```

##### 在 npm 包项目中：

- 进入包的根目录。
- 执行 `yalc publish`，将包发布到本地存储库。

##### 在目标项目中：

- 进入项目根目录。
- 执行 `yalc add <包名>`，将本地包添加到项目的 `node_modules`。

##### 在项目中使用该包：

正常引入并使用该包。

##### 注意事项：

- 使用 `yalc` 时，包的版本号应与目标项目的依赖版本一致。
- 在调试完成后，使用 `yalc remove <包名>` 解除依赖。
