const {resolve} = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const PostCssEnvPlugin = require("postcss-preset-env");
const EslintWebpackPlugin = require("eslint-webpack-plugin")

/*
  让eslint语法支持浏览器环境下的内置变量,如window, history等
    在package.json中的eslintConfig字段中加入:
      env: {
          browser: true
      }
*/

process.env.NODE_ENV = 'development';

module.exports = {
    entry: "./src/index.js",
    output: {
        filename: 'built.js',
        path: resolve(__dirname, "dist")
    },
    mode: "development",
    plugins: [
        new HtmlWebpackPlugin({template: './src/demo.html'}),
        new MiniCssExtractPlugin(),
        new EslintWebpackPlugin(
            {
                // 为了避免对入口文件页进行检测, 就指定检测出发的根目录
                context: './src/js',
                // 只对修改了的文件进行检测,不太会用
                // lintDirtyModulesOnly: true,
                fix: true,
            }
            ),
    ],
    module:{
        rules:[
        ]
    },
}
/* 
    eslint-loader已经废弃
    使用eslint-webpack-plugin代替
    插件已经默认排除检测模块node_module
*/

// package.json中设置如下配置, 用来设定eslint的规则, recommended是一个内置规则
// 也可以自定义规则, .eslintrc.js中配置
// 具体规则选项参考文档或者他人博客
// "eslintConfig":
// "extends": "eslint:recommended"

// 网上还有其它设定好的规则, airhab就是一个.
// 下载eslint-config-airbnb-base, eslint-plugin-import已经不依赖了
// 启用
// "eslintConfig":
// "extends": "airbnb-base"