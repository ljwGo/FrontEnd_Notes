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
        ]
    },
    plugins: [
        new HtmlPlugin({template: "./src/demo.html"})
    ],
    devServer: {
        open: true,
        port: 8070,
        hot: true,
    }
}