# 🧩 WebSocket 实现 IM 聊天（含心跳与重连）

## ✅ 功能列表

- 基础 IM 聊天（广播）
- 客户端心跳检测
- 服务端心跳响应 & 掉线检测
- 客户端自动重连（指数退避）

---

## 📦 服务端代码（Node.js + TypeScript）

> 安装依赖：

```bash
npm install ws
```

> server.ts：

```ts
import { WebSocketServer } from "ws";

const wss = new WebSocketServer({ port: 8080 });

interface ExtendedWebSocket extends WebSocket {
  isAlive: boolean;
}

wss.on("connection", (ws: ExtendedWebSocket) => {
  ws.isAlive = true;

  console.log("客户端已连接");

  ws.on("pong", () => {
    ws.isAlive = true;
  });

  ws.on("message", (msg) => {
    const message = msg.toString();
    console.log("收到消息:", message);

    if (message === "ping") {
      ws.send("pong");
      return;
    }

    // 广播给其他客户端
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN && client !== ws) {
        client.send(message);
      }
    });
  });

  ws.on("close", () => {
    console.log("客户端断开连接");
  });
});

// 心跳检查机制（每 30 秒检测）
setInterval(() => {
  wss.clients.forEach((client: any) => {
    if (!client.isAlive) {
      console.log("心跳超时，断开连接");
      return client.terminate();
    }
    client.isAlive = false;
    client.ping();
  });
}, 30000);

console.log("WebSocket 服务已启动，监听端口 8080");
```

#### 🌐 前端代码（HTML + JS）

> index.html：

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>WebSocket IM 聊天</title>
  </head>
  <body>
    <h2>聊天窗口</h2>
    <input id="msgInput" placeholder="输入消息..." />
    <button onclick="sendMessage()">发送</button>
    <ul id="chatBox"></ul>

    <script>
      let ws;
      let heartbeatInterval;
      let reconnectAttempts = 0;
      const MAX_RECONNECT = 5;

      function connect() {
        ws = new WebSocket("ws://localhost:8080");

        ws.onopen = () => {
          console.log("✅ 连接成功");
          startHeartbeat();
          reconnectAttempts = 0;
        };

        ws.onmessage = (e) => {
          if (e.data === "pong") {
            console.log("💓 收到心跳 pong");
            return;
          }

          const li = document.createElement("li");
          li.textContent = e.data;
          document.getElementById("chatBox").appendChild(li);
        };

        ws.onerror = (err) => {
          console.warn("❌ 连接错误:", err);
        };

        ws.onclose = () => {
          console.warn("⚠️ 连接关闭");
          stopHeartbeat();
          attemptReconnect();
        };
      }

      function startHeartbeat() {
        heartbeatInterval = setInterval(() => {
          if (ws.readyState === WebSocket.OPEN) {
            ws.send("ping");
            console.log("🔄 发送心跳 ping");
          }
        }, 10000); // 每 10 秒一次
      }

      function stopHeartbeat() {
        clearInterval(heartbeatInterval);
      }

      function attemptReconnect() {
        if (reconnectAttempts >= MAX_RECONNECT) {
          console.error("🚫 重连失败，达到最大次数");
          return;
        }

        setTimeout(() => {
          console.log(`🔁 尝试第 ${reconnectAttempts + 1} 次重连`);
          reconnectAttempts++;
          connect();
        }, 2000 * reconnectAttempts);
      }

      function sendMessage() {
        const input = document.getElementById("msgInput");
        const msg = input.value;
        if (msg && ws.readyState === WebSocket.OPEN) {
          ws.send(msg);
          input.value = "";
        }
      }

      connect();
    </script>
  </body>
