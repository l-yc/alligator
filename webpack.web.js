const path = require('path');
const webpack = require('webpack'); //to access built-in plugins
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

module.exports = {
  target: 'web',
  mode: 'development',
  devtool: "inline-source-map",
  watch: true,
  entry: {
    'dashboard': './src/public/js/dashboard.ts',
    'manage/hatchlings/main': './src/public/js/manage/hatchlings/main.ts',
    'manage/hatchlings/edit': './src/public/js/manage/hatchlings/edit.ts',
    'style': './src/public/sass/style.scss'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: "public/js/[name].js"
  },
  resolve: {
    plugins: [new TsconfigPathsPlugin()],
    extensions: [ ".ts", ".js"],
  },
  module: {
    rules: [
      {
        test: /\.ts$/, 
        use: 'ts-loader'
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: 'file-loader',
            options: { outputPath: './public/css/', name: '[name].min.css'}
          },
          'sass-loader'
        ]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new webpack.ProgressPlugin(),
    new CopyWebpackPlugin({
      patterns: [
        { from: './src/public/assets/', to: './public/assets/' },
        { from: './src/views/', to: './views/' },
      ],
    }),
  ],
};
