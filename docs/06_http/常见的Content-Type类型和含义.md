> HTTP Content-Type 标头用于指定请求或响应主体的媒体类型。它告诉接收者如何解析数据。以下是一些常见的 Content-Type 类型及其含义：

#### 文本类型 (text)

- `text/plain`: 纯文本，没有任何格式。例如 `.txt` 文件。
- `text/html`: HTML 格式的文本，用于网页。
- `text/css`: CSS 样式表。
- `text/javascript` (或 `application/javascript`): JavaScript 代码。

#### 应用类型 (application)

- `application/json`: JSON (JavaScript Object Notation) 数据格式，常用于 API 数据交换。
- `application/xml`: XML (Extensible Markup Language) 数据格式，也用于数据交换和配置文件。
- `application/x-www-form-urlencoded`: 表单数据，通常在 HTML 表单提交时使用。数据被编码为键值对，键和值之间使用 = 分隔，键值对之间使用 `&` 分隔。例如：`name=John&age=30`。
- `application/octet-stream`: 任意的二进制数据流，用于下载文件。浏览器通常会提示用户保存文件。
- `application/pdf`: PDF (Portable Document Format) 文档。
- `application/zip`: ZIP 压缩文件。

#### 图像类型 (image)

- `image/jpeg` 或 `image/jpg`: JPEG 图像。
- `image/png`: PNG 图像。
- `image/gif`: GIF 图像。
- `image/svg+xml`: SVG (Scalable Vector Graphics) 矢量图。

#### 音频/视频类型 (audio/video)

- `audio/mpeg`: MP3 音频。
- `audio/ogg`: Ogg 音频。
- `video/mp4`: MP4 视频。
- `video/webm`: WebM 视频。

#### 多部分类型 (multipart)

- `multipart/form-data`: 用于表单文件上传。表单中的文件和其他字段一起传输。这是上传文件时常用的类型。
- `multipart/byteranges`: 用于表示部分请求的数据范围，通常用于断点续传。
- `multipart/mixed`: 用于发送多种不同类型的数据。
