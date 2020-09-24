(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./reaction"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var reaction_1 = require("./reaction");
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
                var res = new reaction_1.Response({ type: type, data: data, id: _id });
                debugger;
                // @ts-ignore
                this.event.source.postMessage(res, "*");
            }
        };
        return Responsable;
    }());
    exports.default = Responsable;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzcG9uc2FibGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvcmVzcG9uc2FibGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7SUFBQSx1Q0FBdUQ7SUFFdkQ7UUFDRSxxQkFBNkIsUUFBaUIsRUFBUyxLQUFtQjtZQUE3QyxhQUFRLEdBQVIsUUFBUSxDQUFTO1lBQVMsVUFBSyxHQUFMLEtBQUssQ0FBYztZQUN4RSxJQUFJLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQztZQUN6QixJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztRQUNyQixDQUFDO1FBRUQ7Ozs7V0FJRztRQUNILDZCQUFPLEdBQVAsVUFBUyxJQUFTO1lBQ2hCLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLEVBQUU7Z0JBQ2YsSUFBQSxLQUFnQixJQUFJLENBQUMsUUFBUSxFQUEzQixJQUFJLFVBQUEsRUFBRSxHQUFHLFNBQWtCLENBQUM7Z0JBQ3BDLDhEQUE4RDtnQkFDOUQsSUFBTSxHQUFHLEdBQUcsSUFBSSxtQkFBUSxDQUFDLEVBQUUsSUFBSSxNQUFBLEVBQUUsSUFBSSxNQUFBLEVBQUUsRUFBRSxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUM7Z0JBQ2xELFFBQVEsQ0FBQztnQkFDVCxhQUFhO2dCQUNiLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUM7YUFDekM7UUFDSCxDQUFDO1FBQ0gsa0JBQUM7SUFBRCxDQUFDLEFBckJELElBcUJDIn0=