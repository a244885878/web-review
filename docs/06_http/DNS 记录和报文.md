> DNS 记录和报文是域名系统（DNS）中两个密切相关的概念，但它们代表不同的东西。简单来说：

- DNS 记录 是存储在 DNS 服务器上的数据条目，包含了域名和 IP 地址之间的映射关系以及其他相关信息。
- DNS 报文 是客户端和 DNS 服务器之间传递的通信消息，用于查询和响应 DNS 记录。

#### 1. DNS 记录（DNS Records）

DNS 记录也称为资源记录（Resource Records），它们存储在 DNS 服务器的区域文件中。每条记录都包含有关特定域的信息，例如其 IP 地址、邮件服务器等。常见的 DNS 记录类型包括：

- A 记录（Address Record）：将域名映射到 IPv4 地址。例如，example.com 的 A 记录可能指向 `192.0.2.1`。
- AAAA 记录（Quad-A Record）：将域名映射到 IPv6 地址。例如，example.com 的 AAAA 记录可能指向 `2001:db8::1`。
- CNAME 记录（Canonical Name Record）：将一个域名或子域名指向另一个域名（别名）。例如，www.example.com 的 CNAME 记录可能指向 example.com。
- MX 记录（Mail Exchange Record）：指定负责接收域的电子邮件的邮件服务器。
- NS 记录（Name Server Record）：指定负责域的 DNS 解析的权威 DNS 服务器。

#### 2. DNS 报文（DNS Messages）

DNS 报文是客户端（例如你的计算机）和 DNS 服务器之间交换的数据包。这些报文用于查询 DNS 记录并将响应返回给客户端。DNS 报文通常使用 UDP 协议进行传输，但也可能使用 TCP 协议。

##### DNS 报文主要分为两种类型：

- DNS 查询报文（DNS Query Message）：客户端发送给 DNS 服务器以请求特定域名的信息的报文。查询报文包含要查询的域名和记录类型等信息。
- DNS 响应报文（DNS Response Message）：DNS 服务器响应客户端查询的报文。响应报文包含查询结果，例如域名对应的 IP 地址或其他相关信息。

##### DNS 报文的结构通常包括以下部分：

- 头部（Header）：包含报文类型、ID、标志等信息。
- 问题段（Question Section）：包含查询的问题，例如要查询的域名和记录类型。
- 答案段（Answer Section）：包含查询的答案，例如域名对应的 IP 地址。
- 授权记录段（Authority Section）：包含授权 DNS 服务器的信息。
- 附加信息段（Additional Section）：包含其他附加信息。

#### 总结

DNS 记录是存储在 DNS 服务器上的数据，而 DNS 报文是客户端和 DNS 服务器之间传递的通信消息。它们共同协作，使得用户可以通过域名访问互联网资源。
