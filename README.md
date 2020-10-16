# FrameMessage

基于`postmessage`的`iframe`应用之间的通信方式的封装,类似于`http`接口访问会数据返回形式。

在以`iframe`为基础的微服务框架中,应用之间天然隔离，在需要通信的时候都会用到`postMessage`技术来解决隔离和跨域带来的通信阻碍。但是`postMessage`过于简洁，应用之间的通信内容和响应不规范，所以需要对`postMessage`的通信进行封装来去提高使用效率。

### 使用

**基本使用**
`frameMessage`把应用之间的通信像`http`一样分成服务端和客户端，服务端可以像写接口一样注册事件，客户端可以用 promise 的方式处理响应数据

**script 标签引入**
在项目 dist 目录拿到 frameMessage.js 脚本文件

```html
<script src="./frameMessage.js"></script>
<script>
  const { Client, Server } = window.frameMessage;
</script>
```

**esm 方式引入**

```bash
# 安装
npm i @chrissong/frame-message --save
```

```js
// 服务端
import { Server } from "@chrissong/frame-message";
const server = new Server();
server.listen("GET_THEME_COLOR", (req, res) => {
  const { data, type } = req;
  res.success({ color: "#ffffff" });
});
```

```js
// 客户端
import { Client } from "@chrissong/frame-message";
const client = new Client(window.parent); // window.parent 指向服务端窗口
client
  .request("GET_THEME_COLOR", { theme: true })
  .then((res) => {
    console.log(res);
  })
  .catch((data) => {
    console.log(data);
  });
```

**错误处理**

- 1.客户端在发送请求后可以在`catch`内捕获错误信息,返回信息将符合接口格式规范。

```js
// GET_USER_INFO 事件类型在服务端未监听
client
  .request("GET_USER_INFO", { appid: "123" })
  .then((res) => {
    console.log(res);
  })
  .catch((data) => {
    const { data, type, error } = data;
    console.log(data, type, error);
  });
```

- 2.服务端在响应请求时可在回调函数内调用`res.error(errData)`方式返回错误信息。

```js
server.listen("GET_USER_INFO", (req, res) => {
  const { data, type } = req;
  res.error("sorry, you have not the authority to get userInfo!");
});
```

**错误信息**

- 1.客户端请求连接失败：客户端在第一次请求时会尝试连接服务端，假如服务端没有开启或者没有实例化服务端，客户端将会默认尝试三次请求连接后抛出`timeout`错误

### Api

#### Server 类

- **_option:_**
  - **self:** `[可选]`指定服务端窗口
  - **errorHandler:** `[可选]`自定义错误执行函数

#### 服务端 Server 实例

**_方法：_**

- `listen()`：注册监听事件类型

  - `type`:`[string]` 监听事件类型
  - `callback()`:监听事件触发回调函数
    - `req`:请求对象
    - `res`:请求返回对象
      - `sucess()`:请求成功调用
      - `error()`:请求失败调用

- `cancel()`:取消注册事件类型

  - `type`:`[string]` 监听事件类型

- `open()`:服务端监听开启

- `close()`:服务端监听关闭

#### 客户端 Client 类

- **target:** 服务端窗口
- **origin:** `[可选]`对应窗口资源地址
- **option:** `[可选]`
  - **self:** 客户端窗口，默认 window

#### 客户端 Client 实例

**_方法：_**

- `request()`：发起事件请求，将返回一个 Promise 对象

  - `type`:`[string]` 事件类型
  - `data`:`[object]` `[可选]` 请求参数

### 接口规范

```js
// 客户端接口调用返回数据格式
{
  error: boolean; // 返回状态 true：返回错误  false：返回成功
  data: any; // 返回内容
  type: string; // 返回请求接口类型
}
```
