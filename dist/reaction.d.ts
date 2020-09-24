import { TaskId } from "./types";
export declare enum STATUS {
    success = "success",
    failure = "failure"
}
declare enum REACTION_TYPE {
    request = "reaction_request",
    response = "reaction_response"
}
declare abstract class Reaction {
    _reactType: REACTION_TYPE;
    _id: TaskId;
    type: string;
    data: any;
    protected constructor(_reactType: REACTION_TYPE, _id: TaskId, type: string, data?: any);
}
interface RequestOption {
    type?: string;
    data?: any;
    id?: string;
}
export declare class Request extends Reaction {
    constructor({ type, id, data }: RequestOption);
    static isRequest(req: any): boolean;
}
interface ResponseOptions extends RequestOption {
    status?: STATUS;
}
export declare class Response extends Reaction {
    status: STATUS;
    constructor({ type, id, data, status }: ResponseOptions);
    static isResponse(res: any): boolean;
}
export declare class Task {
    req: Request;
    res: Response | null;
    resolve: (res: Response) => void;
    reject: (reason: any) => void;
    constructor(req: Request, res: Response | null, resolve: (res: Response) => void, reject: (reason: any) => void);
}
export {};
