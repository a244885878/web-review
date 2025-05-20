#### 手写 AJAX 请求并解释原理

`AJAX`（Asynchronous JavaScript and XML）是一种用于在不重新加载整个页面的情况下与服务器通信的技术。它主要依赖于 `XMLHttpRequest`（XHR）或 `fetch API` 来进行异步数据请求。

#### 1. 使用 XMLHttpRequest 手写 AJAX 请求

```js
function ajax({ url, method = "GET", data = null, async = true }) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest(); // 创建 XHR 对象
    xhr.open(method, url, async); // 初始化请求

    xhr.setRequestHeader("Content-Type", "application/json"); // 设置请求头

    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        // 确保请求完成
        if (xhr.status >= 200 && xhr.status < 300) {
          resolve(JSON.parse(xhr.responseText)); // 解析响应数据
        } else {
          reject(new Error(`Request failed with status ${xhr.status}`));
        }
      }
    };

    xhr.onerror = function () {
      reject(new Error("Network error")); // 处理网络错误
    };

    xhr.send(data ? JSON.stringify(data) : null); // 发送请求
  });
}

// 使用示例
ajax({ url: "https://jsonplaceholder.typicode.com/posts/1" })
  .then((data) => console.log("成功：", data))
  .catch((error) => console.error("失败：", error));
```

#### 2. AJAX 原理解析

1. 创建 `XMLHttpRequest` 实例：使用 `new XMLHttpRequest()` 创建请求对象。
2. 初始化请求 (`open` 方法)：
   1. 指定请求方式（`GET`、`POST` 等）。
   2. 指定 URL 和是否异步执行（默认 `true`）。
3. 设置请求头（`setRequestHeader`）：常用于 `POST` 请求指定 `Content-Type`。
4. 监听 `readystatechange` 事件：
   1. `readyState` 变化：
      1. `0: UNSENT` (请求未初始化)
      2. `1: OPENED` (请求已打开)
      3. `2: HEADERS_RECEIVED` (已接收响应头)
      4. `3: LOADING` (正在接收数据)
      5. `4: DONE` (请求完成)
   2. `status` 判断请求是否成功（`200-299`）。
5. 发送请求（`send` 方法）：
   1. `GET` 请求：`send(null)`。
   2. `POST` 请求：`send(JSON.stringify(data))`。

#### 3. fetch API 实现 AJAX 请求（现代替代方案）

相比 `XMLHttpRequest`，`fetch API` 提供了更简洁的方式进行 `AJAX` 请求，并且返回的是 `Promise`。

```js
function fetchRequest(url, method = "GET", data = null) {
  return fetch(url, {
    method,
    headers: {
      "Content-Type": "application/json",
    },
    body: data ? JSON.stringify(data) : null,
  }).then((response) => {
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json(); // 解析 JSON 数据
  });
}

// 使用示例
fetchRequest("https://jsonplaceholder.typicode.com/posts/1")
  .then((data) => console.log("成功：", data))
  .catch((error) => console.error("失败：", error));
```

#### 4. XMLHttpRequest vs fetch

| 对比项             | XMLHttpRequest         | fetch API                 |
| ------------------ | ---------------------- | ------------------------- |
| 语法复杂度         | 复杂，需要回调函数处理 | 更简洁，返回 `Promise`    |
| `Promise` 支持     | 不支持，需要封装       | 原生支持 `Promise`        |
| `async/await` 支持 | 需要封装 `Promise`     | 直接支持                  |
| `onprogress` 支持  | 支持                   | 需要使用 `ReadableStream` |
| 错误处理           | `onerror` 事件监听     | 需要 `catch` 处理         |

#### 推荐：

- 如果需要进度监听，使用 `XMLHttpRequest`。
- 如果代码简洁优雅，使用 `fetch API`。
