const merge = require("webpack-merge");
const webpack = require("webpack");
const path = require("path");
const baseConfig = require("./webpack.base.conf");
module.exports = merge(baseConfig, {
  mode: "development",
  devtool: "source-map",
  devServer: {
    contentBase: path.resolve(__dirname, "../dist"),
    open: false,
    hot: true,
    port: 7002
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin() //热更新
  ]
});
