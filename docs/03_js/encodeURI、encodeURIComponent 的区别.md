> 在 JavaScript 中，`encodeURI` 和 `encodeURIComponent` 都是用于编码 URI (Uniform Resource Identifier) 的函数，但它们之间存在重要的区别，尤其是在编码范围和使用场景上。理解这些区别对于编写安全可靠的 Web 应用程序至关重要。

#### 1. encodeURI()

- 用于编码整个 URI： `encodeURI()` 用于编码整个 URI，它会将 URI 中除了以下字符之外的所有字符都进行编码：
- ASCII 字母和数字
- `-`、`_`、`.`、`!`、`~`、`*`、`'`、`(`、`)`
- `;`、`/`、`?`、`:`、`@`、`&`、`=`、`+`、`$`、`,`

* 不会编码 URI 的保留字符： 重要的是，`encodeURI()` 不会对 URI 的保留字符（例如 `/`、`?`、`:`、`#`）进行编码，这些字符在 URI 中具有特殊含义。
* 适用场景： 当你需要编码整个 URI，并且希望保留 URI 的结构（例如 URL 中的路径和查询参数）时，应使用 `encodeURI()`。

#### 2. encodeURIComponent()

- 用于编码 URI 的组成部分： `encodeURIComponent()` 用于编码 URI 的组成部分，例如查询参数的值。它比 `encodeURI()` 更加严格，会将除了以下字符之外的所有字符都进行编码：

* ASCII 字母和数字
* `-`、`_`、`.`、`!`、`~`、`*`、`'`、`(`、`)`

* 会编码 URI 的保留字符： `encodeURIComponent()` 会编码所有 URI 的保留字符，包括 `/`、`?`、`:`、`#` 等。

适用场景： 当你需要编码 URI 中的某个部分，例如查询参数的值，并且需要确保该部分不包含任何可能干扰 URI 解析的字符时，应使用 `encodeURIComponent()`。

#### 总结和选择

| 函数                   | 编码范围                                  | 是否编码 URI 保留字符 | 适用场景                              |
| ---------------------- | ----------------------------------------- | --------------------- | ------------------------------------- |
| `encodeURI()`          | 除了 URI 保留字符和一些常用符号之外的字符 | 否                    | 编码整个 URI，保留 URI 结构           |
| `encodeURIComponent()` | 除了少数常用符号之外的所有字符            | 是                    | 编码 URI 的组成部分，例如查询参数的值 |

#### 最佳实践

- 根据需要选择 `encodeURI()` 或 `encodeURIComponent()`： 如果需要编码整个 URI，使用 `encodeURI()`。如果需要编码 URI 的某个部分（例如查询参数），使用 `encodeURIComponent()`。

* 编码查询参数的值： 当构建包含查询参数的 URL 时，始终使用 `encodeURIComponent()` 编码参数的值，以避免特殊字符干扰 URL 解析。

#### 示例

```js
const uri =
  "https://www.example.com/path?param1=value with spaces&param2=other value/";

const encodedURI = encodeURI(uri);
console.log("Encoded URI:", encodedURI);
// Output: Encoded URI: https://www.example.com/path?param1=value%20with%20spaces&param2=other%20value/

const encodedURIComponent = encodeURIComponent(uri);
console.log("Encoded URI Component:", encodedURIComponent);
// Output: Encoded URI Component: https%3A%2F%2Fwww.example.com%2Fpath%3Fparam1%3Dvalue%20with%20spaces%26param2%3Dother%20value%2F

const paramValue = "value with / and ?";
const encodedParamValue = encodeURIComponent(paramValue);
console.log("Encoded Parameter Value:", encodedParamValue);
// Output: Encoded Parameter Value: value%20with%20%2F%20and%20%3F
```
