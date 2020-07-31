import { defineConfig } from 'dumi';

const path = require('path');

// more config: https://d.umijs.org/config
export default defineConfig({
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
