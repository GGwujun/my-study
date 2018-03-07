const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
module.exports = {
    entry: {
        'main': __dirname + '/web/main.js',
        'reg': __dirname + '/web/reg.js',
        'index': __dirname + '/web/index.js',
        'login': __dirname + '/web/login.js'
    },
    output: {
        path: __dirname + "/build/dev/assets",
        filename: "[name].js"
    },
    devtool: 'eval-source-map',
    devServer: {
        contentBase: "./build",//本地服务器所加载的页面所在的目录
        historyApiFallback: true,//不跳转
        inline: true,//实时刷新
        hot: true
    },
    module: {
        rules: [
            {
                test: /(\.jsx|\.js)$/,
                use: {
                    loader: "babel-loader"
                },
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: "style-loader"
                    }, {
                        loader: "css-loader",
                        options: {
                            modules: true
                        }
                    }, {
                        loader: "postcss-loader"
                    }
                ]
            }
        ]
    },
    plugins: [
        new webpack.BannerPlugin('版权所有，翻版必究'),

        new HtmlWebpackPlugin({
            filename: __dirname + '/build/dev/html/login-build.html',
            template: __dirname + '/tpl/login.tmpl.html',
            inject: 'body',
            hash: true,
            chunks: ['build-user.js', 'login']   // 这个模板对应上面那个节点
        }),

        new HtmlWebpackPlugin({
            filename: __dirname + '/build/dev/html/index-build.html',
            template: __dirname + '/tpl/index.tmpl.html',
            inject: 'body',
            hash: true,
            chunks: ['index']   // 这个模板对应上面那个节点
        }),

        // 拆分插件
        new webpack.optimize.CommonsChunkPlugin({
            chunks: ['login', 'reg'], // 上面入口定义的节点组
            name: 'build-user.js' //最后生成的文件名
        }),

        // css抽取
        new ExtractTextPlugin("[name].css"),
        new webpack.HotModuleReplacementPlugin()//热加载插件
    ],
};