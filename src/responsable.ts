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
   * 操作成功响应客户端消息
   * @param data 相应数据
   */
  public success(data: any) {
    if (this.anwsered) return warn("this request has been anwsered");

    if (this.event.source) {
      const { type, _id } = this._request;
      const res = new Response({ type, data, status: STATUS.success, id: _id });
      debugger;
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      this.event.source.postMessage(res, "*");
      this.anwsered = true;
    }
  }

  /**
   * 操作失败响应客户端消息
   * @param data 相应数据
   */
  public error(data: any) {
    if (this.anwsered) return warn("this request has been anwsered");

    if (this.event.source) {
      const { type, _id } = this._request;
      const res = new Response({ type, data, status: STATUS.failure, id: _id });
      debugger;
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      this.event.source.postMessage(res, "*");
      this.anwsered = true;
    }
  }
}
