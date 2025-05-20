> OPTIONS 请求方法是 HTTP 协议中用于获取服务器支持的通信选项的一种方法。它允许客户端在不实际访问资源的情况下，探测服务器的性能和特性，尤其在跨域请求中扮演着重要的角色。

#### OPTIONS 请求方法的主要用途：

1. 获取服务器支持的 HTTP 请求方法： 客户端可以使用 OPTIONS 请求来查询服务器允许对特定资源使用的 HTTP 方法（例如 GET、POST、PUT、DELETE 等）。这对于构建 RESTful API 非常有用，客户端可以根据服务器的响应来决定如何与资源进行交互。
2. 跨域资源共享 (CORS) 的预检请求： 当浏览器发起跨域请求（即请求的域名、协议或端口与当前页面不同）时，如果请求满足某些条件（例如使用了 PUT、DELETE 等方法，或者 Content-Type 不是 application/x-www-form-urlencoded、multipart/form-data 或 text/plain），浏览器会首先发送一个 OPTIONS 请求到服务器，以确定服务器是否允许该跨域请求。这个 OPTIONS 请求被称为“预检请求”。
3. 检查服务器的性能： OPTIONS 请求也可以用来简单地检查服务器是否可用和响应速度。

#### OPTIONS 请求的工作方式：

客户端发送一个 OPTIONS 请求到服务器，请求头中可以包含一些信息，例如 `Access-Control-Request-Method`（请求的方法）、`Access-Control-Request-Headers`（请求头）。服务器收到请求后，会返回一个 HTTP 响应，其中包含 `Access-Control-Allow-Origin`（允许的源）、`Access-Control-Allow-Methods`（允许的方法）、`Access-Control-Allow-Headers`（允许的头部）等头部信息。

#### OPTIONS 请求的使用场景：

- 跨域请求： 这是 OPTIONS 请求最常见的用途。通过预检请求，浏览器可以确保跨域请求的安全性，避免潜在的安全风险。
- API 探索： 客户端可以使用 OPTIONS 请求来动态地发现 API 提供的功能，例如支持哪些 HTTP 方法、接受哪些请求头等。
- 服务器监控： 可以使用 OPTIONS 请求来定期检查服务器的可用性和性能。

#### 举例说明 CORS 中的 OPTIONS 请求：

假设一个网页位于 `http://example.com`，它需要向 `http://api.example.net` 发送一个 POST 请求，并且 Content-Type 为 `application/json`。由于这是跨域请求，浏览器会首先发送一个 OPTIONS 请求到 `http://api.example.net`，请求头中包含：

- `Origin: http://example.com`
- `Access-Control-Request-Method: POST`
- `Access-Control-Request-Headers: Content-Type`

如果服务器 `http://api.example.net` 允许该跨域请求，它会返回一个包含以下头部信息的响应：

- `Access-Control-Allow-Origin: http://example.com`
- `Access-Control-Allow-Methods: POST`
- `Access-Control-Allow-Headers: Content-Type`

浏览器收到服务器的响应后，如果发现服务器允许该跨域请求，才会继续发送实际的 POST 请求。否则，浏览器会阻止该请求，并报错。

#### 总结：

OPTIONS 请求方法是 HTTP 协议中一个重要的组成部分，它主要用于获取服务器的通信选项，尤其在跨域请求中起到了关键作用。通过预检请求，OPTIONS 方法可以提高 Web 应用的安全性，并允许客户端动态地发现 API 的功能。