</html>
```

#### 🧪 测试流程

1. 启动服务器：

```bash
npx ts-node server.ts
```

2. 打开 index.html 文件；
3. 多个标签页聊天交互测试；
4. 模拟断线观察自动重连；
5. 控制台查看 ping/pong 心跳日志。

#### 🚀 拓展建议

- 登录认证（JWT 或 Cookie）
- 多房间支持
- 私聊功能
- 聊天记录持久化（MySQL、MongoDB）
- 前端使用 React/Vue 封装 IM 组件
- 使用 socket.io 替代原生 WebSocket（更方便处理事件和重连）

### 💡 为什么需要心跳检测？

WebSocket 长连接在以下情况下可能**静默断开：**

- 用户网络断开但未触发 onclose；
- NAT 或防火墙中断连接；
- 后端连接数过多自动回收空闲连接。

➡️ 心跳机制可以用来：

- 检测连接是否仍然“活着”；
- 主动关闭僵尸连接；
- 让客户端触发自动重连逻辑。

#### 🧠 心跳机制逻辑图

```bash
客户端           服务端
  ↓                ↓
  ping ──────────►
                  ↓
              设置 isAlive = true
  ◄─────────── pong
  ↑                ↑
每隔N秒           每隔N秒检测 isAlive 是否为 false
发送 ping         如果是，则 terminate 掉客户端连接
```

### 🛠️ 服务端心跳检测逻辑

#### 1. 客户端连接时，标记存活状态

```ts
ws.isAlive = true;
```

#### 2. 客户端回复 pong，更新状态

```ts
ws.on("pong", () => {
  ws.isAlive = true;
});
```

#### 3. 定时检测是否收到 pong 响应

```ts
setInterval(() => {
  wss.clients.forEach((client: any) => {
    if (!client.isAlive) {
      console.log("未响应心跳，断开连接");
      return client.terminate();
    }

    client.isAlive = false;
    client.ping(); // 服务端发送 ping，等客户端触发 pong
  });
}, 30000); // 每 30 秒检测一次
```

### 📲 客户端心跳检测逻辑

#### 1. 定时发送 ping 包

```js
setInterval(() => {
  if (ws.readyState === WebSocket.OPEN) {
    ws.send("ping");
  }
}, 10000); // 每 10 秒发一次心跳
```

#### 2. 监听服务端 pong 回复

```js
ws.onmessage = (event) => {
  if (event.data === "pong") {
    // 心跳确认
    console.log("收到 pong 响应");
    return;
  }

  // 正常聊天消息处理...
};
```

#### 3. 若连接断开，启动重连逻辑

```js
ws.onclose = () => {
  // 停止心跳定时器
  // 尝试重新连接
};
```

#### 🔁 客户端主动 ping vs 服务端 ping

| 模式            | 优点                       | 缺点                  |
| --------------- | -------------------------- | --------------------- |
| **客户端 ping** | 实现简单，浏览器支持好     | 对服务端无保障        |
| **服务端 ping** | 控制主动性强，可 terminate | 浏览器需自动触发 pong |
| **双向配合**    | 更稳定、跨平台强           | 实现稍复杂            |

✅ 建议机制：客户端主动 ping，服务端响应 pong

##### 🔁 客户端行为：

- 每 10 秒：

  - 向服务端发送一个 ping 消息（自定义文本，不是协议级 ping）。

- 如果长时间（如 20 秒）没收到 pong 回复，就认为连接异常，主动断开并尝试重连。

##### 🖥️ 服务端行为：

- 接收到 ping 消息：

  - 回复一个 pong 消息；

  - 标记该连接为 "活跃"（isAlive = true）。

- 每 30 秒循环检查：

  - 如果某连接的 isAlive === false（即 30 秒内没收到任何 ping），说明客户端失联，执行 terminate() 断开连接；

  - 如果 isAlive === true，则重置为 false，等待下一个周期重新检测。

##### ✅ 推荐实践：客户端每 10 秒 ping，服务端每 30 秒检查 pong 回复。

| 项目     | 客户端                          | 服务端                               |
| -------- | ------------------------------- | ------------------------------------ |
| 定时操作 | 每 10 秒发送 `ping`             | 每 30 秒检查是否收过 `ping`          |
| 状态更新 | 收到 `pong` 更新状态            | 收到 `ping` 更新 `isAlive = true`    |
| 异常处理 | 超 20 秒没收到 `pong`，断开重连 | `isAlive === false` 就 `terminate()` |
| 消息内容 | 自定义文本："ping" / "pong"     | 文本或二进制都可                     |

### 重连策略

#### 🚨 为什么要重连？

##### WebSocket 在以下情况会断开连接：

- 网络波动、Wi-Fi 切换；
- 服务端宕机或重启；
- 浏览器进入后台、休眠；
- 心跳失败（无 pong）被主动断开。

→ 所以我们需要： 自动监听断开，尝试重连，避免用户手动刷新页面。

#### 🧠 重连策略逻辑流程

```js
 连接断开
     ↓
