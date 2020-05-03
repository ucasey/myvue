const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
module.exports = {
    mode:"development",
    devtool:"sourcemap",
    entry:"./public/index.js",  //entry:入口文件
    plugins: [
        new HtmlWebpackPlugin({
            template:"./public/index.html" //可以指定模板html，也可以使用默认的
        }),
        new CleanWebpackPlugin(),
    ]
}