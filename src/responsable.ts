import { Request, Response, STATUS } from "./reaction";

export default class Responsable {
  constructor(private readonly _request: Request, public event: MessageEvent) {
    this._request = _request;
    this.event = event;
  }

  /**
   * 响应客户端消息
   * @param isSuccess 是否成功标识
   * @param data 相应数据
   */
  respond( data: any) {
    if (this.event.source) {
      const { type, _id } = this._request;
      // const status = isSuccess ? STATUS.success : STATUS.failure;
      const res = new Response({ type, data, id: _id });
      debugger;
      // @ts-ignore
      this.event.source.postMessage(res, "*");
    }
  }
}
