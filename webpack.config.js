const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'build')
  },
  plugins: [
    new HTMLWebpackPlugin({title: 'Sia.Studio  |  Home'})
  ]
}