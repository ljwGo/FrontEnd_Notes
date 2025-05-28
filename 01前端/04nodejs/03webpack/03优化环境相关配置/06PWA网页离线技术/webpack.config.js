const {resolve} = require('path')
const HtmlPlugin = require('html-webpack-plugin')
const PWAPlugin = require('workbox-webpack-plugin')

/*
  想要使用PWA(渐进式开发技术,也就是离线访问技术),
  1. 下载workbox-webpack-plugin插件
  2. 引入和使用GenerateSW方法进行配置(在打包这一层准备好PWA需要的文件)
  3. 在入口文件写入代码navigator.serviceWorker.register() (让浏览器执行, 开启service-worker功能)
*/

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bulit.js',
    path: resolve(__dirname, 'dist'),
  },
  mode: 'development',
  plugins: [
    new HtmlPlugin({
      template: './src/demo.html',
    }),
    // 开器service worker, 打包时,生成一个service-worker.js文件
    new PWAPlugin.GenerateSW({
      /* 
        选项的功能:
          1. 快速开启workserver
          2. 删除旧的workserver
      */
      clientsClaim: true,
      skipWaiting: true,
    })
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          "style-loader",
          "css-loader",
        ]
      }
    ]
  }
}