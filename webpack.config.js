const webpack = require('webpack');
const combineLoaders = require('webpack-combine-loaders');
const _ = require('lodash');

const pickEnv = vars => vars.reduce(
  (obj, envVar) => _.merge(obj, { [envVar]: JSON.stringify(process.env[envVar]) }),
  { BROWSER: true }
);

module.exports = {
  entry: './src/main.jsx',
  output: {
    path: './public/js',
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      { test: /\.json$/, loader: 'json-loader' },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel'
      },
      {
        test: /\.s?css$/,
        loader: combineLoaders([
          { loader: 'style-loader' },
          {
            loader: 'css-loader',
            query: { modules: true, localIdentName: '[local]' },
          },
          { loader: 'sass-loader' },
        ]),
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': pickEnv([
        'FACEBOOK_APP_ID',
        'INSTAGRAM_APP_ID',
      ]),
    }),
  ],
  node: {
    fs: 'empty',
    net: 'empty',
    tls: 'empty'
  },
  resolve: {
    extensions: ['', '.js', '.jsx', '.json']
  }
};
