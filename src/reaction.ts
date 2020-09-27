import { TaskId } from "./types";
import { generateUid } from "./utils";


enum REACTION_TYPE {
  request = "reaction_request",
  response = "reaction_response",
}

abstract class Reaction {
  protected constructor(
    public _reactType: REACTION_TYPE,
    public _id: TaskId = generateUid(),
    public type: string,
    public data: any = null
  ) {
    this._id = _id;
    this.type = type;
    this.data = data;
    this._reactType = _reactType;
  }
}

interface RequestOption {
  type?: string;
  data?: any;
  id?: string;
}

// 响应请求
export class Request extends Reaction {
  constructor({ type, id, data }: RequestOption) {
    super(REACTION_TYPE.request, id, type as string, data);
  }

  // 是否请求实例
  static isRequest(req: any) {
    return req._reactType === REACTION_TYPE.request;
  }
}

interface ResponseOptions extends RequestOption {
  error?: boolean;
}

// 响应返回
export class Response extends Reaction {
  error: boolean;
  constructor({ type, id, data, error }: ResponseOptions) {
    super(REACTION_TYPE.response, id, type as string, data);
    this.error = error ?? false;
  }

  static isResponse(res: any) {
    return res._reactType === REACTION_TYPE.response;
  }
}

// client响应任务
export class Task {
  constructor(
    public req: Request,
    public res: Response | null,
    public resolve: (res: Response) => void,
    public reject: (reason: any) => void
  ) {
    this.req = req;
    this.res = res;
    this.resolve = resolve;
    this.reject = reject;
  }
}
