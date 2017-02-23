let HtmlWebpackPlugin = require('html-webpack-plugin')

let HTMLWebpackPluginConfig = new HtmlWebpackPlugin({
  template: __dirname + '/client/index.html',
  filename: 'index.html',
  inject: 'body'
});

module.exports = {
  entry: [
    './client/index.jsx'
  ],
  module: {
    loaders: [
      {test: /\.jsx$/, include: __dirname + '/client', loader: "babel-loader"}
    ]
  },
  output: {
    filename: "index_bundle.js",
    path: __dirname + '/client/dist'
  },
  plugins: [HTMLWebpackPluginConfig]
};
