const {resolve} = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const PostCssEnvPlugin = require("postcss-preset-env");
const CssMinimizerWebpackPlugin = require("css-minimizer-webpack-plugin");

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
        new MiniCssExtractPlugin(),
        new CssMinimizerWebpackPlugin(),
    ],
    module:{
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
    },
    // optimization: {
    //     minimizer: [
    //       new CssMinimizerWebpackPlugin(),
    //     ],
    // },
}