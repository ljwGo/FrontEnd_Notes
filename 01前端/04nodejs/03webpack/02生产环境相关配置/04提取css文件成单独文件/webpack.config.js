const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const {resolve} = require('path');

module.exports = {
    entry: "./src/index.js",
    output: {
        filename: 'built.js',
        path: resolve(__dirname, 'dist')
    },
    module:{
        rules: [
            // 正常写法
            // {
            //     test: /\.scss$/,
            //     use: ['style-loader', 'css-loader', 'sass-loader']
            // }
            // 将css文件提取出来的写法,使用插件
            {
                test: /\.scss$/,
                use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"]
            }
        ]
    },
    mode: "development",
    plugins: [
        new HtmlWebpackPlugin({template: './src/demo.html'}),
        new MiniCssExtractPlugin()
    ]
}