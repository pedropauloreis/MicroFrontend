const {merge} = require('webpack-merge');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const EnvironmentPlugin = require('webpack/lib/EnvironmentPlugin');
const commonConfig = require('./webpack.common');
const packageJson = require('../package.json');

const domain = process.env.STAGE_DOMAIN;

const prodConfig = {
    mode: 'production',
    output: {
        filename: '[name].[contenthash].js',
        publicPath: '/container/latest/'
    },
    plugins: [
        new ModuleFederationPlugin({
          name: 'container',
          remotes: {
            marketing: `marketing@${domain}/marketing/latest/remoteEntry.js`,
            auth: `auth@${domain}/auth/latest/remoteEntry.js`,
          },
          shared: packageJson.dependencies,
        }),
        new EnvironmentPlugin({
          ENVIRONMENT: 'stage'
        })
  
  
    ],
  };

  module.exports = merge(commonConfig, prodConfig);
  