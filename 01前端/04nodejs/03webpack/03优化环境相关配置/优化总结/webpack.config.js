const {resolve} = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const EslintWebpackPlugin = require("eslint-webpack-plugin")
const WorkboxWebpackPlugin = require("workbox-webpack-plugin")
const webpack = require("webpack")
const AddAssetHtmlWebpackPlugin = require("add-asset-html-webpack-plugin")

/*
  1. 开启devServer的hot, 热模块更新. 记得css使用style-loader, js使用accept方法, html不使用热更新
  2. code_split, 代码分割. 
    optimization将第三方库单独打包成一个bundle,
    import()函数, 将自定义的js文件单独打包
  3. 懒加载和预加载
    懒加载就是利用import()函数和异步事件
    预加载是import()函数,设置webpackPrefetch魔法注释为true
  4. treeShaking删除导入了, 但是没有使用到的模块的代码,简称树摇
    开启条件:
      1) es6模块化导入
      2) production模式
    使用sideEffects告诉treeShaking哪些文件不要删除
  5. 缓存
    1)cache缓存babel转义的模块, 这部分是非打包阶段的
      cacheDirectory: true
    2)针对其它静态资源的打包, 这部分是打包阶段的(相对服务器)
      需要使用服务器express, 指定max-age:
      解决:
        使用contenthash来改变每次打包文件的版本, 做到"版本更新"
      缺点:
        产生冗余文件
  6. oneof
    rules单次命中规则
    rules中有很多匹配规则, .css$, .js$
    文件后缀会匹配每一个规则, 来防止遗漏
    oneof指明匹配成功一个后, 就不需要在往下匹配了
  7. source-map
    格式:
      [hidden-|eval-|inline-][nosource-][cheap-[module-]]source-map
    源码和打包后代码的映射关系
    1)使用devtool开启
      开发中推荐使用:
        eval-source-map
      生产中推荐使用:
        source-map
    2)不同模式的主要区别是:
      映射关系的记录的位置是单独的文件还是嵌入到打包后的文件中, 
      以及 显示跟踪源码的准确程度, 是错误所在行, 具体的错误, 还是打包后的代码错误
    3)hidden和nosource能够隐藏源代码
  8. thread-loader
    开启多进程打包, 抢占更多cpu执行时间
    注意, 进程开启需要大约700ms的时间, 而且进程间通讯也有消耗, 默认开启进程数是cpu核数-1
    使用thread-loader开启多进程
  9. externals
    排除某个库, 不打包, 而是使用cdn引入(注意: 需要手动引入)
  10. dll
    单独将某些模块打包成一个库
    作用:
      1)将公共依赖模块分类,单独分离开来打包,外部需要使用,引入即可,避免重复打包
      2)由于库已经打包好了, 可以加载打包构建速度
  11. PWA渐进式网络应用开发(离线可访问技术)
    1)需要使用一个插件workbox, 用于生成work-server文件(它可能是一个菜单文件, 告诉浏览器什么资源要缓存到work-server服务器中)
    2)在浏览器中注册work-server, 注意先判断浏览器是否支持pwa技术
*/

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'js/[name][contenthash].js',
    path: resolve(__dirname, 'dist'),
  },
  mode: "development",
  // mode: "production",
  plugins: [
    new HtmlWebpackPlugin({template: './src/demo.html'}),
    // new EslintWebpackPlugin({
    //   context: './src/js',
    //   exclude: "/node_module/",
    //   // fix能够帮我们自动修复语法, 唯独定义了却没有使用的函数不会被删除
    //   fix: true,
    // }),
    new WorkboxWebpackPlugin.GenerateSW({
      /* 
        选项的功能:
          1. 快速开启workserver
          2. 删除旧的workserver
      */
      clientsClaim: true,
      skipWaiting: true,
    }),
    // 告诉webpack哪些模块不需要打包
    new webpack.DllReferencePlugin({
      manifest: resolve(__dirname, "dll/manifest.json"),
    }),
    new AddAssetHtmlWebpackPlugin({
      // 指定资源文件(库)
      filepath: resolve(__dirname, 'dll/dll.js'),
      publicPath: ''
    })
  ],
  module: {
    rules: [
      // 放入oneof外的其它匹配规则的对象, 避免遗漏匹配相同后缀的不同规则
      {
        test: /\.js$/,
        exclude: /node_module/,
      },
      {oneOf: [
        {
          test: /\.css$/,
          use: [
            "style-loader",
            "css-loader",
          ],
        },
        {
          test: /\.scss$/,
          use: [
            "style-loader",
            "css-loader",
            "sass-loader",
          ]
        },
        {
          test: /\.js$/,
          exclude: /node_module/,
          use: [
            {
              loader: 'thread-loader',
              options: {
                workers: 5,
              }
            },
            {
              loader: "babel-loader",
          options: {
            presets: [
              [
                "@babel/preset-env",
                {
                  useBuiltIns: "usage", // or "usage"
                  corejs: 3,
                  // 指定要兼容的浏览器目标
                  targets: {
                      chrome: '60',
                      firefox: '60',
                      ie: '9',
                  }
                },
              ]
            ],
            cacheDirectory: true,
          }
            }
          ]
        }
      ]}
    ]
  },
  devServer: {
    static: {
      directory: resolve(__dirname, 'public'),
    },
    port: 8080,
    host: "localhost",
    open: true,
    hot: true,
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
      name: 'module'
    }
  },
  externals: {
    bootstrap: "bootstarp"
  },
  devtool: 'source-map'
}