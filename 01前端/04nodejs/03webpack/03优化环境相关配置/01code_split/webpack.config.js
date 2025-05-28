const {resovle, resolve} = require("path")
const HtmlPlugin = require("html-webpack-plugin")
const CssFilePlugin = require("mini-css-extract-plugin")
const PostcssPlugin = require("postcss-preset-env")
const MinifyCss = require('css-minimizer-webpack-plugin')
const EslintPlugin = require('eslint-webpack-plugin')

/* 
    实现代码分割, 是为了避免一个bundle包(js)过大, 同时也可以实现懒加载
    方式一:
        多入口方式
    方式二:
        optimization:{
            splitChunks: {
                chunks: "all"
            }
        }
        能够将模块单独打包成一个文件, 可以解决多入口打包时, 引入同一模块造成重复打包的问题
    方式三:
        不使用import语法, 而是使用import函数导入文件
            方式二只能够将模块单独进行打包(webpack5好像已经能对自己的模块进行单独打包了)
            不使用多入口, 可以使用这种方式实现对自己写的模块进行单独导出
*/

const CommonCssAndScss = [
    CssFilePlugin.loader,
    "css-loader",
    {
        loader: "postcss-loader",
        options: {
            postcssOptions:{
                plugins: [PostcssPlugin()]
            }
        }
    }
]

module.exports = {
    // 这是单入口
    entry: './src/index.js',
    // entry: {
    //     // 入口名称, 入口文件
    //     test: "./src/test.js",
    //     index: "./src/index.js",
    // },
    output: {
        // 为了区分不同入口文件生成不同的bundle包, 使用[name]的方式, name指向入口时的字段名
        filename: '[name].js',
        path: resolve(__dirname, 'dist')
    },
    mode: "production",
    plugins : [
        new HtmlPlugin({
            template: "./src/demo.html",
            minify: {
                collapseWhitespace: true,
                removeComments: true,
            }
        }),
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
    // 这种方式可以将node_module中的模块单独打包
    optimization:{
        splitChunks:{
            chunks: "all"
        }
    }
}