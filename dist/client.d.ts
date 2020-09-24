import { Self, MessageType, TaskMap } from "./types";
import { Task } from "./reaction";
declare type ClientOption = {
    self?: Self;
};
export default class Client {
    target: Self;
    origin: string;
    self: Self;
    tasks: TaskMap<string, Task>;
    private _msgListener;
    constructor(target: Self, origin?: string, option?: ClientOption);
    /**
     * 开启Client
     */
    open(): void;
    /**触发监听，发布postmessage 事件
     * @param {MessageType} type
     * @param {any} data
     * @param {string} origin
     * @returns {Promise}  Promise 响应结果
     */
    request(type: MessageType, data: any, origin?: string): Promise<unknown>;
    /** 处理request请求
     * @param {Request} req
     */
    private _request;
    /**接收来自server的响应
     * @param {MessageEvent} event
     * */
    private _receiver;
}
export {};
