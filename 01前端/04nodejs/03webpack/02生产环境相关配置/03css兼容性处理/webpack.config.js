const {resolve} = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const PostCssEnvPlugin = require("postcss-preset-env")

//设置node环境变量, browserslist不识别webpack中的mode, 需手动修改
process.env.NODE_ENV = 'development';
// process.env.NODE_ENV = 'production';

module.exports = {
    entry: "./src/index.js",
    output: {
        filename: 'built.js',
        path: resolve(__dirname, "dist")
    },
    mode: "development",
    // mode: 'production',
    plugins: [
        new HtmlWebpackPlugin({template: './src/demo.html'}),
        new MiniCssExtractPlugin()
    ],
    module:{
        // 为了兼容css,将高版本的css转化为低版本的css,做语法兼容
        // 可以使用postcss, postcss中有很多插件,有的插件能够编译转换
        // 需要下载 postcss, postcss-presets-env 插件,至于作用,查文档
        // postcss-presets-env中有配置项, 设置过滤兼容的浏览器版本(这部分很复杂)
        // package.json中browserslist中配置表示不用兼容 ie10(已死)
        rules:[
            {test: /\.scss$/, 
            use:[MiniCssExtractPlugin.loader,
            "css-loader", 
            {
                loader: 'postcss-loader',
                options:{
                    postcssOptions: {
                        plugins: [PostCssEnvPlugin()]
                    }
                },
            },
            "sass-loader"]}
        ]
    }
}