import { Request } from "./reaction";
export default class Responsable {
    private readonly _request;
    event: MessageEvent;
    anwsered: boolean;
    constructor(_request: Request, event: MessageEvent);
    success(data: any): void;
    error(data: any): void;
}