开始重连（第1次）
     ↓
失败 → 等待 2 秒再试
     ↓
开始重连（第2次）
     ↓
失败 → 等待 4 秒再试
     ↓
...
超过最大次数 → 停止重连
```

✅ 采用 指数退避（Exponential Backoff） 是为了：

- 避免连接风暴
- 给服务端足够时间恢复；
- 更具容错性。

#### 📋 实现逻辑描述（前端）

1. 状态变量定义

```js
let ws;
let reconnectAttempts = 0;
const MAX_RECONNECT = 5;
```

#### 2. 封装 connect() 函数

```js
function connect() {
  ws = new WebSocket("ws://localhost:8080");

  ws.onopen = () => {
    console.log("✅ WebSocket 连接成功");
    reconnectAttempts = 0;
    startHeartbeat();
  };

  ws.onmessage = (e) => {
    if (e.data === "pong") return;
    console.log("收到消息：", e.data);
  };

  ws.onerror = (err) => {
    console.warn("❌ 连接异常:", err);
  };

  ws.onclose = () => {
    console.warn("⚠️ WebSocket 断开");
    stopHeartbeat();
    attemptReconnect();
  };
}
```

#### 3. 实现重连函数 attemptReconnect()

```js
function attemptReconnect() {
  if (reconnectAttempts >= MAX_RECONNECT) {
    console.error("🚫 已达到最大重连次数");
    return;
  }

  const delay = Math.pow(2, reconnectAttempts) * 1000; // 2s, 4s, 8s, 16s, ...
  console.log(`🔁 ${reconnectAttempts + 1} 次重连将在 ${delay / 1000}s 后发起`);

  setTimeout(() => {
    reconnectAttempts++;
    connect();
  }, delay);
}
```

#### 🔄 心跳结合重连

```js
let heartbeatTimer;

function startHeartbeat() {
  heartbeatTimer = setInterval(() => {
    if (ws.readyState === WebSocket.OPEN) {
      ws.send("ping");
    }
  }, 10000); // 每 10 秒发送 ping
}

function stopHeartbeat() {
  clearInterval(heartbeatTimer);
}
```

#### ✅ 关键点总结

| 项目                 | 推荐设置             |
| -------------------- | -------------------- |
| 最大重连次数         | 5\~10 次             |
| 重连时间间隔策略     | 指数退避（2^n 秒）   |
| 是否清除定时器       | 是，onclose 停止心跳 |
| 是否支持手动重试     | 可加重试按钮         |
| 页面刷新是否保留连接 | 否，刷新重连即可     |

#### 🧩 重连优化建议

- ✅ 加 loading/loading toast 提示用户正在重连；
- ✅ 避免多个重连同时触发（加锁标记）；
- ✅ 登录态丢失后不再重连；
- ✅ 可与 Vue/React 状态管理（如 Pinia、Redux）集成统一状态。

### ✅ 使用 Socket.IO 实现 IM + 心跳 + 重连

使用 socket.io 来简化 WebSocket 的 IM 聊天 + 心跳 + 重连逻辑是非常推荐的做法，因为：

- 它自动处理心跳检测；
- 内置自动重连机制；
- 提供事件机制（比原生 message 更好组织代码）；
- 更加跨平台（兼容性）好。

#### 📦 安装依赖

```bash
# 后端
npm install socket.io

