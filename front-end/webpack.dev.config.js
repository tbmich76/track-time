"use strict";

var path = require('path');
var webpack = require('webpack');
var extractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    context: path.join(__dirname, 'src'),
    devtool: 'eval-source-map',
    entry: [
        'webpack-hot-middleware/client?reload=true',
        './index.js'
    ],
    output: {
        path: path.join(__dirname, './dist'),
        publicPath: '/',
        filename: 'bundle.js'
    },

    module: {
        loaders: [
          { test: /\.(woff|png|jpg)$/, loader: 'url-loader?limit=10000' },
          { test: /\.jsx?$/, loader: 'babel', exclude: /node_modules/, include: path.join(__dirname, 'src') },
          { test: /\.less$/, loader: extractTextPlugin.extract('css?sourceMap!less?sourceMap') },
          { test: /\.css$/, loader: extractTextPlugin.extract("style-loader", "css-loader") },
          { test: /\.json$/, loaders: ['json'], exclude: /node_modules/, include: path.join(__dirname, 'src')
        ],
    },

    resolve: {
        extensions: ['', '.js', '.jsx']
    },

    plugins: [
        new extractTextPlugin('bundle.css', {
            allChunks: true
        }),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            jquery: 'jquery'
        })
    ]
};
