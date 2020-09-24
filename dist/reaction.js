var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./utils"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Task = exports.Response = exports.Request = exports.STATUS = void 0;
    var utils_1 = require("./utils");
    var STATUS;
    (function (STATUS) {
        STATUS["success"] = "success";
        STATUS["failure"] = "failure";
    })(STATUS = exports.STATUS || (exports.STATUS = {}));
    var REACTION_TYPE;
    (function (REACTION_TYPE) {
        REACTION_TYPE["request"] = "reaction_request";
        REACTION_TYPE["response"] = "reaction_response";
    })(REACTION_TYPE || (REACTION_TYPE = {}));
    var Reaction = /** @class */ (function () {
        function Reaction(_reactType, _id, type, data) {
            if (_id === void 0) { _id = utils_1.generateUid(); }
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
    exports.Request = Request;
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
    exports.Response = Response;
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
    exports.Task = Task;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVhY3Rpb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvcmVhY3Rpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQUNBLGlDQUFzQztJQUV0QyxJQUFZLE1BR1g7SUFIRCxXQUFZLE1BQU07UUFDaEIsNkJBQW1CLENBQUE7UUFDbkIsNkJBQW1CLENBQUE7SUFDckIsQ0FBQyxFQUhXLE1BQU0sR0FBTixjQUFNLEtBQU4sY0FBTSxRQUdqQjtJQUVELElBQUssYUFHSjtJQUhELFdBQUssYUFBYTtRQUNoQiw2Q0FBNEIsQ0FBQTtRQUM1QiwrQ0FBOEIsQ0FBQTtJQUNoQyxDQUFDLEVBSEksYUFBYSxLQUFiLGFBQWEsUUFHakI7SUFFRDtRQUNFLGtCQUNTLFVBQXlCLEVBQ3pCLEdBQTJCLEVBQzNCLElBQVksRUFDWixJQUFnQjtZQUZoQixvQkFBQSxFQUFBLE1BQWMsbUJBQVcsRUFBRTtZQUUzQixxQkFBQSxFQUFBLFdBQWdCO1lBSGhCLGVBQVUsR0FBVixVQUFVLENBQWU7WUFDekIsUUFBRyxHQUFILEdBQUcsQ0FBd0I7WUFDM0IsU0FBSSxHQUFKLElBQUksQ0FBUTtZQUNaLFNBQUksR0FBSixJQUFJLENBQVk7WUFFdkIsSUFBSSxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUM7WUFDZixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztZQUNqQixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztZQUNqQixJQUFJLENBQUMsVUFBVSxHQUFHLFVBQVUsQ0FBQztRQUMvQixDQUFDO1FBQ0gsZUFBQztJQUFELENBQUMsQUFaRCxJQVlDO0lBUUQsT0FBTztJQUNQO1FBQTZCLDJCQUFRO1FBQ25DLGlCQUFZLEVBQWlDO2dCQUEvQixJQUFJLFVBQUEsRUFBRSxFQUFFLFFBQUEsRUFBRSxJQUFJLFVBQUE7bUJBQzFCLGtCQUFNLGFBQWEsQ0FBQyxPQUFPLEVBQUUsRUFBRSxFQUFFLElBQWMsRUFBRSxJQUFJLENBQUM7UUFDeEQsQ0FBQztRQUVELFNBQVM7UUFDRixpQkFBUyxHQUFoQixVQUFpQixHQUFRO1lBQ3ZCLE9BQU8sR0FBRyxDQUFDLFVBQVUsS0FBSyxhQUFhLENBQUMsT0FBTyxDQUFDO1FBQ2xELENBQUM7UUFDSCxjQUFDO0lBQUQsQ0FBQyxBQVRELENBQTZCLFFBQVEsR0FTcEM7SUFUWSwwQkFBTztJQWVwQixPQUFPO0lBQ1A7UUFBOEIsNEJBQVE7UUFFcEMsa0JBQVksRUFBMkM7Z0JBQXpDLElBQUksVUFBQSxFQUFFLEVBQUUsUUFBQSxFQUFFLElBQUksVUFBQSxFQUFFLE1BQU0sWUFBQTtZQUFwQyxZQUNFLGtCQUFNLGFBQWEsQ0FBQyxRQUFRLEVBQUUsRUFBRSxFQUFFLElBQWMsRUFBRSxJQUFJLENBQUMsU0FFeEQ7WUFEQyxLQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sYUFBTixNQUFNLGNBQU4sTUFBTSxHQUFJLE1BQU0sQ0FBQyxPQUFPLENBQUM7O1FBQ3pDLENBQUM7UUFFTSxtQkFBVSxHQUFqQixVQUFrQixHQUFRO1lBQ3hCLE9BQU8sR0FBRyxDQUFDLFVBQVUsS0FBSyxhQUFhLENBQUMsUUFBUSxDQUFDO1FBQ25ELENBQUM7UUFDSCxlQUFDO0lBQUQsQ0FBQyxBQVZELENBQThCLFFBQVEsR0FVckM7SUFWWSw0QkFBUTtJQVlyQixhQUFhO0lBQ2I7UUFDRSxjQUNTLEdBQVksRUFDWixHQUFvQixFQUNwQixPQUFnQyxFQUNoQyxNQUE2QjtZQUg3QixRQUFHLEdBQUgsR0FBRyxDQUFTO1lBQ1osUUFBRyxHQUFILEdBQUcsQ0FBaUI7WUFDcEIsWUFBTyxHQUFQLE9BQU8sQ0FBeUI7WUFDaEMsV0FBTSxHQUFOLE1BQU0sQ0FBdUI7WUFFcEMsSUFBSSxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUM7WUFDZixJQUFJLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQztZQUNmLElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO1lBQ3ZCLElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO1FBQ3ZCLENBQUM7UUFDSCxXQUFDO0lBQUQsQ0FBQyxBQVpELElBWUM7SUFaWSxvQkFBSSJ9