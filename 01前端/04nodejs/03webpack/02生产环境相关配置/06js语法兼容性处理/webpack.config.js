const HtmlPlugin = require("html-webpack-plugin")
const {resovle, resolve} = require("path")

module.exports = {
    entry: "./src/index.js",
    output: {
        filename: "built.js",
        path: resolve(__dirname, 'dist')
    },
    mode: "development",
    module: {
        rules: [
            {
                // 基本的@babel/preset-env只能够翻译基本的语法问题
                // 解决全部(引入所有补丁并打包到文件夹),请看test.js中引入的, 体积过大
                // 按需打补丁, 使用useBuiltIns: "usage"字段, core-js标准库
                test: /\.js$/,
                loader: "babel-loader",
                exclude: /node_module/,
                options: {
                    // 预设, 告诉babel做怎么样的兼容性处理
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
                    ]
                }
            }
        ]
    },
    plugins: [
        new HtmlPlugin({template: "./src/demo.html"})
    ]
}