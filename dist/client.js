(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./utils", "./reaction"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var utils_1 = require("./utils");
    var reaction_1 = require("./reaction");
    var Client = /** @class */ (function () {
        function Client(target, origin, option) {
            if (origin === void 0) { origin = "*"; }
            if (option === void 0) { option = {}; }
            var _a;
            this.target = target;
            this.origin = origin;
            this.self = (_a = option.self) !== null && _a !== void 0 ? _a : self;
            this.tasks = Object.create(null);
            this._msgListener = utils_1.noop;
            this.open();
            // target 必须是带有原生window.postmessage方法
            if (!utils_1.isNative(target.postMessage)) {
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
            var req = new reaction_1.Request({ type: type, data: data });
            return this._request(req, origin !== null && origin !== void 0 ? origin : this.origin);
        };
        /** 处理request请求
         * @param {Request} req
         */
        Client.prototype._request = function (req, origin) {
            var _this = this;
            if (!reaction_1.Request.isRequest(req)) {
                utils_1.warn("The return value of requestInterceptor must be a valid request");
                return Promise.reject(req);
            }
            return new Promise(function (resolve, reject) {
                _this.target.postMessage(req, origin);
                _this.tasks[req._id] = new reaction_1.Task(req, null, resolve, reject);
            });
        };
        /**接收来自server的响应
         * @param {MessageEvent} event
         * */
        Client.prototype._receiver = function (event) {
            debugger;
            if (!reaction_1.Response.isResponse(event.data))
                return;
            var _a = event.data, type = _a.type, _id = _a._id;
            var task = this.tasks[_id];
            if (!task)
                return;
            var res = new reaction_1.Response(event.data); // 根据接收信息生成一个响应对象
            task.res = res;
            if (res.status === reaction_1.STATUS.success) {
                task.resolve(res);
            }
            else {
                task.reject(res);
            }
        };
        return Client;
    }());
    exports.default = Client;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xpZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2NsaWVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztJQUNBLGlDQUErQztJQUMvQyx1Q0FBNkQ7SUFNN0Q7UUFPRSxnQkFBWSxNQUFZLEVBQUUsTUFBb0IsRUFBRSxNQUF5QjtZQUEvQyx1QkFBQSxFQUFBLFlBQW9CO1lBQUUsdUJBQUEsRUFBQSxXQUF5Qjs7WUFDdkUsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7WUFDckIsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7WUFDckIsSUFBSSxDQUFDLElBQUksU0FBRyxNQUFNLENBQUMsSUFBSSxtQ0FBSSxJQUFJLENBQUM7WUFDaEMsSUFBSSxDQUFDLEtBQUssR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ2pDLElBQUksQ0FBQyxZQUFZLEdBQUcsWUFBSSxDQUFDO1lBQ3pCLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQTtZQUVYLHFDQUFxQztZQUNyQyxJQUFJLENBQUMsZ0JBQVEsQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLEVBQUU7Z0JBQ2pDLE1BQU0sSUFBSSxTQUFTLENBQ2pCLDhEQUE4RCxDQUMvRCxDQUFDO2FBQ0g7UUFDSCxDQUFDO1FBRUQ7O1dBRUc7UUFDSCxxQkFBSSxHQUFKO1lBQ0UsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUM5QyxRQUFRLENBQUE7WUFDUixJQUFJLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7UUFDM0QsQ0FBQztRQUVEOzs7OztXQUtHO1FBQ0gsd0JBQU8sR0FBUCxVQUFRLElBQWlCLEVBQUUsSUFBUyxFQUFFLE1BQWU7WUFDbkQsUUFBUSxDQUFDO1lBRVQsSUFBTSxHQUFHLEdBQUcsSUFBSSxrQkFBTyxDQUFDLEVBQUUsSUFBSSxNQUFBLEVBQUUsSUFBSSxNQUFBLEVBQUUsQ0FBQyxDQUFDO1lBQ3hDLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLEVBQUUsTUFBTSxhQUFOLE1BQU0sY0FBTixNQUFNLEdBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ25ELENBQUM7UUFFRDs7V0FFRztRQUNLLHlCQUFRLEdBQWhCLFVBQWlCLEdBQVksRUFBRSxNQUFjO1lBQTdDLGlCQVVDO1lBVEMsSUFBSSxDQUFDLGtCQUFPLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxFQUFFO2dCQUMzQixZQUFJLENBQUMsZ0VBQWdFLENBQUMsQ0FBQztnQkFDdkUsT0FBTyxPQUFPLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO2FBQzVCO1lBRUQsT0FBTyxJQUFJLE9BQU8sQ0FBQyxVQUFDLE9BQU8sRUFBRSxNQUFNO2dCQUNqQyxLQUFJLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxHQUFHLEVBQUUsTUFBTSxDQUFDLENBQUM7Z0JBQ3JDLEtBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLElBQUksZUFBSSxDQUFDLEdBQUcsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLE1BQU0sQ0FBQyxDQUFDO1lBQzdELENBQUMsQ0FBQyxDQUFDO1FBQ0wsQ0FBQztRQUVEOzthQUVLO1FBQ0csMEJBQVMsR0FBakIsVUFBa0IsS0FBbUI7WUFDbkMsUUFBUSxDQUFBO1lBQ1IsSUFBSSxDQUFDLG1CQUFRLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUM7Z0JBQUUsT0FBTztZQUN2QyxJQUFBLEtBQWdCLEtBQUssQ0FBQyxJQUFJLEVBQXhCLElBQUksVUFBQSxFQUFFLEdBQUcsU0FBZSxDQUFDO1lBQ2pDLElBQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDN0IsSUFBSSxDQUFDLElBQUk7Z0JBQUUsT0FBTztZQUVsQixJQUFJLEdBQUcsR0FBRyxJQUFJLG1CQUFRLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsaUJBQWlCO1lBQ3JELElBQUksQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDO1lBQ2YsSUFBSSxHQUFHLENBQUMsTUFBTSxLQUFLLGlCQUFNLENBQUMsT0FBTyxFQUFFO2dCQUNqQyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2FBQ25CO2lCQUFNO2dCQUNMLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7YUFDbEI7UUFDSCxDQUFDO1FBQ0gsYUFBQztJQUFELENBQUMsQUE5RUQsSUE4RUMifQ==