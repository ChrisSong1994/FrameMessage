const merge = require('webpack-merge');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin') // 分解打包css
const baseConfig = require('./webpack.base.conf');

module.exports = merge(baseConfig, {
  mode: 'production',
  devtool: 'source-map', // 在浏览器中调试
  module: {
    rules: [

    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css"
  })
  ]
});
