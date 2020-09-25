# FrameMessage

基于`postmessage` 的 iframe 之间的通信方式的封装.

在以 iframe 为基础的微服务框架中，应用之间天然隔离，在需要通信的时候都会用到 `postMessage`技术来解决隔离和跨域带来的通信阻碍。但是 `postMessage` 过于简单，应用之间的通信内容和响应不规范，所以需要对 postMessage 的通信进行封装来去提高使用效率。

### 使用

`FrameMessage`把应用之间的通信像 http 一样分成服务端和客户端，服务端可以像写接口一样注册事件，客户端可以用 promise 的方式处理响应数据

```js
// 服务端
import { Server } from "framemessage";
const server = new Server();
server.listen("CHANGE_BG_COLOR", (req, res, next) => {
  const { data, type } = req;
  res.respond({ return: "CHANGE_BG_COLOR" });
  next();
});
```

```js
// 客户端
import { Client } from "framemessage";
const client = new Client(window.parent); // window.parent 指向服务端窗口
client
  .request("CHANGE_BG_COLOR", { color: "#FFE4B5" })
  .then((res) => {
    console.log(res);
  })
  .catch((data) => {
    console.log(data);
  });
```

### Api

**服务端 Server**

- **_option:_**
  - **self:** [可选]指定服务端窗口
  - **errorHandler:** [可选]自定义错误执行函数

**客户端 Client**

- **target:** 服务端窗口
- **origin:** 对应窗口资源地址
- **option:**
  - **self:** 客户端窗口，默认 window
