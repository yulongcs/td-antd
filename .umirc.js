"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var dumi_1 = require("dumi");
var path = require('path');
// more config: https://d.umijs.org/config
exports.default = dumi_1.defineConfig({
    title: 'td-antd',
    description: '基于antd封装的业务组件',
    favicon: '/logo.png',
    logo: '/logo.png',
    extraBabelPlugins: [
        [
            'import',
            {
                libraryName: 'antd',
                libraryDirectory: 'es',
                style: true,
            },
            'antd',
        ],
    ],
    alias: {
        components: path.resolve(__dirname, 'src/'),
        tools: path.resolve(__dirname, 'src/tools/'),
    },
});