# 前端（CDN 或 npm）
npm install socket.io-client
```

#### 🖥️ 后端示例（Node.js）

```ts
// server.ts
import { createServer } from "http";
import { Server } from "socket.io";

const httpServer = createServer();
const io = new Server(httpServer, {
  cors: { origin: "*" }, // 允许跨域（测试用）
});

io.on("connection", (socket) => {
  console.log("✅ 用户连接:", socket.id);

  // 接收聊天消息
  socket.on("chat", (msg) => {
    console.log("💬 收到消息:", msg);
    // 广播给其他用户
    socket.broadcast.emit("chat", msg);
  });

  // 断开连接事件
  socket.on("disconnect", (reason) => {
    console.log("❌ 用户断开:", socket.id, reason);
  });
});

// 启动服务
httpServer.listen(3000, () => {
  console.log("🚀 Socket.IO 服务器已启动，端口 3000");
});
```

#### 🌐 前端示例（HTML + JS）

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>Socket.IO 聊天</title>
    <script src="https://cdn.socket.io/4.7.5/socket.io.min.js"></script>
  </head>
  <body>
    <h2>聊天窗口</h2>
    <input id="msgInput" placeholder="输入消息..." />
    <button onclick="sendMessage()">发送</button>
    <ul id="chatBox"></ul>

    <script>
      const socket = io("http://localhost:3000", {
        reconnectionAttempts: 5, // 最多重连 5 次
        reconnectionDelay: 2000, // 每次间隔 2 秒
      });

      socket.on("connect", () => {
        console.log("✅ 连接成功:", socket.id);
      });

      socket.on("disconnect", (reason) => {
        console.warn("❌ 连接断开:", reason);
      });

      socket.on("connect_error", (err) => {
        console.error("连接失败:", err.message);
      });

      socket.on("chat", (msg) => {
        const li = document.createElement("li");
        li.textContent = msg;
        document.getElementById("chatBox").appendChild(li);
      });

      function sendMessage() {
        const input = document.getElementById("msgInput");
        const msg = input.value;
        if (msg) {
          socket.emit("chat", msg);
          input.value = "";
        }
      }
    </script>
  </body>
</html>
```

#### ✅ 心跳和重连说明（Socket.IO）

| 功能         | 实现方式                        | 你需要做什么 |
| ------------ | ------------------------------- | ------------ |
| **心跳检测** | 内置机制（客户端自动 ping）     | 无需实现     |
| **掉线判断** | 服务端 20s 收不到 ping 自动断开 | 无需实现     |
| **自动重连** | 默认开启（你可设置次数/间隔）   | 配置即可     |

#### 客户端默认重连设置（可自定义）：

```js
io("http://localhost:3000", {
  reconnection: true, // 是否自动重连（默认 true）
  reconnectionAttempts: 5, // 最多重连次数
  reconnectionDelay: 2000, // 首次重连间隔
  reconnectionDelayMax: 10000, // 最大间隔
  timeout: 5000, // 连接超时时间
});
```

| 能力       | 原生 WebSocket           | Socket.IO                   |
| ---------- | ------------------------ | --------------------------- |
| 心跳检测   | 需手动实现 ping/pong     | 内置机制自动处理            |
| 自动重连   | 需手动封装、计数、退避等 | 开箱即用，配置项控制        |
| 多事件监听 | 需手动封装 JSON 类型等   | `.on(event, cb)` 自带事件名 |
| 房间广播   | 需维护连接池和过滤       | `io.to(room).emit(...)`     |
