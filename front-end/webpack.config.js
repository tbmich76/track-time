var path = require('path');
var webpack = require('webpack');
var extractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    context: path.join(__dirname, 'src'),
    entry: './index.js',

    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'bundle.js'
    },

    module: {
        loaders: [{
            test: /\.less$/,
            loader: extractTextPlugin.extract('css!less')
        },
        { test: /\.css$/, loader: extractTextPlugin.extract("style-loader", "css-loader") },
         {
            test: /\.jsx?$/,
            loaders: ['babel'],
            exclude: /node_modules/,
            include: path.join(__dirname, 'src')
        }, {
            test: /\.json$/,
            loaders: ['json'],
            exclude: /node_modules/,
            include: path.join(__dirname, 'src')
        }]
    },

    resolve: {
        extensions: ['', '.js', '.jsx']
    },

    plugins: [
        new extractTextPlugin('bundle.css', {
            allChunks: true
        }),
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            jquery: 'jquery'
        })
    ]
};
