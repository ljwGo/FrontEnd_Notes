const {resolve} = require("path")
// 库中模块对应的映射关系文件
const webpack = require("webpack")

module.exports = {
  entry: {
    dll: ["./src/js/demo01.js", "./src/js/demo02.js", "./src/js/demo03.js"]
  },
  output: {
    filename: "[name].js",
    path: resolve(__dirname, "dll"),
  },
  mode: "production",
  plugins: [
    new webpack.DllPlugin({
      // 指定打包库的向外暴露名
      name: "[name].js",
      // 目标文件名
      path: resolve(__dirname, "dll/manifest.json")
    })
  ],
  module: {
    rules: [

    ]
  }
}