const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin')   //Vue Loader 的配置需要插件
const AutoDllPlugin = require('autodll-webpack-plugin');

module.exports = {
    entry: {
        bundle: path.resolve(__dirname, '../src/index.js')
    },
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: '[name].[hash].js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: 'babel-loader',
                exclude: /node_modules/
            },
            {   // vue 加载
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.css$/,
                use: ['vue-style-loader', 'css-loader', 'postcss-loader']
            },
        ]
    },
    resolve: {  // 别名配置
        alias: {
            'vue$': 'vue/dist/vue.esm.js',
            '@': path.resolve(__dirname, '../src'),
        },
        extensions: ['*', '.js', '.json', '.vue'],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, '../index.html')
        }),
        new VueLoaderPlugin(),
        new webpack.optimize.SplitChunksPlugin(),  // 提取共同的代码
        new AutoDllPlugin({
            inject: true, // will inject the DLL bundle to index.html
            debug: true,
            filename: '[name]_[hash].js',
            path: './dll',
            entry: {
                vendor: ['vue', 'vue-router', 'vuex']
            }
        })
    ]
};
