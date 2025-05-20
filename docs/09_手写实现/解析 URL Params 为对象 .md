#### 方法一：利用 URLSearchParams 与 Object.fromEntries

在现代浏览器中，可以直接利用内置的 `URLSearchParams` 对象来解析 URL 中的查询字符串，然后用 `Object.fromEntries` 将键值对转换为对象。例如：

```js
function getUrlParams(url) {
  // 创建 URL 对象，自动解析 URL 各个部分
  const urlObj = new URL(url);
  // 获取 URL 中的查询参数部分（URLSearchParams 对象）
  const params = urlObj.searchParams;
  // 将参数转换为对象
  return Object.fromEntries(params);
}

// 示例
const url = "https://api.github.com/users/fengyehong123?name=jiafeitian&age=28";
console.log(getUrlParams(url));
// 输出：{ name: "jiafeitian", age: "28" }
```

这种方法代码简洁，且能正确处理 URL 解码（例如 %E5%8C%97%E4%BA%AC 会被转换为 “北京”）【

#### 方法二：手动拆分字符串

对于兼容性要求较高或需要对重复键做特殊处理的情况，可以手动对查询字符串进行拆分。下面是一个通用的实现，支持：

- 对参数进行 decodeURIComponent 解码；
- 没有 = 的参数默认设置为 true；
- 重复出现的 key 会被转换为数组保存多个值。

```js
function parseQueryString(url) {
  // 取得 ? 后面的字符串
  const queryString = url.split("?")[1] || "";
  // 以 & 分割为各个参数项
  const pairs = queryString.split("&");
  const result = {};

  pairs.forEach((pair) => {
    if (!pair) return; // 忽略空字符串
    let [key, value] = pair.split("=");
    key = decodeURIComponent(key);
    // 如果没有 value，默认设置为 true
    value = value !== undefined ? decodeURIComponent(value) : true;

    // 如果该 key 已存在，则转换成数组保存所有值
    if (result.hasOwnProperty(key)) {
      if (Array.isArray(result[key])) {
        result[key].push(value);
      } else {
        result[key] = [result[key], value];
      }
    } else {
      result[key] = value;
    }
  });

  return result;
}

// 示例
const url2 =
  "http://www.domain.com/?user=anonymous&id=123&id=456&city=%E5%8C%97%E4%BA%AC&enabled";
console.log(parseQueryString(url2));
/* 输出：
{
  user: "anonymous",
  id: ["123", "456"],
  city: "北京",
  enabled: true
}
*/
```

这种方法利用字符串的 split 方法和 forEach 循环，清晰地展示了解析过程
