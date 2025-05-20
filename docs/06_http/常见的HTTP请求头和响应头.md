> HTTP 头部字段是在 HTTP 请求和响应消息中传递的名称/值对。它们允许客户端和服务器传递有关请求或响应的附加信息。

#### HTTP 请求头

HTTP 请求头用于向服务器提供有关客户端、请求的附加信息。以下是一些常见的 HTTP 请求头：

- `Accept`：客户端能够处理的 MIME 类型列表。
  - 示例：`Accept: text/html, application/json`
- `Accept-Encoding`：客户端能够处理的编码类型列表。
  - 示例：`Accept-Encoding: gzip, deflate`
- `Authorization`：包含客户端的身份验证凭据。
  - 示例：`Authorization: Bearer <token>`
- `Cache-Control`：指定缓存指令。
  - 示例：`Cache-Control: no-cache`
- `Connection`：指定连接选项，例如是否保持连接。
  - 示例：`Connection: keep-alive`
- `Content-Length`：请求主体的长度（以字节为单位）。
  - 示例：`Content-Length: 1024`
- `Content-Type`：请求主体的 `MIME` 类型。
  - 示例：`Content-Type: application/json`
- `Cookie`：包含存储在客户端的 `HTTP Cookie`。
  - 示例：`Cookie: name=value`
- `Host`：服务器的主机名和端口号。
  - 示例：`Host: example.com`
- `User-Agent`：客户端的标识字符串。
  - 示例：`User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36`

#### HTTP 响应头

HTTP 响应头用于向客户端提供有关响应的附加信息。以下是一些常见的 HTTP 响应头：

- `Access-Control-Allow-Origin`：指定允许访问资源的来源。
  - 示例：`Access-Control-Allow-Origin: \*`
- `Cache-Control`：指定缓存指令。
  - 示例：`Cache-Control: public, max-age=3600`
- `Connection`：指定连接选项，例如是否保持连接。
  - 示例：`Connection: close`
- `Content-Encoding`：响应主体的编码类型。
  - 示例：`Content-Encoding: gzip`
- `Content-Length`：响应主体的长度（以字节为单位）。
  - 示例：`Content-Length: 1024`
- `Content-Type`：响应主体的 MIME 类型。
  - 示例：`Content-Type: application/json`
- `Date`：响应的日期和时间。
  - 示例：`Date: Tue, 15 Nov 2022 12:34:56 GMT`
- `ETag`：资源的实体标签。
  - 示例：`ETag: "1234567890"`
- `Expires`：资源过期的日期和时间。
  - 示例：`Expires: Thu, 01 Dec 2022 00:00:00 GMT`
- `Last-Modified`：资源上次修改的日期和时间。
  - 示例：`Last-Modified: Mon, 14 Nov 2022 12:34:56 GMT`
- `Location`：重定向 URI。
  - 示例：`Location: /new-page`
- `Set-Cookie`：设置存储在客户端的 HTTP Cookie。
  - 示例：`Set-Cookie: name=value; expires=Thu, 01 Dec 2022 00:00:00 GMT; path=/`
- `Status`：包含响应的 HTTP 状态代码和原因短语。
  - 示例：`HTTP/1.1 200 OK`
- `Transfer-Encoding`：指定用于传输主体的编码类型。
  - 示例：`Transfer-Encoding: chunked`
- `Vary`：指定用于选择适当的缓存响应的请求头。
  - 示例：`Vary: Accept-Encoding`
- `WWW-Authenticate`：指定客户端进行身份验证所需的身份验证方案。
  - 示例：`WWW-Authenticate: Basic realm="example.com"`
