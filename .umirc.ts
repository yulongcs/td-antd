import { defineConfig } from 'dumi';

const path = require('path');

// more config: https://d.umijs.org/config
export default defineConfig({
  title: 'td-antd 2.x',
  description: '基于 Ant Design 4.x 开发的业务组件',
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
    'td-antd': path.resolve(__dirname, 'src/'),
    tools: path.resolve(__dirname, 'src/tools/'),
  },
});
