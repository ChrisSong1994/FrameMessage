import { Self, MessageType, MessageListener } from "./types";
import { noop } from "./utils";
import { Request } from "./reaction";
import Responsable from "./responsable";

interface ServerOption {
  self?: Self;
}
type Next = (error?: any) => Promise<any>;
type HandlerFn = (req: Request, res: Responsable, next: Next) => Promise<any>;
type errorHandler = (err: any, req: Request, res: Responsable) => void;

// 执行函数
class Handler {
  constructor(public type: MessageType, public fn: HandlerFn) {
    this.type = type;
    this.fn = fn;
  }
}

export default class Server {
  self: Self;
  private _msgListener: MessageListener;
  handlers: Handler[];

  constructor(option: ServerOption = {}) {
    this.handlers = []; // 执行函数集合
    this._msgListener = noop;
    this.self = option.self ?? self;
    this.open();
  }

  /**
   * 开启Server
   */
  open() {
    this._msgListener = this._receiver.bind(this);
    this.self.addEventListener("message", this._msgListener);
  }

  /**触发监听，发布postmessage 事件
   * @param {MessageType} type
   * @param {HandlerFn} handler
   */
  public listen(type: MessageType, handler: HandlerFn) {
    this.handlers.push(new Handler(type, handler));
  }

  /** 接收信息并处理
   * @param {MessageEvent} event
   */
  private _receiver(event: MessageEvent) {
    debugger;
    const { type, data, _id } = event.data;
    const req = new Request({ type, data, id: _id });
    const res = new Responsable(req, event);

    const handlers = this.handlers.filter((handler) => {
      return handler.type === type;
    });

    let index = 0;
    const next = async (error?: any) => {
      const handler = handlers[index++];
      if (handler) {
        handler.fn(req, res, next); // 执行完毕需要可以返回数据
      }
    };

    next();
  }
}
