const {resovle, resolve} = require("path")
const HtmlPlugin = require("html-webpack-plugin")
const CssFilePlugin = require("mini-css-extract-plugin")
const PostcssPlugin = require("postcss-preset-env")
const MinifyCss = require('css-minimizer-webpack-plugin')
const EslintPlugin = require('eslint-webpack-plugin')

/* 
    oneof的作用:
      当一类文件,匹配rules中的规则时,
      会遍历所有规则,减慢包的构建速度,
    使用oneof, 使得命中一个规则时,不再往下匹配
    注意: 
      oneof中不应该有两个及以上针对同一类文件的处理规则
      否则, 将会只有一个命中
      这时,可以将文件单独提取出来
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
    entry: './src/index.js',
    output: {
        filename: 'built.js',
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
        rules: {
            // oneof使用
            oneof: [
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
        }
    },
}