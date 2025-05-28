const HtmlPlugin = require('html-webpack-plugin');
const { resolve } = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'built.js',
    path: resolve(__dirname, 'dist'),
  },
  mode: 'production',
  module: {
    rules: [
      // js 在production模式下自动压缩
    ],
  },
  plugins: [
    // 压缩html文件
    // 使用原本的html-webpack-plugin即可
    new HtmlPlugin(
      {
        template: './src/demo.html',
        minify: {
          // 移除空格
          collapseWhitespace: true,
          // 移除注释
          removeComments: true,
        },
      },
    ),
  ],
};
