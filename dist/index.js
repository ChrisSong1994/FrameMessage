(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define(['exports'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.frameMessage = {}));
}(this, (function (exports) { 'use strict';

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */
    /* global Reflect, Promise */

    var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };

    function __extends(d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }

    function __awaiter(thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    }

    function __generator(thisArg, body) {
        var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
        function verb(n) { return function (v) { return step([n, v]); }; }
        function step(op) {
            if (f) throw new TypeError("Generator is already executing.");
            while (_) try {
                if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
                if (y = 0, t) op = [op[0] & 2, t.value];
                switch (op[0]) {
                    case 0: case 1: t = op; break;
                    case 4: _.label++; return { value: op[1], done: false };
                    case 5: _.label++; y = op[1]; op = [0]; continue;
                    case 7: op = _.ops.pop(); _.trys.pop(); continue;
                    default:
                        if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                        if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                        if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                        if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                        if (t[2]) _.ops.pop();
                        _.trys.pop(); continue;
                }
                op = body.call(thisArg, _);
            } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
            if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
        }
    }

    // 判断是否是window 原生函数
    var isNative = function (fn) {
        return /\[native code\]/.test(fn.toString());
    };
    function noop() { }
    function warn() {
        var _a;
        var log = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            log[_i] = arguments[_i];
        }
        var print = (_a = console.warn) !== null && _a !== void 0 ? _a : console.log;
        print.apply(void 0, log);
    }
    // 生成唯一id
    function generateUid() {
        return Number(Math.random().toString().substr(3, length) + Date.now()).toString(36);
    }

    var STATUS;
    (function (STATUS) {
        STATUS["success"] = "success";
        STATUS["failure"] = "failure";
    })(STATUS || (STATUS = {}));
    var REACTION_TYPE;
    (function (REACTION_TYPE) {
        REACTION_TYPE["request"] = "reaction_request";
        REACTION_TYPE["response"] = "reaction_response";
    })(REACTION_TYPE || (REACTION_TYPE = {}));
    var Reaction = /** @class */ (function () {
        function Reaction(_reactType, _id, type, data) {
            if (_id === void 0) { _id = generateUid(); }
            if (data === void 0) { data = null; }
            this._reactType = _reactType;
            this._id = _id;
            this.type = type;
            this.data = data;
            this._id = _id;
            this.type = type;
            this.data = data;
            this._reactType = _reactType;
        }
        return Reaction;
    }());
    // 响应请求
    var Request = /** @class */ (function (_super) {
        __extends(Request, _super);
        function Request(_a) {
            var type = _a.type, id = _a.id, data = _a.data;
            return _super.call(this, REACTION_TYPE.request, id, type, data) || this;
        }
        // 是否请求实例
        Request.isRequest = function (req) {
            return req._reactType === REACTION_TYPE.request;
        };
        return Request;
    }(Reaction));
    // 响应返回
    var Response = /** @class */ (function (_super) {
        __extends(Response, _super);
        function Response(_a) {
            var type = _a.type, id = _a.id, data = _a.data, status = _a.status;
            var _this = _super.call(this, REACTION_TYPE.response, id, type, data) || this;
            _this.status = status !== null && status !== void 0 ? status : STATUS.success;
            return _this;
        }
        Response.isResponse = function (res) {
            return res._reactType === REACTION_TYPE.response;
        };
        return Response;
    }(Reaction));
    // client响应任务
    var Task = /** @class */ (function () {
        function Task(req, res, resolve, reject) {
            this.req = req;
            this.res = res;
            this.resolve = resolve;
            this.reject = reject;
            this.req = req;
            this.res = res;
            this.resolve = resolve;
            this.reject = reject;
        }
        return Task;
    }());

    var Responsable = /** @class */ (function () {
        function Responsable(_request, event) {
            this._request = _request;
            this.event = event;
            this._request = _request;
            this.event = event;
        }
        /**
         * 响应客户端消息
         * @param isSuccess 是否成功标识
         * @param data 相应数据
         */
        Responsable.prototype.respond = function (data) {
            if (this.event.source) {
                var _a = this._request, type = _a.type, _id = _a._id;
                // const status = isSuccess ? STATUS.success : STATUS.failure;
                var res = new Response({ type: type, data: data, id: _id });
                debugger;
                // @ts-ignore
                this.event.source.postMessage(res, "*");
            }
        };
        return Responsable;
    }());

    // 执行函数
    var Handler = /** @class */ (function () {
        function Handler(type, fn) {
            this.type = type;
            this.fn = fn;
            this.type = type;
            this.fn = fn;
        }
        return Handler;
    }());
    var Server = /** @class */ (function () {
        function Server(option) {
            if (option === void 0) { option = {}; }
            var _a;
            this.handlers = []; // 执行函数集合
            this._msgListener = noop;
            this.self = (_a = option.self) !== null && _a !== void 0 ? _a : self;
            this.open();
        }
        /**
         * 开启Server
         */
        Server.prototype.open = function () {
            this._msgListener = this._receiver.bind(this);
            this.self.addEventListener("message", this._msgListener);
        };
        /**触发监听，发布postmessage 事件
         * @param {MessageType} type
         * @param {HandlerFn} handler
         */
        Server.prototype.listen = function (type, handler) {
            this.handlers.push(new Handler(type, handler));
        };
        /** 接收信息并处理
         * @param {MessageEvent} event
         */
        Server.prototype._receiver = function (event) {
            var _this = this;
            debugger;
            var _a = event.data, type = _a.type, data = _a.data, _id = _a._id;
            var req = new Request({ type: type, data: data, id: _id });
            var res = new Responsable(req, event);
            var handlers = this.handlers.filter(function (handler) {
                return handler.type === type;
            });
            var index = 0;
            var next = function (error) { return __awaiter(_this, void 0, void 0, function () {
                var handler;
                return __generator(this, function (_a) {
                    handler = handlers[index++];
                    if (handler) {
                        handler.fn(req, res, next); // 执行完毕需要可以返回数据
                    }
                    return [2 /*return*/];
                });
            }); };
            next();
        };
        return Server;
    }());

    var Client = /** @class */ (function () {
        function Client(target, origin, option) {
            if (origin === void 0) { origin = "*"; }
            if (option === void 0) { option = {}; }
            var _a;
            this.target = target;
            this.origin = origin;
            this.self = (_a = option.self) !== null && _a !== void 0 ? _a : self;
            this.tasks = Object.create(null);
            this._msgListener = noop;
            this.open();
            // target 必须是带有原生window.postmessage方法
            if (!isNative(target.postMessage)) {
                throw new TypeError("The first parameter must contain native `postMessage` method");
            }
        }
        /**
         * 开启Client
         */
        Client.prototype.open = function () {
            this._msgListener = this._receiver.bind(this);
            debugger;
            this.self.addEventListener("message", this._msgListener);
        };
        /**触发监听，发布postmessage 事件
         * @param {MessageType} type
         * @param {any} data
         * @param {string} origin
         * @returns {Promise}  Promise 响应结果
         */
        Client.prototype.request = function (type, data, origin) {
            debugger;
            var req = new Request({ type: type, data: data });
            return this._request(req, origin !== null && origin !== void 0 ? origin : this.origin);
        };
        /** 处理request请求
         * @param {Request} req
         */
        Client.prototype._request = function (req, origin) {
            var _this = this;
            if (!Request.isRequest(req)) {
                warn("The return value of requestInterceptor must be a valid request");
                return Promise.reject(req);
            }
            return new Promise(function (resolve, reject) {
                _this.target.postMessage(req, origin);
                _this.tasks[req._id] = new Task(req, null, resolve, reject);
            });
        };
        /**接收来自server的响应
         * @param {MessageEvent} event
         * */
        Client.prototype._receiver = function (event) {
            debugger;
            if (!Response.isResponse(event.data))
                return;
            var _a = event.data, type = _a.type, _id = _a._id;
            var task = this.tasks[_id];
            if (!task)
                return;
            var res = new Response(event.data); // 根据接收信息生成一个响应对象
            task.res = res;
            if (res.status === STATUS.success) {
                task.resolve(res);
            }
            else {
                task.reject(res);
            }
        };
        return Client;
    }());

    exports.Client = Client;
    exports.Server = Server;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=index.js.map
