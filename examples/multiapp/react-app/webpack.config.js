const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin"); // html 模版插件
const yargsParser = require("yargs-parser"); //yargs-parser 模块用来获取命令行参数

const argv = yargsParser(process.argv.slice(2)); // cross-env：运行跨平台设置和使用环境变量的脚本
// console.log(argv)  //{ _: [], open: true, mode: 'development' }
const pro = argv.mode == "production" ? true : false; //  区别是生产环境和开发环境

let config = {
  entry: {
    index: "./src/index.js", // 入口文件
  },
  output: {
    filename: pro ? "[name].[chunkhash].js" : "[name].js", // 打包后的文件名称
    path: path.resolve("dist"), // 打包后的目录，必须是绝对路径
    publicPath: "/", // 打包的根目录下
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"],
          },
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./index.html",
      hash: true, // 会在打包好的bundle.js后面加上hash串
    }),
  ],
  resolve: {
    alias: {
      src: path.join(__dirname, "./src"),
    },
    extensions: [".js", ".css", ".json"],
  },
  devServer: {
    port: 8000, // 端口
    open: true, // 自动打开浏览器
    hot: true, // 开启热更新
    overlay: true, // 浏览器页面上显示错误
    historyApiFallback: true,
  },
  //srouce里面能看到我们写的代码，也能打断点调试代码
  devtool: "source-map",
};

module.exports = config;
