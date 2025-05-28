const {resolve, join} = require("path")
const HtmlPlugin = require("html-webpack-plugin")
const TerserWepackPlugin = require("terser-webpack-plugin")

process.env.NODE_ENV = "development"

module.exports = {
  /* 入口 */
  // 单入口方式一  字符串
  entry: "./src/index.js",
  // 单入口方式二  数组
  // entry: ["./index.js", "./main.js"],
  // // 多入口 对象
  // entry: {
  //   entryName1: '哈哈哈',
  //   entryName2: ["./index.js", "./main.js"]
  // },
  /* 输出output */
  output: {
    // 文件名, 可带目录
    filename: "js/[name].[contenthash].js",
    // 输出后的打包目录的根目录,
    path: resolve(__dirname, "dist"),
    // 引入资源时,增加的 **前缀**
    // 按照视频所说, 加 / 号会自动以服务器路径进行补全
    // publicPath: 'http://localhost:8080/',
    // 打包后的bundle向外暴露的名称
    // js模块需要自定义向外暴露的内容, 为了安全
    library: "[name]",
    // 设置非入口文件打包后的文件名称, 例如通过import()
    chunkFilename: '[name].[contenthash].chunk.js',
    libraryTarget: "window", // 将library生成的库暴露变量名添加到那里,这里是作为浏览器window对象的一个属性
    // libraryTarget: "global" 添加到node
    // libraryTarget: "commonjs",
    // 指定输出代码的标准, 是es5还是es6
    ecmaVersion: 2015,
    assetModuleFilename: 'images/[hash][ext][query]'
  },
  mode: "development",
  plugins: [
    new HtmlPlugin({
      template: "./src/demo.html",
    })
  ],
  module: {
    rules: [
      // {
      //   test: /\.js$/,
      //   loader: "...",
      //   // 指定范围
      //   include: resolve(__dirname, '"src/js'),
      //   // 相同匹配规则时, 指定执行顺序
      //   enforce: "pre" 
      // },
      {
        test: /\.(png|jpg|gif)$/i,
        type: 'asset',
      },
      {
        test: /\.css$/,
        use: [
          "style-loader",
          "css-loader",
        ]
      }
    ]
  },
  // 定义解析模块规则
  resolve: {
    // 省略文件后缀名, 默认可以省略js和json, 使用默认值就好
    // extensions: ['.js', '.json', '.css'],
    extensions: ['.js', '.json'],
    // 配置路径别名
    alias: {
      // 定义一个变量
      $css: resolve(__dirname, 'src/css'),
    },
    // 指定node_modules目录, 让webpack不需要从里往外一层一层找
    /* 
      巨坑!!! 写成../就错了, 路径变成了__dirname/webpack/hot/log.js.
      正确为__dirname/node_modules/webpack/hot/log.js
    */
    modules: [resolve(__dirname, "../node_modules"), ],
    fallback: { "events": false }
  },
  devServer: {
    // 不是指定静态文件目录, 可能就是为了给watch等属性用的吧?
    static: {
      // 真的不太清楚这个的作用?
      directory: join(__dirname, 'dist/'),
      // 监视directory指定的目录, 只要有文件变化就reload
      watch: {
        // 这些文件改动不触发reload
        ignored: /node_module/,
        // 关闭轮询?
        usePolling: false,
      } 
    },
    client: {
      // 指定显示日志的等级
      logging: 'error',
      // (弃用)除了一些基本启动信息外, 其他内容不显示
      // quiet: true,
      // 不全屏提示
      overlay: false,
    },
    // 代理转发, 用来解决 跨域问题
    // 因为devServer已经是服务器了, 用来给前端简单测试页面的, 如果想要引用其它服务端的资源,就会发生跨域问题
    /* 实测 失败了 */
    // proxy: {
    //   // 一旦devServer接收到/api开头的路由,将路由转发
    //   "/api": {
    //     target: "http://localhost:3000/",
    //     // 将转发url路径重写
    //     pathRewrite: {
    //       // 将/api开头的替换为空字符串
    //       '^/api': ''
    //     }
    //   }
    // },
    proxy: {
      'api': 'http://localhost:3000',
    },
    compress: true,
    hot: true,
    port: 8080,
    host: "localhost",
    open: true,
  },
  optimization: {
    splitChunks: {
      chunks: "all",
      // 指定打包的最小大小30kb, 如果chunk过小就不会被打包
      minSize: 30 * 1024,
      // maxSize: 0, // 没有最大限制
      minChunks: 1, // 要提取的chunk的最小引用次数
      maxAsyncRequests: 5, // 按需加载时并行加载的文件的最大数量
      maxInitialRequests: 3, // 入口js文件最大并行请求数量
      automaticNameDelimiter: "~", // 名称连接符
      // name: "[group].[name].[ext]",
      filename: '[name].chunk.js',
      // 分割chunk的组, 说白了就是给单独分开的提取的文件分类
      // 输出文件名为vendors~xxx.js
      cacheGroups: {
        // node_module文件会被打包到vendors组
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          // 优先级
          name: "vendors",
          priority: -10
        },
        default: {
          // 要提取的chunk最少被引用两次
          minChunks: 2,
          // 优先级
          priority: -20,
          // 如果当前要打包的模块, 和之前已经被提取的模块是同一个, 就会复用, 而不是重新打包模块
          reuseExistingChunk: true
        }
      }
    },
    // 这个不好理解
    /**
     * 当我们使用缓存时, 会使用contenthash,
     * 由于入口文件等导入了其它文件, 如果改变这个文件,
     * 其contenthash值一定改变, 入口文件由于导入语句(内部会导入含有hash值得文件)
     * 入口文件得contenthash值也会改变, 造成缓存失效
     * 解决: 
     *  使用runtime文件, 我的理解可能不对
     *  是入口文件导入写死的runtime文件, runtime文件中存储了需要导入的模块的contenthash值
     *  所以不会改变入口文件的contenthash, 缓存就不会失效了
     */
    // 简写, 具体看官网
    runtimeChunk: true,
    minimizer: 
      // 更换生产环境的压缩方案(更换使用的默认插件)
      new TerserWepackPlugin({
        // 开启缓存
        cache: true,
        // 开启多进程打包
        parallel: true,
        // 启动source-map
        sourceMap: true
      })
  }
}