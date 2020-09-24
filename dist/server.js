var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
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
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./utils", "./reaction", "./responsable"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var utils_1 = require("./utils");
    var reaction_1 = require("./reaction");
    var responsable_1 = __importDefault(require("./responsable"));
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
            this._msgListener = utils_1.noop;
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
            var req = new reaction_1.Request({ type: type, data: data, id: _id });
            var res = new responsable_1.default(req, event);
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
    exports.default = Server;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VydmVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL3NlcnZlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQUNBLGlDQUErQjtJQUMvQix1Q0FBcUM7SUFDckMsOERBQXdDO0lBU3hDLE9BQU87SUFDUDtRQUNFLGlCQUFtQixJQUFpQixFQUFTLEVBQWE7WUFBdkMsU0FBSSxHQUFKLElBQUksQ0FBYTtZQUFTLE9BQUUsR0FBRixFQUFFLENBQVc7WUFDeEQsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7WUFDakIsSUFBSSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUM7UUFDZixDQUFDO1FBQ0gsY0FBQztJQUFELENBQUMsQUFMRCxJQUtDO0lBRUQ7UUFLRSxnQkFBWSxNQUF5QjtZQUF6Qix1QkFBQSxFQUFBLFdBQXlCOztZQUNuQyxJQUFJLENBQUMsUUFBUSxHQUFHLEVBQUUsQ0FBQyxDQUFDLFNBQVM7WUFDN0IsSUFBSSxDQUFDLFlBQVksR0FBRyxZQUFJLENBQUM7WUFDekIsSUFBSSxDQUFDLElBQUksU0FBRyxNQUFNLENBQUMsSUFBSSxtQ0FBSSxJQUFJLENBQUM7WUFDaEMsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ2QsQ0FBQztRQUVEOztXQUVHO1FBQ0gscUJBQUksR0FBSjtZQUNFLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDOUMsSUFBSSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO1FBQzNELENBQUM7UUFFRDs7O1dBR0c7UUFDSSx1QkFBTSxHQUFiLFVBQWMsSUFBaUIsRUFBRSxPQUFrQjtZQUNqRCxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLE9BQU8sQ0FBQyxJQUFJLEVBQUUsT0FBTyxDQUFDLENBQUMsQ0FBQztRQUNqRCxDQUFDO1FBRUQ7O1dBRUc7UUFDSywwQkFBUyxHQUFqQixVQUFrQixLQUFtQjtZQUFyQyxpQkFtQkM7WUFsQkMsUUFBUSxDQUFDO1lBQ0gsSUFBQSxLQUFzQixLQUFLLENBQUMsSUFBSSxFQUE5QixJQUFJLFVBQUEsRUFBRSxJQUFJLFVBQUEsRUFBRSxHQUFHLFNBQWUsQ0FBQztZQUN2QyxJQUFNLEdBQUcsR0FBRyxJQUFJLGtCQUFPLENBQUMsRUFBRSxJQUFJLE1BQUEsRUFBRSxJQUFJLE1BQUEsRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQztZQUNqRCxJQUFNLEdBQUcsR0FBRyxJQUFJLHFCQUFXLENBQUMsR0FBRyxFQUFFLEtBQUssQ0FBQyxDQUFDO1lBRXhDLElBQU0sUUFBUSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLFVBQUMsT0FBTztnQkFDNUMsT0FBTyxPQUFPLENBQUMsSUFBSSxLQUFLLElBQUksQ0FBQztZQUMvQixDQUFDLENBQUMsQ0FBQztZQUVILElBQUksS0FBSyxHQUFHLENBQUMsQ0FBQztZQUNkLElBQU0sSUFBSSxHQUFHLFVBQU8sS0FBVzs7O29CQUN2QixPQUFPLEdBQUcsUUFBUSxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUM7b0JBQ2xDLElBQUksT0FBTyxFQUFFO3dCQUNYLE9BQU8sQ0FBQyxFQUFFLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLGVBQWU7cUJBQzVDOzs7aUJBQ0YsQ0FBQztZQUVGLElBQUksRUFBRSxDQUFDO1FBQ1QsQ0FBQztRQUNILGFBQUM7SUFBRCxDQUFDLEFBbkRELElBbURDIn0=