import { Self, MessageType, TasksMap } from "./types";
import { Task } from "./reaction";
declare type ClientOption = {
    self?: Self;
};
export default class Client {
    target: Self;
    origin: string;
    self: Self;
    tasks: TasksMap<string, Task>;
    private _msgListener;
    constructor(target: Self, origin?: string, option?: ClientOption);
    open(): void;
    close(): void;
    request(type: MessageType, data: any, origin?: string): Promise<any>;
    private _request;
    private _receiver;
}
export {};
