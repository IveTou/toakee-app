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
  resolve: {
    extensions: ['', '.js', '.jsx', '.json']
  }
};
