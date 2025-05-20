> HTTP 请求报文是客户端（例如浏览器）发送给服务器的请求信息。它以文本形式发送，由多行数据构成。HTTP 请求报文的结构主要包括以下几个部分：

#### 1. 请求行（Request Line）

请求行是报文的第一行，包含三个部分，以空格分隔：

- 请求方法（Method）：指定客户端希望服务器执行的动作。常见的请求方法有：
  - `GET`：请求获取指定资源。
  - `POST`：向服务器提交数据，通常用于提交表单或上传文件。
  - `PUT`：上传资源，通常用于更新或创建资源。
  - `DELETE`：请求服务器删除指定资源。
  - `HEAD`：类似于 `GET`，但只请求响应头，不包含响应体。
  - `OPTIONS`：请求服务器支持的通信选项。
  - `CONNECT`：建立到由目标资源标识的服务器的隧道。
  - `TRACE`：沿着到目标资源的路径执行消息环回测试。
- 请求 URI（Request URI）：指定请求的资源地址。
- HTTP 协议版本（HTTP Version）：指定使用的 HTTP 协议版本，例如 `HTTP/1.1` 或 `HTTP/2`。

#### 2. 请求头部（Request Headers）

请求头部提供关于请求的附加信息，以键值对的形式存在，每行一个头部字段，格式为 `Header-Name: Header-Value`。常见的请求头部字段有：

- `Host`：指定服务器的主机名和端口号。
- `User-Agent`：客户端的浏览器信息。
- `Accept`：客户端可以接收的响应内容类型。
- `Accept-Language`：客户端可以接收的语言。
- `Accept-Encoding`：客户端可以接收的编码方式。
- `Connection`：连接方式，例如 `keep-alive` 表示保持连接。
- `Cookie`：客户端存储的 Cookie 信息。
- `Content-Type`：请求体的 MIME 类型，用于 `POST` 或 `PUT` 请求。
- `Content-Length`：请求体的长度。
- `Referer`：表示请求的来源页面。

##### 例如：

```
Host: www.example.com
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) ...
Accept: text/html,application/xhtml+xml,...
```

#### 3. 空行（Empty Line）

请求头部之后是一个空行，用于分隔头部和请求体。

#### 4. 请求体（Request Body）

请求体包含要发送给服务器的数据，例如表单数据或上传的文件内容。只有 `POST`、`PUT` 等请求方法才包含请求体。

例如，一个 `POST` 请求的请求体可能包含以下表单数据：

```
name=John&age=30
```

#### 一个完整的 HTTP 请求报文示例：

```
POST /submit HTTP/1.1
Host: www.example.com
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) ...
Content-Type: application/x-www-form-urlencoded
Content-Length: 18

name=John&age=30
```

#### 总结

HTTP 请求报文是客户端与服务器通信的基础，理解其结构对于进行 Web 开发和调试非常重要。通过分析请求报文，可以了解客户端的请求意图和发送的数据，从而更好地进行服务器端处理。
