"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.plugin = void 0;
// @ts-nocheck
var runtime_1 = require("/Users/chenlong/Desktop/\u6211\u7684/td-antd-new/node_modules/@umijs/runtime");
var plugin = new runtime_1.Plugin({
    validKeys: ['patchRoutes', 'rootContainer', 'render', 'onRouteChange', 'getInitialState', 'request',],
});
exports.plugin = plugin;
plugin.register({
    apply: require('../plugin-initial-state/runtime'),
    path: '../plugin-initial-state/runtime',
});
plugin.register({
    apply: require('../plugin-model/runtime'),
    path: '../plugin-model/runtime',
});
