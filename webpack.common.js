const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const FaviconsWebpackPlugin = require('favicons-webpack-plugin')

module.exports = {
  entry: {
    index: './src/index.js',
    code: './src/js/code.js',
    mediation: './src/js/mediation.js',
    medias: './src/js/medias.js',
  },
  output: {
    filename: '[name].js',
    path: __dirname + '/dist',
    clean: true,
    assetModuleFilename: 'images/[hash][ext][query]',
  },

  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [
          // Creates `style` nodes from JS strings
          'style-loader',
          // Translates CSS into CommonJS
          'css-loader',
          // Compiles Sass to CSS
          'sass-loader',
        ],
      },
      // will load the images
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
      // will load the html (including images)
      {
        test: /\.html$/i,
        loader: 'html-loader',
      },
      // will load the fonts
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
      },
    ],
  },
  plugins: [
    new webpack.ProgressPlugin(),
    new FaviconsWebpackPlugin('src/images/favicon.svg'),
    new HtmlWebpackPlugin({
      template: './src/index.html',
      inject: true,
      chunks: ['index'],
      filename: 'index.html',
    }),
    new HtmlWebpackPlugin({
      template: './src/code-login.html',
      inject: true,
      chunks: ['code'],
      filename: 'code-login.html',
    }),
    new HtmlWebpackPlugin({
      template: './src/mediation.html',
      inject: true,
      chunks: ['mediation'],
      filename: 'mediation.html',
    }),
    new HtmlWebpackPlugin({
      template: './src/medias.html',
      inject: true,
      chunks: ['medias'],
      filename: 'medias.html',
    }),
  ],
}
