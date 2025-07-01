const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const Dotenv = require('dotenv-webpack');
require('dotenv').config();

const deps = require('./package.json').dependencies;

console.log('SHELL_REMOTE:', process.env.SHELL_REMOTE);

module.exports = {
  entry: './src/index.jsx',
  mode: 'development',
  devServer: {
    port: 3100,
    historyApiFallback: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
      'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization',
    },
    static: { directory: path.join(__dirname, 'public') },
  },
  output: {
    publicPath: 'auto',
    clean: true,
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env',
              '@babel/preset-react',
            ],
          },
        },
      },
    ],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'shell',
      filename: 'remoteEntry.js',
      remotes: {
        shell: `shell@${process.env.SHELL_REMOTE}`,
        auth: `auth@${process.env.AUTH_REMOTE}`,
        dashboard: `dashboard@${process.env.DASH_REMOTE}`,
      },
      exposes: {
        './store': './src/application/context/AuthContext.js',
      },
      shared: {
        react: {
          singleton: true,
          eager: true,
          requiredVersion: '^19.1.0',
        },
        'react-dom': {
          singleton: true,
          eager: true,
          requiredVersion: '^19.1.0',
        },
        'react-router-dom': {
          singleton: true,
          eager: true,
          requiredVersion: '^7.6.3',
        },
        zustand: {
          singleton: true,
          eager: true,
          requiredVersion: deps['zustand'],
        },
      },
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
    new Dotenv(),
  ],
};
