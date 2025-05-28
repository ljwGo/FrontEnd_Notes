const {resolve} = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

//commonJS语法
module.exports = {
    // 指定入口,可以是多个
    entry: "./src/index.js",
    // 指定输出打包后文件路径
    output: {
        filename: 'bulit.js',
        path: resolve(__dirname, 'dist')
        // path: "D://Notes/test",
    },
    // 指定处理规则(重要)
    module:{
        rules: [
            // 匹配规则,注意引号; 有引号表示完全匹配,无则是包含匹配
            {
                test: /\.css$/, 
            // use表示使用什么插件来处理文件, 注意执行顺序不能变, 从右往左
                use: ['style-loader', 'css-loader']},
            {
                test: /\.scss$/,
                use: ['style-loader', 'css-loader', 'sass-loader']
            },
            // url-loader无法处理html中的img标签, 它只能处理css中的url()方法中的图片
            // 使用html-loader,将html文件处理成url-loader可识别的文件
            // 注意: url-loader将文件解析成es6标准模块化; 而html是整理成commonJS格式
            {
                test: /\.html$/,
                loader: 'html-loader'
            },
            // 处理背景图片url("图片路径")
            {
                test: /\.(jpg|png|gif)$/,
                loader: 'url-loader',
                // 指定选项
                options: {
                    // 限制, 在处理图片时,如果图片的大小小于8kb,那么这个图片将利用
                    // base64编码格式转化, 存放到打包好的js文件中
                    // 目的减少请求次数, 但是会增大图片大小
                    // 所以通常对小图片进行转码
                    limit: 15*1024,
                    // 限制图片名称长度
                    name: "[hash:10].[ext]",
                    // 关闭es6模式, 以使其兼容html-loader
                    esModule: false
                },
                // webpack5图片问题解决方案
                type: "javascript/auto"
            },
            // 处理其他资源
            {
                exclude: /\.(jpg|png|gif|css|js|scss|html)$/,
                loader: 'file-loader'
            },
        ]
    },
    plugins: [
        // 插件,下面的插件,功能是自动将template指定的html文件,引入打包后的入口文件
        new HtmlWebpackPlugin({'template': './src/demo.html'})
    ],
    // 这个属性会检测文件的变动,自动打包新的文件到内存中,注意不会输出到硬盘
    devServer: {
        // contentBase: resolve(__dirname, "dist"), 该属性弃用
        static: {directory: resolve(__dirname, 'dist')},
        // gzip压缩
        compress:  true,
        open: true,
        port: 8080,
    },
    // 模式有两种,一种是开发者模式,另外一种是production(压缩与不压缩的区别)
    mode: "development"
}