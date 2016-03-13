const webpack = require('webpack')
const path = require('path')

module.exports = {
  entry: './src/main.jsx',
  output: {
    path: __dirname,
    filename: 'build/bundle.js'
  },
  devtool: 'eval',
  module: {
    loaders: [
      {
        test: /\.json?$/,
        loader: 'json',
        include: path.resolve(__dirname, 'data'),
      },
      {
        test: /\.jsx?$/,
        include: path.resolve(__dirname, 'src'),
        loader: 'babel' // 'babel-loader' is also a legal name to reference
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ]
}
