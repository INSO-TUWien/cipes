'use strict';

const webpack = require('webpack');
const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  devtool: 'cheap-module-source-map',
  entry: [
    require.resolve('@babel/polyfill'),
    require.resolve('bootstrap'),
    './ui/',
    './db.json'
  ],
  output: {
    path: path.resolve(__dirname, './ui/assets'),
    pathinfo: true,
    filename: 'bundle.js',
    publicPath: 'assets',
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
    new webpack.NamedModulesPlugin(),
    new CopyWebpackPlugin([
      {
        from: './db.json'
      }
    ]),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery',
      Popper: ['popper.js', 'default']
    })
  ]
};
