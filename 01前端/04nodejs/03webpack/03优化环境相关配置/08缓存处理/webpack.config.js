const {resovle, resolve} = require("path")
const HtmlPlugin = require("html-webpack-plugin")
const CssFilePlugin = require("mini-css-extract-plugin")
const PostcssPlugin = require("postcss-preset-env")
const MinifyCss = require('css-minimizer-webpack-plugin')
const EslintPlugin = require('eslint-webpack-plugin')

/* 
  缓存处理, HMR依赖于devServer, 但是生产环境中是不会使用devServer的,
  于是生产环境中是无法使用HMR热模块更新的,
  可以通过缓存设置, 实现热模块更新
  就是100个babel转换的文件中, 1个改变只重新转化这一个, 其它99个没变的使用已经转换的缓存
  打包这部分还不能实现热更新, 还有js语法检测
    开启:
      在babel-loader设置中添加cache
  这是构建打包时的缓存

  对于其它资源的打包,得在服务器上配置了,
  解决强缓存的问题:
    改变资源文件名
    hash: 
      这个存在问题, 每次webpack打包时都会生成唯一一个hash值,
      改变css文件, 将导致hash改变, js文件名也会改变. 这样就会出现问题
      理应css需要新数据, 而js由于没有改变而应该使用缓存,
      但是应为js名称也发生了变化, 所以也会更新
    chunkhash:
      每一个入口文件打包后的包,拥有一个chunkhash值, css和js同属一个入口文件引入时
      chunkhash值依旧相同
    contenthash:
      根据打包的css文件或js文件本身内容来生成hash值, 使用这个
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
        // 这里修改打包后文件, 注意,由于所有js代码都会打包在这个文件, 没有其它外部js文件
        filename: 'built[contenthash:10].js',
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
        // 这里将提取出来的main.css改名
        new CssFilePlugin({filename: "./css/[name][contenthash:10].css"}),
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
                    ],
                    // 开启缓存
                    cacheDirectory: true,
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
}