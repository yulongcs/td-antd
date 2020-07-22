"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// @ts-nocheck
require("./core/polyfill");
require("@@/core/devScripts");
var plugin_1 = require("./core/plugin");
var history_1 = require("./core/history");
var runtime_1 = require("/Users/chenlong/Desktop/\u6211\u7684/td-antd-new/node_modules/@umijs/runtime");
var index_js_1 = require("/Users/chenlong/Desktop/\u6211\u7684/td-antd-new/node_modules/@umijs/renderer-react/dist/index.js");
var getClientRender = function (args) {
    if (args === void 0) { args = {}; }
    return plugin_1.plugin.applyPlugins({
        key: 'render',
        type: runtime_1.ApplyPluginsType.compose,
        initialValue: function () {
            return index_js_1.renderClient({
                // @ts-ignore
                routes: require('./core/routes').routes,
                plugin: plugin_1.plugin,
                history: history_1.createHistory(args.hot),
                isServer: process.env.__IS_SERVER,
                rootElement: 'root',
                defaultTitle: "td-antd",
            });
        },
        args: args,
    });
};
var clientRender = getClientRender();
exports.default = clientRender();
window.g_umi = {
    version: '3.2.10',
};
// hot module replacement
// @ts-ignore
if (module.hot) {
    // @ts-ignore
    module.hot.accept('./core/routes', function () {
        getClientRender({ hot: true })();
    });
}
