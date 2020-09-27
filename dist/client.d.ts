import { Self, MessageType, TasksMap, TaskId } from "./types";
import { Task } from "./reaction";
declare type ClientOption = {
    self?: Self;
    timeout?: number;
};
declare enum STATE {
    notConnected = 0,
    connecting = 1,
    connected = 2,
    closed = 3
}
export default class Client {
    target: Self;
    origin: string;
    self: Self;
    timeout: number;
    tasks: TasksMap<string, Task>;
    state: STATE;
    private _msgListener;
    private _connector;
    constructor(target: Self, origin?: string, option?: ClientOption);
    open(): void;
    close(): void;
    connect(): Promise<any>;
    request(type: MessageType, data: any, origin?: string): Promise<any>;
    removeTask(id: TaskId): void;
    private _request;
    private _receiver;
    private _requestRetry;
}
export {};
