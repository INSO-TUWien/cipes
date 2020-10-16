'use strict';

const webpack = require('webpack');
const path = require('path');

module.exports = {
  devtool: 'cheap-module-source-map',
  entry: [
    require.resolve('babel-polyfill'),
    './src/index'
  ],
  output: {
    path: path.resolve(__dirname, './src/lib'),
    pathinfo: true,
    filename: 'bundle.js',
    devtoolModuleFilenameTemplate: info =>
      path.resolve(info.absoluteResourcePath).replace(/\\/g, '/')
  },
  module: {
    rules: [
      {test: /\.jsx?$/, exclude: /node_modules/, loader: 'babel-loader'}
    ]
  },
  plugins: [
    new webpack.LoaderOptionsPlugin({debug: true}),
    new webpack.NamedModulesPlugin()
  ],
  devServer: {
    historyApiFallback: true,
    proxy: {
      '/api': {
        target: 'http://localhost:48763/',
        secure: false
      },
      '/graphQl': {
        target: 'http://localhost:48763/',
        secure: false
      },
      '/wsapi': {
        target: 'ws://localhost:48763',
        ws: true
      }
    }
  }
};
