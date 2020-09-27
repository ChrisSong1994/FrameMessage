import { Self, MessageType, Next } from "./types";
import { Request } from "./reaction";
import Responsable from "./responsable";
declare enum STATE {
    open = 0,
    closed = 1
}
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
    state: STATE;
    errorHandler: ErrorHandler;
    private notFoundErrorHandler;
    private _msgListener;
    constructor(option?: ServerOption);
    open(): void;
    close(): void;
    listen(type: MessageType, handler?: HandlerFn): void;
    cancel(type: MessageType, handler: HandlerFn): void;
    private _receiver;
    private _listenInternalType;
}
export {};
