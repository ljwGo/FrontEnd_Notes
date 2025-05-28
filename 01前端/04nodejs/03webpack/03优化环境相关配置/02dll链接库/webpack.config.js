const {resolve} = require("path")
const HtmlPlugin = require("html-webpack-plugin")
// 这个插件用来指定什么模块不需要打包
const WebpackPlugin = require("webpack")
// 这个用来引入外部的库文件(这个插件已经过期了好像, 不太好用, 我的解决方式是手动引入, 单独分离的dll库直接引入就可以用了, 单应用程序可能会出大问题)
const AddAssetHtmlWebpackPlugin = require('add-asset-html-webpack-plugin')

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'built.js',
    path: resolve(__dirname, 'dist'),
  },
  mode: 'development',
  plugins: [
    new HtmlPlugin({
      template: './src/demo.html'
    }),
    /* 告诉webpack什么模块不需要打包 */
    new WebpackPlugin.DllReferencePlugin({
      // 利用依赖关系(清单文件)
      manifest: resolve(__dirname, 'dll/manifest.json')
    }),
    /* 引用外部已经打包好的库文件 */
    new AddAssetHtmlWebpackPlugin({
      // 指定资源文件(库)
      filepath: resolve(__dirname, 'dll/jqueryDLL.js'),
      publicPath: ''
    })
  ],
  module: {
    rules: [

    ]
  }
}