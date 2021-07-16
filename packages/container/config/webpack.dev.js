const {merge} = require('webpack-merge');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const EnvironmentPlugin = require('webpack/lib/EnvironmentPlugin');

const commonConfig = require('./webpack.common');
const packageJson = require('../package.json');

const port = 8080;
const localdomain = `http://localhost:${port}/`;
const env = "DEV2"

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
          name: 'container',
          remotes: {
            marketing: 'marketing@http://localhost:8081/remoteEntry.js',
            auth: 'auth@http://localhost:8082/remoteEntry.js',
          },
          shared: packageJson.dependencies,
        }),
        new EnvironmentPlugin({
          ENVIRONMENT: 'development'
        })
  
    ],
  };

  module.exports = merge(commonConfig, devConfig);
  