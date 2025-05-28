const {resolve} = require("path")
const HtmlPlugin = require("html-webpack-plugin")
const EslintPlugin = require('eslint-webpack-plugin')

/*
  多进程打包(一般用在babel-loader中)
    多进程打包需要注意:
    1. 进程开辟需要时间, 一般是700ms,
    2. 进程通信也需要消耗资源

  自己对于多进程加速的理解
    多进程能加快速度的本质是-->抢占更多的cpu执行时间
  
  js需要注意的几点(自己的理解):
    js是单线程的(类似python,但又不完全是,python支持并发多线程),无法开启并行多线程(动态语言的通病),因为那样会造成数据错乱
    cpu执行时间分配的单位是进程, 不是线程, 不然一个进程开启多个线程,就能够无线加大cpu使用时间, 这明显不合理 
*/

/* 
  使用方式
    下载thread-loader
*/

module.exports = {
  entry: "./src/index.js",
  output: {
    filename: 'built.js',
    path: resolve(__dirname, 'dist'),
  },
  mode: "development",
  plugins: [
    new HtmlPlugin({
      template: './src/demo.html',
    }),
    new EslintPlugin({
      context: "./src/js",
      fix: true,
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
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          // 使用thread-loader开启多进程
          // "thread-loader",
          // 默认开启的进程为cpu核数-1, 可以自定义
          {
            loader: "thread-loader",
            options: {
              workers: 2 // 指定两进程 
            }
          },
          {
            loader: 'babel-loader',
            options: {
              presets: [
                [
                  "@babel/preset-env",
                  {
                    useBuiltIns: "usage",
                    corejs: 3,
                    targets: {
                      chrome: 60,
                      edge: 17,
                      ie: 9,
                      firefox: 60,
                    }
                  }
                ]
              ]
            }
          }
        ]
      }
    ]
  }
}