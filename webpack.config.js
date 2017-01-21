const webpack = require('webpack');
const combineLoaders = require('webpack-combine-loaders');

module.exports = {
  entry: './src/main.jsx',
  output: {
    path: './public/js',
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      { test: /\.json$/, loader: 'json' },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel'
      },
      {
        test: /\.scss$/,
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
      'process.env': {
        'FACEBOOK_APP_ID': JSON.stringify('1848071472114729'),
      },
    }),
  ],
  resolve: {
    extensions: ['', '.js', '.jsx', '.json']
  }
};
