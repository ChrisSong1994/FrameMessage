import { Request } from "./reaction";
export default class Responsable {
    private readonly _request;
    event: MessageEvent;
    constructor(_request: Request, event: MessageEvent);
    /**
     * 响应客户端消息
     * @param isSuccess 是否成功标识
     * @param data 相应数据
     */
    respond(data: any): void;
}
