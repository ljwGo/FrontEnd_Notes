const HtmlPlugin = require("html-webpack-plugin")
const {resovle, resolve} = require("path")
// sourcemap似乎是内置的，添加字段devtool就能够使用
/*
    devtool值有多种，它们速度和调试友好度都不同
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
        open: true,
        port: 8070,
        hot: true,
    },
    devtool: "source-map"
    // 选项集合
    // [inline-|hidden-|eval-|][-][cheap-[module-]]source-map
    /*
        内联和外部区别:
            外联生成了外部文件, 内联构建速度更快
        source-map 外部方式
          错误代码准确信息, 准确源代码错误位置
        inline-source-map 内联方式, 在构建文件中, 仅存在一个sourceMapURL
          错误代码准确信息, 准确源代码错误位置
        hidden-source-map 外部
          (可以保护源代码的安全)
          错误代码准确信息, 只能提示到构建后代码的准确位置
        eval-source-map 内联 每一个文件都生成对应的sourceMapURL,都在eval中
          错误代码准确信息, 准确源代码错误位置
        nosource-source-map 外部
          错误代码准确信息, 但是没有错误位置信息
        cheap-source-map 外部
          错误代码准确信息, 错误位置信息只能精确到行
        cheap-module-source-map 外部
        错误代码准确信息, 源代码错误位置信息

        开发环境: 速度快, 调试更友好
          速度快(eval>inline>cheap>...)
            eval-cheap-source-map
            eval-source-map
          调式更友好
            source-map
            cheap-module-source-map
          总结: 使用 eval-source-map 或 cheap-module-source-map

        生产环境: 源代码要不要隐藏? 调试要不要更友好
          内联会让代码体积更大, 所以在生产环境下不用内联标签
            nosource-source-map
            hidden-source-map

          总结: 使用source-map 或 cheap-module-source-map
    */
}