(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.generateUid = exports.warn = exports.noop = exports.isNative = exports.WILDCARD = void 0;
    exports.WILDCARD = "*"; // 通配符
    // 判断是否是window 原生函数
    exports.isNative = function (fn) {
        return /\[native code\]/.test(fn.toString());
    };
    function noop() { }
    exports.noop = noop;
    function warn() {
        var _a;
        var log = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            log[_i] = arguments[_i];
        }
        var print = (_a = console.warn) !== null && _a !== void 0 ? _a : console.log;
        print.apply(void 0, log);
    }
    exports.warn = warn;
    // 生成唯一id
    function generateUid() {
        return Number(Math.random().toString().substr(3, length) + Date.now()).toString(36);
    }
    exports.generateUid = generateUid;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvdXRpbHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0lBRWEsUUFBQSxRQUFRLEdBQUcsR0FBRyxDQUFDLENBQUMsTUFBTTtJQUVuQyxtQkFBbUI7SUFDTixRQUFBLFFBQVEsR0FBRyxVQUFDLEVBQVk7UUFDbkMsT0FBTyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUM7SUFDL0MsQ0FBQyxDQUFDO0lBRUYsU0FBZ0IsSUFBSSxLQUFJLENBQUM7SUFBekIsb0JBQXlCO0lBRXpCLFNBQWdCLElBQUk7O1FBQUMsYUFBYTthQUFiLFVBQWEsRUFBYixxQkFBYSxFQUFiLElBQWE7WUFBYix3QkFBYTs7UUFDaEMsSUFBTSxLQUFLLFNBQUcsT0FBTyxDQUFDLElBQUksbUNBQUksT0FBTyxDQUFDLEdBQUcsQ0FBQztRQUMxQyxLQUFLLGVBQUksR0FBRyxFQUFFO0lBQ2hCLENBQUM7SUFIRCxvQkFHQztJQUVELFNBQVM7SUFDVCxTQUFnQixXQUFXO1FBQ3pCLE9BQU8sTUFBTSxDQUNYLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxHQUFHLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FDeEQsQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDakIsQ0FBQztJQUpELGtDQUlDIn0=