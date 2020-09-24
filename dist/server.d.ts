import { Self, MessageType } from "./types";
import { Request } from "./reaction";
import Responsable from "./responsable";
interface ServerOption {
    self?: Self;
}
declare type Next = (error?: any) => Promise<any>;
declare type HandlerFn = (req: Request, res: Responsable, next: Next) => Promise<any>;
declare class Handler {
    type: MessageType;
    fn: HandlerFn;
    constructor(type: MessageType, fn: HandlerFn);
}
export default class Server {
    self: Self;
    private _msgListener;
    handlers: Handler[];
    constructor(option?: ServerOption);
    /**
     * 开启Server
     */
    open(): void;
    /**触发监听，发布postmessage 事件
     * @param {MessageType} type
     * @param {HandlerFn} handler
     */
    listen(type: MessageType, handler: HandlerFn): void;
    /** 接收信息并处理
     * @param {MessageEvent} event
     */
    private _receiver;
}
export {};
