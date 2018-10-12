const path = require('path');
const webpack = require('webpack')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const nodeModulesPath = path.resolve(__dirname, 'node_modules');
const ASSET_PATH = process.env.ASSET_PATH || '/'

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
      {
        test: /\.html$/,
        exclude: [nodeModulesPath],
        use: [
          {
            loader: 'file-loader',
            options: { name: '[path][name].[ext]', context: 'src' }
          },
          'extract-loader',
          { loader: 'html-loader', options: { minimize: true } },
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
    new webpack.DefinePlugin({
      'process.env.ASSET_PATH': JSON.stringify(ASSET_PATH)
    })
  ]
}