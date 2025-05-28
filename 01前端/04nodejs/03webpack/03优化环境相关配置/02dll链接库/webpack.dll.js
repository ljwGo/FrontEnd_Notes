const {resolve} = require("path")
// 重要的插件, 用来生成一个类似映射关系的文件, 与打包后库中的某一个模块一一对应
const WebpackPlugin = require("webpack")

// 这个配置文件用于生成dll库, 将一些关联的模块打包为一个库, 这个库就不需要重复打包了

// 生成chunk时, 使用--config指定使用的配置文件

module.exports = {
  entry: {
    // chunk名称(也可以理解为库名): [模块名1, 模块名2, 模块名3...]
    jqueryDLL: ["jQuery", 'bootstrap'],
  },
  output: {
    filename: "[name].js",
    path: resolve(__dirname, 'dll'),
    /* 指定chunk(也就是库)向外暴露的名称 */
    // 不是指定了入口名jqueryDLL吗? 为什么还要设置暴露名
    // 也许是因为jqueryDLL是指入口名称(在webpack打包阶段), 暴露名是指引入打包后内容的标识符(在webpack打包后,独立的)
    library: "[name]",
  },
  mode: 'production',
  plugins: [
    /* 生成映射关系文件 */
    new WebpackPlugin.DllPlugin({
      // 指定库暴露名
      name: "[name]",
      // 目标文件名
      path: resolve(__dirname, 'dll/manifest.json'),
    })
  ],
  module: {
    rules: [

    ]
  }
}