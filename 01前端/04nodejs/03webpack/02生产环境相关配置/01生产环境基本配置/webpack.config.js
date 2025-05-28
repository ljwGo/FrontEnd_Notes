const {resovle, resolve} = require("path")
// 处理HTML文件的, 自动导入和压缩
const HtmlPlugin = require("html-webpack-plugin")
// 提取css单独成文件的
const CssFilePlugin = require("mini-css-extract-plugin")
// css语法兼容的
const PostcssPlugin = require("postcss-preset-env")
// 压缩css的
const MinifyCss = require('css-minimizer-webpack-plugin')
// eslin语法检测使用eslint-webpack-plugin插件
const EslintPlugin = require('eslint-webpack-plugin')
// 兼容js标准使用babel-loader babel和 @babel/preset-env

// 处理图片, 使用url-loader

// 为了兼容html文件中的img图标, 使用html-loader

// 处理其它类型的文件

// 提取css和scss中的loader相同的字段
const CommonCssAndScss = [
    CssFilePlugin.loader,
    "css-loader",
    {
        loader: "postcss-loader",
        options: {
            postcssOptions:{
                // 记得去package.json文件中配置, 兼容的浏览器选项
                plugins: [PostcssPlugin()]
            }
        }
    }
]

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'built.js',
        path: resolve(__dirname, 'dist')
    },
    // producion模式好像也能压缩html文件了
    mode: "production",
    plugins : [
        new HtmlPlugin({
            template: "./src/demo.html",
            minify: {
                // 这部分可能可以删除
                collapseWhitespace: true,
                removeComments: true,
            }
        }),
        // 记得也要添加组件
        new CssFilePlugin(),
        new MinifyCss(),
        new EslintPlugin({
            context: "./src/js",
            fix: true,
        })
    ],
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [ 
                    ...CommonCssAndScss
                ]
            },
            {
                test: /\.scss$/,
                use:[
                    ...CommonCssAndScss,
                    "sass-loader"
                ]
            },
            {
                test: /\.js$/,
                loader: "babel-loader",
                exclude: /node_module/,
                options: {
                    presets: [
                        [
                            "@babel/preset-env",
                            {
                                useBuiltIns: 'usage',
                                targets: {
                                    chrome: '60',
                                    firefox: '60',
                                    ie: '9',
                                    edge: '18',
                                },
                                corejs: 3
                            }
                        ]
                    ]
                }
            },
            {
                test: /\.(png|gif|svg|jpg)$/,
                loader: 'url-loader',
                options: {
                    limit: 10 * 1024,
                    esModule: false,
                },
                type: "javascript/auto"
            },
            {
                test: /\.html$/,
                loader: "html-loader",
            },
            {
                exclude: /\.(png|gif|svg|jpg|html|js|css|scss)$/,
                loader: "file-loader",
            }
        ]
    },
    // 配置开发者模式, 自动更新, 记得删除这部分; 只能检测js和css的变更
    devServer: {
        // contentBase: resolve(__dirname, 'dist'),
        port: 8080,
        // 压缩gzip
        compress: true,
        open: true,
    }
}