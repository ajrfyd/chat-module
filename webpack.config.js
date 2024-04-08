const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const ProgressPlugin = require("progress-webpack-plugin");

module.exports = {
  //* bundle 기준점
  entry: "./src/main.js",
  output: {
    // filename: "[name].[chunkhash].js",
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },
  //* 모듈 해석하는 방식 변경
  //* 모듈 불러올 때 확장자 입력 x
  resolve: {
    extensions: [".js"],
    modules: [
      path.resolve(__dirname, "src"),
      path.resolve(__dirname, "node_modules"),
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({ template: "./src/index.html" }),
    new CleanWebpackPlugin(),
    new ProgressPlugin(true),
  ],
  //* assets 처리
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(jpg|jpeg|png|webp)$/,
        use: ["file-loader"],
      },
      {
        test: /\.(js|mjs|ts|tsx)$/i,
        exclude: /node_modules/,
        loader: "babel-loader",
        options: {
          // cacheCompression: false,
          // cacheDirectory: true,
          presets: ["@babel/preset-env"],
        },
      },
    ],
  },
  target: ["web", "es5"],
  devServer: {
    static: {
      directory: path.resolve(__dirname, "dist"),
    },
    port: 5555,
  },
};
