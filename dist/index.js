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

    var WILDCARD = "*";
    var HAND_SHAKE = "__FRAME_MESSAGE_HANDLE_SHAKE__";
    var isNative = function (fn) {
        return /\[native code\]/.test(fn.toString());
    };
    var noop = function () { };
    var warn = function () {
        var _a;
        var log = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            log[_i] = arguments[_i];
        }
        var print = (_a = console.warn) !== null && _a !== void 0 ? _a : console.log;
        print.apply(void 0, log);
    };
    var generateUid = function () {
        return Number(Math.floor(Math.random() * 1000000) + Date.now()).toString(36);
    };
    var delay = function (timeout) {
        return new Promise(function (resolve) { return setTimeout(resolve, timeout); });
    };
    var filter = function (arr, match) {
        var result = [];
        return arr.reduce(function (result, item) {
            if (match(item))
                result.push(item);
            return result;
        }, result);
    };

    var REACTION_TYPE;
    (function (REACTION_TYPE) {
        REACTION_TYPE["request"] = "reaction_request";
        REACTION_TYPE["response"] = "reaction_response";
    })(REACTION_TYPE || (REACTION_TYPE = {}));
    var Reaction = (function () {
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
    var Request = (function (_super) {
        __extends(Request, _super);
        function Request(_a) {
            var type = _a.type, id = _a.id, data = _a.data;
            return _super.call(this, REACTION_TYPE.request, id, type, data) || this;
        }
        Request.isRequest = function (req) {
            return req._reactType === REACTION_TYPE.request;
        };
        return Request;
    }(Reaction));
    var Response = (function (_super) {
        __extends(Response, _super);
        function Response(_a) {
            var type = _a.type, id = _a.id, data = _a.data, error = _a.error;
            var _this = _super.call(this, REACTION_TYPE.response, id, type, data) || this;
            _this.error = error !== null && error !== void 0 ? error : false;
            return _this;
        }
        Response.isResponse = function (res) {
            return res._reactType === REACTION_TYPE.response;
        };
        return Response;
    }(Reaction));
    var Task = (function () {
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

    var Responsable = (function () {
        function Responsable(_request, event) {
            this._request = _request;
            this.event = event;
            this._request = _request;
            this.event = event;
            this.anwsered = false;
        }
        Responsable.prototype.success = function (data) {
            debugger;
            if (this.anwsered) {
                return warn("this request has been anwsered");
            }
            if (this.event.source) {
                var _a = this._request, type = _a.type, _id = _a._id;
                var res = new Response({ type: type, data: data, id: _id });
                debugger;
                this.event.source.postMessage(res, "*");
                this.anwsered = true;
            }
        };
        Responsable.prototype.error = function (data) {
            if (this.anwsered) {
                return warn("this request has been anwsered");
            }
            if (this.event.source) {
                var _a = this._request, type = _a.type, _id = _a._id;
                var res = new Response({ type: type, data: data, error: true, id: _id });
                this.event.source.postMessage(res, "*");
                this.anwsered = true;
            }
        };
        return Responsable;
    }());

    var STATE;
    (function (STATE) {
        STATE[STATE["open"] = 0] = "open";
        STATE[STATE["closed"] = 1] = "closed";
    })(STATE || (STATE = {}));
    var Handler = (function () {
        function Handler(type, fn) {
            this.type = type;
            this.fn = fn;
        }
        return Handler;
    }());
    var defaultErrorHandler = function (err, _req, res) {
        if (!res.anwsered) {
            res.error(err);
        }
    };
    var notFoundErrorHandler = function (req, res) {
        res.error("the type of " + req.type + " has not been found");
    };
    var Server = (function () {
        function Server(option) {
            if (option === void 0) { option = {}; }
            var _a, _b;
            this.self = (_a = option.self) !== null && _a !== void 0 ? _a : self;
            this.handlers = [];
            this.state = STATE.closed;
            this._msgListener = noop;
            this.errorHandler = (_b = option.errorHandler) !== null && _b !== void 0 ? _b : defaultErrorHandler;
            this.notFoundErrorHandler = notFoundErrorHandler;
            if (!isNative(this.self.postMessage)) {
                throw new TypeError("`self` parameter must contain native `postMessage` method");
            }
            this.open();
            this._listenInternalType();
        }
        Server.prototype.open = function () {
            if (this.state !== STATE.closed)
                return;
            this._msgListener = this._receiver.bind(this);
            this.self.addEventListener("message", this._msgListener);
            this.state = STATE.open;
        };
        Server.prototype.close = function () {
            if (this.state === STATE.closed)
                return;
            this.self.removeEventListener("message", this._msgListener);
            this._msgListener = noop;
            this.state = STATE.closed;
        };
        Server.prototype.listen = function (type, handler) {
            if (handler) {
                this.handlers.push(new Handler(type, handler));
            }
            else if (typeof type === "function") {
                this.handlers.push(new Handler(WILDCARD, type));
            }
        };
        Server.prototype.cancel = function (type, handler) {
            if (typeof type === "function") {
                handler = type;
                type = WILDCARD;
            }
            if (type) {
                this.handlers = handler
                    ? filter(this.handlers, function (item) { return item.fn !== handler; })
                    : filter(this.handlers, function (item) { return item.type !== type; });
            }
        };
        Server.prototype._receiver = function (event) {
            return __awaiter(this, void 0, void 0, function () {
                var _a, type, data, _id, req, res, handlers, index, next;
                var _this = this;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            if (!Request.isRequest(event.data))
                                return [2];
                            _a = event.data, type = _a.type, data = _a.data, _id = _a._id;
                            if (type === "webpackOk")
                                return [2];
                            req = new Request({ type: type, data: data, id: _id });
                            res = new Responsable(req, event);
                            handlers = filter(this.handlers, function (item) { return item.type === type; });
                            index = 0;
                            next = function () { return __awaiter(_this, void 0, void 0, function () {
                                var handler, err_1;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            handler = handlers[index++];
                                            debugger;
                                            if (!handler) return [3, 5];
                                            _a.label = 1;
                                        case 1:
                                            _a.trys.push([1, 3, , 4]);
                                            return [4, handler.fn(req, res, next)];
                                        case 2:
                                            _a.sent();
                                            return [3, 4];
                                        case 3:
                                            err_1 = _a.sent();
                                            this.errorHandler(err_1, req, res);
                                            return [3, 4];
                                        case 4: return [3, 6];
                                        case 5:
                                            this.notFoundErrorHandler(req, res);
                                            _a.label = 6;
                                        case 6: return [2];
                                    }
                                });
                            }); };
                            return [4, next()];
                        case 1:
                            _b.sent();
                            return [2];
                    }
                });
            });
        };
        Server.prototype._listenInternalType = function () {
            var _this = this;
            this.listen(HAND_SHAKE, function (_req, res) { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    res.success(null);
                    return [2];
                });
            }); });
        };
        return Server;
    }());

    var STATE$1;
    (function (STATE) {
        STATE[STATE["notConnected"] = 0] = "notConnected";
        STATE[STATE["connecting"] = 1] = "connecting";
        STATE[STATE["connected"] = 2] = "connected";
        STATE[STATE["closed"] = 3] = "closed";
    })(STATE$1 || (STATE$1 = {}));
    var Client = (function () {
        function Client(target, origin, option) {
            if (origin === void 0) { origin = "*"; }
            if (option === void 0) { option = {}; }
            var _a, _b;
            this.target = target;
            this.origin = origin;
            this.timeout = (_a = option.timeout) !== null && _a !== void 0 ? _a : 5000;
            this.self = (_b = option.self) !== null && _b !== void 0 ? _b : self;
            this.state = STATE$1.closed;
            this.tasks = Object.create(null);
            this._msgListener = noop;
            this._connector = null;
            if (!isNative(target.postMessage)) {
                throw new TypeError("The first parameter must contain native `postMessage` method");
            }
            this.open();
        }
        Client.prototype.open = function () {
            if (this.state !== STATE$1.closed)
                return;
            this.state = STATE$1.notConnected;
            this._msgListener = this._receiver.bind(this);
            this.self.addEventListener("message", this._msgListener);
        };
        Client.prototype.close = function () {
            if (this.state === STATE$1.closed)
                return;
            this.self.removeEventListener("message", this._msgListener);
            this._msgListener = noop;
            this.state = STATE$1.closed;
        };
        Client.prototype.connect = function () {
            return __awaiter(this, void 0, void 0, function () {
                var _this = this;
                return __generator(this, function (_a) {
                    if (this.state === STATE$1.closed) {
                        return [2, Promise.reject("The client is closed and needs to be reopened")];
                    }
                    if (this.state === STATE$1.notConnected) {
                        this._connector = new Promise(function (resolve, reject) {
                            var onConnected = function () {
                                _this.state = STATE$1.connected;
                                resolve();
                            };
                            var onError = function (error) {
                                _this.state = STATE$1.notConnected;
                                reject(error);
                            };
                            var request = new Request({ type: HAND_SHAKE });
                            return _this._requestRetry(request).then(onConnected, onError);
                        });
                    }
                    return [2, this._connector];
                });
            });
        };
        Client.prototype.request = function (type, data, origin) {
            return __awaiter(this, void 0, void 0, function () {
                var req;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            debugger;
                            if (this.state === STATE$1.closed) {
                                return [2, Promise.reject("The client is closed and needs to be reopened")];
                            }
                            if (typeof type !== "string") {
                                throw new TypeError("type must be a string");
                            }
                            if (!(this.state === STATE$1.notConnected)) return [3, 2];
                            return [4, this.connect()];
                        case 1:
                            _a.sent();
                            _a.label = 2;
                        case 2:
                            if (!(this.state === STATE$1.connecting)) return [3, 4];
                            return [4, this._connector];
                        case 3:
                            _a.sent();
                            _a.label = 4;
                        case 4:
                            req = new Request({ type: type, data: data });
                            return [2, this._request(req, this.timeout, origin !== null && origin !== void 0 ? origin : this.origin)];
                    }
                });
            });
        };
        Client.prototype.removeTask = function (id) {
            Reflect.deleteProperty(this.tasks, id);
        };
        Client.prototype._request = function (req, timeout, origin) {
            var _this = this;
            if (timeout === void 0) { timeout = this.timeout; }
            if (origin === void 0) { origin = this.origin; }
            if (!Request.isRequest(req)) {
                warn("The return value of requestInterceptor must be a valid request");
                return Promise.reject(req);
            }
            debugger;
            return new Promise(function (resolve, reject) {
                var timer = setTimeout(function () {
                    reject("timeout");
                }, timeout);
                var cleanup = function () {
                    clearTimeout(timer);
                    _this.removeTask(req._id);
                };
                var fulfilled = function (res) {
                    resolve(res);
                    cleanup();
                };
                var rejected = function (reason) {
                    reject(reason);
                    cleanup();
                };
                _this.target.postMessage(req, origin);
                _this.tasks[req._id] = new Task(req, null, fulfilled, rejected);
            });
        };
        Client.prototype._receiver = function (event) {
            if (!Response.isResponse(event.data))
                return;
            var _id = event.data._id;
            var task = this.tasks[_id];
            if (!task)
                return;
            var res = new Response(event.data);
            task.res = res;
            if (res.error) {
                task.reject(res);
            }
            else {
                task.resolve(res);
            }
        };
        Client.prototype._requestRetry = function (req, timeout, count, interval) {
            if (timeout === void 0) { timeout = 1000; }
            if (count === void 0) { count = 3; }
            if (interval === void 0) { interval = 500; }
            return __awaiter(this, void 0, void 0, function () {
                var i, time, err_1, type, _id;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            i = 0;
                            _a.label = 1;
                        case 1:
                            if (!(i < count)) return [3, 7];
                            time = i * interval;
                            if (!(time > 0)) return [3, 3];
                            return [4, delay(time)];
                        case 2:
                            _a.sent();
                            _a.label = 3;
                        case 3:
                            _a.trys.push([3, 5, , 6]);
                            return [4, this._request(req, timeout)];
                        case 4: return [2, _a.sent()];
                        case 5:
                            err_1 = _a.sent();
                            if (i === count - 1) {
                                type = req.type, _id = req._id;
                                return [2, Promise.reject(new Response({
                                        type: type,
                                        id: _id,
                                        data: err_1,
                                        error: true,
                                    }))];
                            }
                            return [3, 6];
                        case 6:
                            i++;
                            return [3, 1];
                        case 7: return [2];
                    }
                });
            });
        };
        return Client;
    }());

    exports.Client = Client;
    exports.Server = Server;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
