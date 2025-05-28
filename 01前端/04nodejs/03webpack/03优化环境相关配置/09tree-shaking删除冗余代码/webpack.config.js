const HtmlPlugin = require("html-webpack-plugin")
const {resovle, resolve} = require("path")

/*
  tree-shaking: 作用是删除无用代码
  条件:
    1. 必须使用ES6模块化导入 2.必须是production模式
    // 实践时无法看到效果
    在 package.json中添加字段
    sideEffect: false 表示所有文件都可以摇动
    sideEffect: "[*.css]" 排除所有css文件
*/

process.env.NODE_ENV = "production"

module.exports = {
    entry: "./src/index.js",
    output: {
        filename: "built.js",
        path: resolve(__dirname, 'dist')
    },
    mode: "production",
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    "style-loader",
                    "css-loader"
                ]
            }
        ]
    },
    plugins: [
        new HtmlPlugin({template: "./src/demo.html"})
    ],
}