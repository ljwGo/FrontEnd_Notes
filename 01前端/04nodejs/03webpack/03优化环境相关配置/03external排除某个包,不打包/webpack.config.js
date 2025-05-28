const {resolve} = require("path")
const HtmlPlugin = require("html-webpack-plugin")

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'built.js',
    path: resolve(__dirname, 'dist'),
  },
  mode: "development",
  plugins: [
    new HtmlPlugin({
      template: "./src/demo.html",
    }),
  ],
  module:{
    rules: [
      
    ]
  },
  // 这里使用external关键字指定需要忽略的包名称
  externals: {
    // 格式为 名称(导入时使用这个名称) : npm的包名 [最好同名称]
    haha: "jQuery",
  }
}