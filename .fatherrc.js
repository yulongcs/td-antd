export default {
  esm: 'babel',
  cjs: 'babel',
  extraBabelPlugins: [
    ['import', { libraryName: 'antd', libraryDirectory: 'es', style: true }],
  ],
  doc: {
    htmlContext: {
      head: {
        // scripts: [
        //   { src: './public/redirect.js' },
        // ],
        links: [
          { rel: 'stylesheet', href: './public/common.css' },
        ],
      },
    },
  },
}