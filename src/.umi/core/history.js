"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.history = exports.setCreateHistoryOptions = exports.createHistory = void 0;
// @ts-nocheck
var runtime_1 = require("/Users/chenlong/Desktop/\u6211\u7684/td-antd-new/node_modules/@umijs/runtime");
var options = {
    "basename": "/"
};
if (window.routerBase) {
    options.basename = window.routerBase;
}
// remove initial history because of ssr
var history = process.env.__IS_SERVER ? null : runtime_1.createBrowserHistory(options);
exports.history = history;
exports.createHistory = function (hotReload) {
    if (hotReload === void 0) { hotReload = false; }
    if (!hotReload) {
        exports.history = history = runtime_1.createBrowserHistory(options);
    }
    return history;
};
// 通常仅微前端场景需要调用这个 API
exports.setCreateHistoryOptions = function (newOpts) {
    if (newOpts === void 0) { newOpts = {}; }
    options = __assign(__assign({}, options), newOpts);
};
