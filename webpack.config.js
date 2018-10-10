const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'build')
  },
  devServer: {
    stats: 'errors-only', // show only errors
    // open: true, // auto open the page in browser
    overlay: true, // show errors in browser
  },
  plugins: [
    new HTMLWebpackPlugin({title: 'Blog  |  Home'})
  ]
}