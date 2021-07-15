const {merge} = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const commonConfig = require('./webpack.common');
const packageJson = require('../package.json');

const port = 8082;
const localdomain = `http://localhost:${port}/`;

const devConfig = {
    mode: 'development',
    output: {
      publicPath: localdomain,
    },
    devServer: {
      port: port,
      // historyApiFallback: {
      //     index: 'index.html'
      // }
      historyApiFallback: true
    },
    plugins: [
      new ModuleFederationPlugin({
        name: 'auth',
        filename: 'remoteEntry.js',
        exposes: {
          './AuthApp': './src/bootstrap',
        },
        shared: packageJson.dependencies,
      }),
      new HtmlWebpackPlugin({
          template: './public/index.html',
        }),
    ],
  };

  module.exports = merge(commonConfig, devConfig);
  