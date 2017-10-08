const path = require('path');
const cssNext = require('postcss-cssnext');
const env = require('var');
const { define } = require('var/webpack');

const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const NullPlugin = require('webpack-null-plugin');
const WorkboxPlugin = require('workbox-webpack-plugin');

const BUILD_DIR = './build';
const APP_DIR = './src';
const style = require(`./${APP_DIR}/style`);

module.exports = ({ production } = {}) => ({
  devtool: production ? false : 'inline-source-map',
  context: process.cwd(),
  entry: {
    index: `./${APP_DIR}/index.js`
  },
  output: {
    publicPath: '/',
    path: path.resolve(BUILD_DIR),
    filename: '[name].[chunkhash].js',
    sourceMapFilename: '[name].js.map'
  },
  resolve: {
    extensions: ['.js', '.jsx', '.css']
  },
  module: {
    rules: [
      javascriptRule,
      cssRule,
      assetRule
    ]
  },
  plugins: [
    production ? new CleanWebpackPlugin([`${BUILD_DIR}/*`]) : new NullPlugin(),

    new webpack.optimize.ModuleConcatenationPlugin(),
    new webpack.DefinePlugin(define(env, (envJsonKeys) => ['NODE_ENV', ...envJsonKeys])),

    // `contenthash` is specific to this plugin, we would typically use `chunkhash`
    new ExtractTextPlugin('style.[contenthash].css'),
    new HtmlWebpackPlugin({ template: `./${APP_DIR}/index.ejs`, style }),
    new WorkboxPlugin({
      globDirectory: BUILD_DIR,
      globPatterns: ['**/*.{html,js,css}'],
      swDest: path.resolve(BUILD_DIR, 'service-worker.js')
    })
  ]
});

const javascriptRule = {
  test: /\.jsx?$/,
  loader: 'babel-loader',
  exclude: [/node_modules/],
  query: {
    presets: ['es2015', 'react']
  }
};

const cssRule = {
  test: /\.css$/,
  use: ExtractTextPlugin.extract({
    fallback: 'style-loader',
    use: [
      'css-loader',
      {
        loader: 'postcss-loader',
        options: {
          plugins: [
            cssNext({
              features: {
                autoprefixer: { browsers: ['last 3 versions', '> 1%'] },
                customProperties: { variables: style.css }
              }
            })
          ]
        }
      }
    ]
  })
};

const assetRule = {
  test: /\.(jpe?g|ico|gif|png|svg|wav|mp3|json)$/,
  loader: 'file-loader?name=[name].[ext]'
};
