import { Self, MessageType, MessageListener } from "./types";
import { noop, isNative, WILDCARD, HAND_SHAKE } from "./utils";
import { Request } from "./reaction";
import Responsable from "./responsable";

enum STATE {
  open,
  closed,
}
type HandlerFn = (req: Request, res: Responsable) => Promise<any>;
type HandlerMap = Map<string, Handler>;
type ErrorHandler = (err: any, req: Request, res: Responsable) => void; // 错误处理
type NotFoundErrorHandler = (req: Request, res: Responsable) => void; // 404 处理
interface ServerOption {
  self?: Self;
  errorHandler?: ErrorHandler;
}

// 执行函数
class Handler {
  public type: MessageType;
  public fn: HandlerFn;
  constructor(type: MessageType, fn: HandlerFn) {
    this.type = type;
    this.fn = fn;
  }
}

// 默认失败执行函数
const defaultErrorHandler: ErrorHandler = (err, _req, res) => {
  if (!res.anwsered) {
    res.error(err);
  }
};

// 404 失败执行函数
const notFoundErrorHandler: NotFoundErrorHandler = (req, res) => {
  res.error(`the type of ${req.type} has not been found`);
};

export default class Server {
  self: Self;
  handlerMap: HandlerMap;
  state: STATE;
  errorHandler: ErrorHandler;
  private notFoundErrorHandler: NotFoundErrorHandler;
  private _msgListener: MessageListener;

  constructor(option: ServerOption = {}) {
    this.self = option.self ?? self;
    this.handlerMap = new Map(); // 执行函数集合
    this.state = STATE.closed;
    this._msgListener = noop;
    this.errorHandler = option.errorHandler ?? defaultErrorHandler;
    this.notFoundErrorHandler = notFoundErrorHandler;

    if (!isNative(this.self.postMessage)) {
      throw new TypeError(
        "`self` parameter must contain native `postMessage` method"
      );
    }

    this.open();
    this._listenInternalType();
  }

  // 开启Server端监听
  public open() {
    if (this.state !== STATE.closed) return;
    this._msgListener = this._receiver.bind(this);
    this.self.addEventListener("message", this._msgListener);
    this.state = STATE.open;
  }

  // 关闭Server端监听
  public close() {
    if (this.state === STATE.closed) return;
    this.self.removeEventListener("message", this._msgListener);
    this._msgListener = noop;
    this.state = STATE.closed;
  }

  /** 注册监听事件
   * @param {MessageType | HandlerFn} type
   * @param {HandlerFn} handler
   */
  public listen(type: MessageType, handler?: HandlerFn) {
    // 一个事件监听只能注册一次
    if (this.handlerMap.has(type)) {
      throw new Error(`type ${type} has been listen`);
    }

    if (handler) {
      this.handlerMap.set(type, new Handler(type, handler));
    } else if (typeof type === "function") {
      this.handlerMap.set(WILDCARD, new Handler(WILDCARD, type));
    }
  }

  /**
   * 取消事件监听
   * @param {MessageType} type 事件类型
   */
  public cancel(type: MessageType) {
    if (typeof type === "function") {
      type = WILDCARD;
    }
    this.handlerMap.delete(type);
  }

  /** 接收事件信息并处理
   * @param {MessageEvent} event
   */
  private async _receiver(event: MessageEvent) {
    if (!Request.isRequest(event.data)) return;
    const { type, data, _id } = event.data;
    if (type === "webpackOk") return;
    const req = new Request({ type, data, id: _id });
    const res = new Responsable(req, event);
    const handler = this.handlerMap.get(type);

    if (handler) {
      try {
        await handler.fn(req, res); // 执行完毕需要可以返回数据
      } catch (err) {
        this.errorHandler(err, req, res);
      }
    } else {
      this.notFoundErrorHandler(req, res);
    }
  }

  // 监听内部事件
  private _listenInternalType() {
    this.listen(HAND_SHAKE, async (_req, res) => {
      res.success(null);
    });
  }
}
