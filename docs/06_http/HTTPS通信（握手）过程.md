#### HTTPS 握手过程概述

> HTTPS（Hypertext Transfer Protocol Secure）是一种安全通信协议，在 HTTP 的基础上增加了 SSL/TLS 协议，为数据传输提供了安全保障。握手过程是 HTTPS 建立连接前双方进行的一系列交互，目的是为了建立一个安全、可靠的通信通道。

#### 握手过程详解

##### 1. 客户端发起连接请求：

- 客户端向服务器发起一个普通的 TCP 连接请求，建立 TCP 连接。
- 客户端向服务器发送一个 ClientHello 消息，包含：
  - 支持的协议版本（TLS1.2、TLS1.3 等）
  - 支持的加密套件（Cipher Suites）
  - 随机数（Client Random）

##### 2. 服务器响应：

- 服务器收到 ClientHello 消息后，会返回一个 ServerHello 消息，包含：
  - 选择的协议版本
  - 选择的加密套件
  - 随机数（Server Random）
  - 服务器证书（Certificate）
- 服务器证书包含了服务器的身份信息、公钥等。

##### 3. 客户端验证证书：

- 客户端收到服务器证书后，会验证证书的有效性。
  - 验证证书的颁发机构是否受信任
  - 验证证书是否在有效期内
  - 验证证书中的域名是否与服务器域名匹配
- 如果验证通过，客户端会生成一个 Premaster Secret。

##### 4. 客户端发送加密信息：

- 客户端使用服务器证书中的公钥加密 Premaster Secret，并将其发送给服务器。

##### 5. 双方生成会话密钥：

- 服务器使用自己的私钥解密 Premaster Secret，并结合双方生成的随机数，计算出 Session Key。
- 客户端也根据 Premaster Secret 和随机数计算出 Session Key。
- Session Key 将用于后续通信数据的加密和解密。

##### 6. 客户端发送 Finished 消息：

- 客户端使用 Session Key 对之前所有握手消息的摘要进行加密，生成 Finished 消息发送给服务器。

##### 7. 服务器发送 Finished 消息：

- 服务器也使用 Session Key 对之前所有握手消息的摘要进行加密，生成 Finished 消息发送给客户端。

##### 8. 握手完成：

- 双方收到对方的 Finished 消息后，表示握手过程完成，可以开始使用 Session Key 进行加密通信了。

#### 握手过程示意图

![](https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcQnaegY31GM1NoyoGVFKEaZcf5z8WM6upEiCt5TNjBI_t3jaPQ77c-pbqxG9iSl)

#### 总结

HTTPS 握手过程是一个复杂的过程，涉及到多个步骤和加密算法。通过握手过程，双方建立了一个安全的通信通道，确保数据在传输过程中不被窃听、篡改。
