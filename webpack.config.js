const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const path = require('path')

const HTMLWebpackPluginConfig = new HtmlWebpackPlugin({
  template: path.join(__dirname, '/client/index.html'),
  filename: 'index.html',
  inject: 'body'
});

module.exports = {
  entry: [
    './client/index.jsx'
  ],
  module: {
    loaders: [
      { test: /\.jsx$/, include: path.join(__dirname, '/client'), loader: 'babel-loader' }
    ]
  },
  output: {
    filename: 'index_bundle.js',
    path: path.join(__dirname, '/client/dist'),
  },
  plugins: [
    HTMLWebpackPluginConfig,
    new webpack.DefinePlugin({
      'process.env': {
      'NODE_ENV': JSON.stringify('production')
      }
    })
  ]
};
