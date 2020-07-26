const path = require('path');
const webpack = require('webpack'); //to access built-in plugins
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const nodeExternals = require("webpack-node-externals");

module.exports = {
  target: 'node',
  externals: nodeExternals(),
  mode: 'development',
  devtool: "inline-source-map",
  watch: true,
  entry: './src/server.ts',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.js'
    // your server related config
  },
  resolve: {
    extensions: [ ".ts", ".js"]
  },
  module: {
    rules: [
      { 
        test: /\.ts$/,
        exclude: /node_modules/,
        use: 'ts-loader'
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new webpack.ProgressPlugin()
  ],
  node: { // don't replace these
    console: false,
    global: false,
    process: false,
    Buffer: false,
    __filename: false,
    __dirname: false,
  }
};
