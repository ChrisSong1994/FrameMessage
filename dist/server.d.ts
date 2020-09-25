import { Self, MessageType, Next } from "./types";
import { Request } from "./reaction";
import Responsable from "./responsable";
declare type HandlerFn = (req: Request, res: Responsable, next: Next) => Promise<any>;
declare type ErrorHandler = (err: any, req: Request, res: Responsable) => void;
interface ServerOption {
    self?: Self;
    errorHandler?: ErrorHandler;
}
declare class Handler {
    type: MessageType;
    fn: HandlerFn;
    constructor(type: MessageType, fn: HandlerFn);
}
export default class Server {
    self: Self;
    handlers: Handler[];
    errorHandler: ErrorHandler;
    private _msgListener;
    constructor(option?: ServerOption);
    open(): void;
    close(): void;
    /** 注册监听事件
     * @param {MessageType} type
     * @param {HandlerFn} handler
     */
    listen(type: MessageType, handler: HandlerFn): void;
    /** 接收事件信息并处理
     * @param {MessageEvent} event
     */
    private _receiver;
}
export {};
