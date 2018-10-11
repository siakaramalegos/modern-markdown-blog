const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'build')
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          { loader: 'file-loader', options: { name: '[name].[ext]' } },
          'extract-loader',
          { loader: 'css-loader', options: { sourceMap: true } },
          { loader: 'postcss-loader', options: {
            plugins: () => [
              require('autoprefixer')(),
              require('cssnano')(),
            ],
          }},
        ]
      },
    ],
  },
  devServer: {
    stats: 'errors-only', // show only errors
    // open: true, // auto open the page in browser
    overlay: true, // show errors in browser
  },
  plugins: [
    new CleanWebpackPlugin(['build']),
    new HTMLWebpackPlugin({title: 'Blog  |  Home'})
  ]
}