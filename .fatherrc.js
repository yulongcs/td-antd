"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    esm: 'babel',
    cjs: 'babel',
    // extractCSS: true,
    // disableTypeCheck: true,
    extraBabelPlugins: [
        ['import', { libraryName: 'antd', libraryDirectory: 'es', style: true }],
    ],
    doc: {
        menu: [],
    },
};
