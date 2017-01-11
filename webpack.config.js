module.exports = {
  entry: './src/main.jsx',
  output: {
    path: './public/js',
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
       test: /\.jsx?$/, exclude: /node_modules/, loader: 'babel-loader'
      },
      {
        test: /\.scss$/,
        loaders: ["style-loader", "css-loader", "sass-loader"]
      }
    ]
  },

  resolve: {
    extensions: ['', '.js', '.jsx', '.json']
  }
};