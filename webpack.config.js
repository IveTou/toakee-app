const path = require('path');
const webpack = require('webpack');
const combineLoaders = require('webpack-combine-loaders');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const _ = require('lodash');

module.exports = {
  entry: './src/main.jsx',
  output: {
    path: path.join(__dirname, '/public/js'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.s?css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'sass-loader'],
          publicPath: './public/css',
        }),
      },
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        GRAPHQL_URI: JSON.stringify('https://graphql-api.herokuapp.com'),
        FACEBOOK_APP_ID: JSON.stringify('1848071472114729'),
        INSTAGRAM_APP_ID: JSON.stringify('e054e2eab38043d78abd577d5800d994'),
        BROWSER: JSON.stringify(true),
      },
    }),
    new ExtractTextPlugin('../css/style.css'),
  ],
  node: {
    fs: 'empty',
    net: 'empty',
    tls: 'empty'
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json']
  }
};
