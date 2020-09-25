import { Request } from "./reaction";
export default class Responsable {
    private readonly _request;
    event: MessageEvent;
    anwsered: boolean;
    constructor(_request: Request, event: MessageEvent);
    /**
     * 响应客户端消息
     * @param data 相应数据
     * @param isSuccess 是否成功标识
     */
    respond(data: any, isSuccess: boolean | undefined): void;
}
