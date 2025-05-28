const HtmlPlugin = require("html-webpack-plugin")
const {resovle, resolve} = require("path")

/* 
    热模块替换
    功能：打包时，只打包变化的部分；不用全部重新打包
    css开启热模块， 在devServer中添加hot字段. 注意: style-loader提供Css热模块更新功能, 而MiniCssExtractPlugin不会, 所以开发环境下常用style-loader
    js则需要在入口文件中，写入监听注册
    html只有一个文件， 不需要使用HMR
*/

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
    devServer: {
        open:  true,
        port: 9000,
        // hot: true,
    }
}