const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const AssetsPlugin = require('assets-webpack-plugin');

const devMode = process.env.NODE_ENV !== 'production';
const extractTextPlugin =
  new ExtractTextPlugin(devMode ? 'style.css' : 'style.[contenthash].css');

module.exports = {
  entry: ['babel-polyfill', './src/main.jsx'],
  output: {
    path: path.join(__dirname, '/public'),
    filename: devMode ? '[name].js' : '[name].[chunkhash].js',
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
        exclude: /node_modules/,
        use: extractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'sass-loader'],
          publicPath: './public/css',
        }),
      },
      {
        test: /\.s?css$/,
        include: /node_modules/,
        use: extractTextPlugin.extract({
          fallback: 'style-loader',
          use: [{
            loader: 'css-loader',
            options: { importLoaders: true, modules: true },
          }],
          publicPath: './public/css',
        }),
      },
      {
        test: /\.(graphql|gql)$/,
        exclude: /node_modules/,
        loader: 'graphql-tag/loader',
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        BROWSER: JSON.stringify(true),
      },
    }),
    extractTextPlugin,
    new AssetsPlugin({ filename: 'assets.json', prettyPrint: true }),
    new webpack.optimize.CommonsChunkPlugin({
      name: ['vendor'],
    }),
  ],
  node: {
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json'],
  },
};
