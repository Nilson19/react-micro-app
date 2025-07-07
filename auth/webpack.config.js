const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const Dotenv = require('dotenv-webpack');
require('dotenv').config();

const deps = require('./package.json').dependencies;

console.log('SHELL_REMOTE:', process.env.SHELL_REMOTE);

module.exports = {
    entry: './src/index.js',
    mode: 'development',
    devServer: {
        port: 3101,
        historyApiFallback: true,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
            'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization',
        },
    },
    output: {
        publicPath: 'auto',
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
            name: 'auth',
            filename: 'remoteEntry.js',
            remotes: {
                shell: `shell@${process.env.SHELL_REMOTE}`,
            },
            exposes: {
                './AuthApp': './src/App.jsx',
            },
            shared: {
                react: { singleton: true, eager: false, requiredVersion: deps.react },
                'react-dom': { singleton: true, eager: false, requiredVersion: deps['react-dom'] },
                'react-router-dom': { singleton: true, eager: false, requiredVersion: deps['react-router-dom'] },
            },
        }),
        new HtmlWebpackPlugin({
            template: './public/index.html',
        }),
        new Dotenv(),
    ],
};
