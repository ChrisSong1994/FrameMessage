/* eslint-disable no-debugger */
import { Self, MessageType, MessageListener, TasksMap, TaskId } from "./types";
import { isNative, warn, noop, delay, HAND_SHAKE } from "./utils";
import { Request, Response, Task, STATUS } from "./reaction";

type ClientOption = {
  self?: Self;
  timeout?: number;
};

// 客户端链接状态
enum STATE {
  notConnected,
  connecting,
  connected,
  closed,
}

export default class Client {
  target: Self;
  origin: string;
  self: Self;
  timeout: number;
  tasks: TasksMap<string, Task>;
  state: STATE;
  private _msgListener: MessageListener;
  private _connector: null | Promise<any>;

  constructor(target: Self, origin = "*", option: ClientOption = {}) {
    this.target = target;
    this.origin = origin;
    this.timeout = option.timeout ?? 5000;
    this.self = option.self ?? self;
    this.state = STATE.closed;
    this.tasks = Object.create(null);
    this._msgListener = noop;
    this._connector = null;

    // target 必须是带有原生window.postmessage方法
    if (!isNative(target.postMessage)) {
      throw new TypeError(
        "The first parameter must contain native `postMessage` method"
      );
    }

    this.open();
  }

  // 开启Client端监听
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  open() {
    if (this.state !== STATE.closed) return;
    this.state = STATE.notConnected;
    this._msgListener = this._receiver.bind(this);
    this.self.addEventListener("message", this._msgListener);
  }

  // 关闭Client端监听
  close() {
    if (this.state === STATE.closed) return;
    this.self.removeEventListener("message", this._msgListener);
    this._msgListener = noop;
    this.state = STATE.closed;
  }

  /**  连接服务端
   * * @return Promise 连接是否成功
   */
  async connect(): Promise<any> {
    if (this.state === STATE.closed) {
      return Promise.reject("The client is closed and needs to be reopened");
    }

    if (this.state === STATE.notConnected) {
      this._connector = new Promise((resolve, reject) => {
        const onConnected = () => {
          this.state = STATE.connected;
          resolve();
        };

        const onError = (error: any) => {
          this.state = STATE.notConnected;
          reject(error);
        };

        const request = new Request({ type: HAND_SHAKE });
        return this._requestRetry(request).then(onConnected, onError); // 创建连接结果
      });
    }
    return this._connector;
  }

  /**触发监听，发布postmessage 事件
   * @param {MessageType} type
   * @param {any} data
   * @param {string} origin
   * @returns {Promise}  Promise 响应结果
   */
  async request(type: MessageType, data: any, origin?: string): Promise<any> {
    debugger;
    if (this.state === STATE.closed) {
      return Promise.reject("The client is closed and needs to be reopened");
    }

    if (typeof type !== "string") {
      throw new TypeError("type must be a string");
    }

    if (this.state === STATE.notConnected) {
      await this.connect();
    }

    if (this.state === STATE.connecting) {
      await this._connector;
    }

    const req = new Request({ type, data });
    return this._request(req, this.timeout, origin ?? this.origin);
  }

  /**
   * 移除任务
   * @param id
   */
  removeTask(id: TaskId) {
    Reflect.deleteProperty(this.tasks, id);
  }

  /** 处理request请求
   * @param {Request} req
   * @param {number} timeout
   * @param {string} origin
   */
  private _request(req: Request, timeout = this.timeout, origin = this.origin) {
    if (!Request.isRequest(req)) {
      warn("The return value of requestInterceptor must be a valid request");
      return Promise.reject(req);
    }
    return new Promise((resolve, reject) => {
      // 设置超时返回
      const timer = setTimeout(() => {
        reject("timeout");
      }, timeout);

      // 请求结束删除任务
      const cleanup = () => {
        clearTimeout(timer);
        this.removeTask(req._id);
      };

      const fulfilled = (res: Response) => {
        resolve(res);
        cleanup();
      };

      const rejected = (reason: any) => {
        reject(reason);
        cleanup();
      };

      this.target.postMessage(req, origin);
      this.tasks[req._id] = new Task(req, null, fulfilled, rejected);
    });
  }

  /**接收来自server的响应
   * @param {MessageEvent} event
   * */
  private _receiver(event: MessageEvent) {
    debugger;
    if (!Response.isResponse(event.data)) return;
    const { _id } = event.data;
    const task = this.tasks[_id];
    if (!task) return;

    const res = new Response(event.data); // 根据接收信息生成一个响应对象
    task.res = res;
    if (res.status === STATUS.success) {
      task.resolve(res);
    } else {
      task.reject(res);
    }
  }

  /**
   * 请求重试
   * @param {Request} req 请求体
   * @param {number} timeout 超时时间
   * @param {number} count 重试次数
   * @param {number} interval 重试间隔
   * @return {Promise}  响应结果
   */
  private async _requestRetry(
    req: Request,
    timeout = 1000,
    count = 3,
    interval = 500
  ) {
    for (let i = 0; i < count; i++) {
      // 设置延迟间隔时间
      const time = i * interval;
      if (time > 0) await delay(time);

      try {
        return await this._request(req, timeout);
      } catch (e) {
        // 重试完毕后取最后一次错误信息
        if (i === count - 1) {
          return Promise.reject(e);
        }
      }
    }
  }
}
