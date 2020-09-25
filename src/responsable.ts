import { Request, Response, STATUS } from "./reaction";
import { warn } from "./utils";

// Server端响应
export default class Responsable {
  anwsered: boolean;
  constructor(private readonly _request: Request, public event: MessageEvent) {
    this._request = _request;
    this.event = event;
    this.anwsered = false;
  }

  /**
   * 响应客户端消息
   * @param data 相应数据
   * @param isSuccess 是否成功标识
   */
  respond(data: any, isSuccess: boolean | undefined) {
    if (this.anwsered) return warn("this request has been anwsered");

    if (this.event.source) {
      const { type, _id } = this._request;
      const status = isSuccess ? STATUS.success : STATUS.failure;
      const res = new Response({ type, data, status, id: _id });
      debugger;
      // @ts-ignore
      this.event.source.postMessage(res, "*");
      this.anwsered = true;
    }
  }
}
