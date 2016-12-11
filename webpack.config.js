// webpack adapted from @gittheking & @jasonseminara webpack config

'use strict'

const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const BUILD_DIR = path.resolve(__dirname, 'dist');
const APP_DIR = path.resolve(__dirname, 'src');


module.exports = {
  entry: `${APP_DIR}/index.js`,
  output: {
    path: BUILD_DIR,
    filename: '/js/[name].js',
  },
  cache: true,
  debug: true,
  devtool: 'eval-source-map',
  stats: {
    colors: true,
    reasons: true
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
    NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development'),
      },
    }),
    new HtmlWebpackPlugin({
      title: 'ReactJS',
      xhtml: true,
      inject: false,
      template: require('html-webpack-template'),
      appMountId: 'root'
    }),
    new ExtractTextPlugin('/css/[name].css', {
      allChunks: true
    })
  ],

  module: {
    loaders: [
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader')
      },
      {
        test: /\.svg$/,
        loader: 'file-loader?name=/img/[name].[hash:base64:5].[ext]'
      },
      {
        test: /\.gif$/,
        loader: 'file-loader?name=/img/[name].[hash:base64:5].[ext]'
      },
      {
        test: /\.jpg$/,
        loader: 'file-loader?name=/img/[name].[hash:base64:5].[ext]'
      },
      {
        test: /\.(js|jsx)$/,
        loader: 'babel'
      },
      {
        test: /\.otf(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'file-loader?name=/fonts/[name].[ext]'
      }
    ]
  }
};

// if (process.env &&
//   process.env.NODE_ENV &&
//   process.env.NODE_ENV === 'production') {
//   const prodPlugins = [
//     new webpack.optimize.UglifyJsPlugin({
//       compress: {
//         warnings: true,
//       },
//       output: {
//         comments: false,
//       },
//     }),
//     new webpack.optimize.CommonsChunkPlugin('/js/common.js'),
//   ];
//
//   config.plugins = config.plugins.concat(prodPlugins);
//
//   config.cache = false;
//   config.debug = false;
//   config.devtool = undefined;
// }
