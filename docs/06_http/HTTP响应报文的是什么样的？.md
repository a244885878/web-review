HTTP 响应报文通常包含以下几个部分：

#### 1. 状态行 (Status Line)： 包含了 HTTP 协议版本、状态码和状态码对应的说明。 例如：

```
HTTP/1.1 200 OK
```

- HTTP/1.1：表示使用的 HTTP 版本。
- 200：状态码，表示请求成功。
- OK：状态码的描述信息。

#### 2. 响应头 (Response Headers)： 包含了一些关于服务器、响应内容等的描述信息，每个头部字段由键值对组成。例如：

```
Content-Type: text/html; charset=UTF-8
Content-Length: 1234
Server: Apache/2.4.41 (Ubuntu)
```

- Content-Type：响应体的内容类型（如 text/html）。
- Content-Length：响应体的长度，单位为字节。
- Server：服务器信息。

#### 3. 空行 (Blank Line)： 在响应头和响应体之间有一个空行，用来分隔响应头和响应体。

#### 4. 响应体 (Response Body)： 实际返回的内容数据。例如网页的 HTML 内容、图片、JSON 数据等。如果响应没有内容（例如 204 No Content 状态码），则没有响应体。

例如：

```
<html>
  <head><title>Example</title></head>
  <body><h1>Hello, World!</h1></body>
</html>
```

#### 例子：

完整的 HTTP 响应报文示例如下：

```
HTTP/1.1 200 OK
Content-Type: text/html; charset=UTF-8
Content-Length: 1256
Server: Apache/2.4.41 (Ubuntu)

<html>
  <head><title>Example</title></head>
  <body><h1>Hello, World!</h1></body>
</html>
```

#### 常见的状态码分类：

- 1xx（信息性状态码）：表示请求已被接受，需要继续处理。
- 2xx（成功状态码）：表示请求已成功处理。
  - `200 OK`：请求成功。
  - `201 Created`：请求成功并创建了新的资源。
  - `204 No Content`：请求成功，但没有返回任何内容。
- 3xx（重定向状态码）：表示需要客户端采取进一步的操作才能完成请求。
  - `301 Moved Permanently`：请求的资源已永久移动到新的位置。
  - `302 Found`：请求的资源临时移动到新的位置。
  - `304 Not Modified`：客户端的缓存版本是最新的，无需重新获取。
- 4xx（客户端错误状态码）：表示客户端发送的请求有错误。
  - `400 Bad Request`：请求无效。
  - `401 Unauthorized`：需要身份验证。
  - `403 Forbidden`：服务器拒绝请求。
  - `404 Not Found`：请求的资源不存在。
- 5xx（服务器错误状态码）：表示服务器在处理请求时发生了错误。
  - `500 Internal Server Error`：服务器内部错误。
  - `502 Bad Gateway`：作为网关或代理的服务器从上游服务器收到无效响应。
  - `503 Service Unavailable`：服务器暂时无法处理请求。
