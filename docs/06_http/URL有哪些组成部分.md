> URL（Uniform Resource Locator，统一资源定位符）通常由以下几个组成部分构成：

1. 协议（Scheme）：
   1. 定义了如何访问资源的方式。例如，`http://`, `https://`, `ftp://` 等。
   2. 例如：`https://` 表示使用 HTTPS 协议访问资源。
2. 域名或 IP 地址（Host）：
   1. 表示要访问的服务器地址。可以是域名（如 `www.example.com`）或 IP 地址（如 `192.168.1.1`）。
   2. 例如：`www.example.com`。
3. 端口号（Port）：
   1. 可选部分，用于指定访问资源的端口。如果省略，默认使用协议的标准端口（HTTP 默认端口 `80`，HTTPS 默认端口 `443`）。
   2. 例如：`http://www.example.com:8080`。
4. 路径（Path）：
   1. 表示服务器上资源的具体位置。通常用于指定文件或目录。
   2. 例如：`/path/to/resource`。
5. 查询字符串（Query String）：
   1. 可选部分，用于传递附加参数，通常以 `?` 开始，参数通过 `&` 分隔。
   2. 例如：`?id=123&name=example`。
6. 片段标识符/哈希（Fragment）：
   1. 可选部分，表示资源中的某个特定位置。通常以 `#` 开始。
   2. 例如：`#section1`。

#### 例子：

```bash
https://www.example.com:8080/path/to/resource?id=123&name=example#section1
```

- 协议：`https`
- 域名：`www.example.com`
- 端口：`8080`
- 路径：`/path/to/resource`
- 查询字符串：`?id=123&name=example`
- 片段标识符：`#section1`
