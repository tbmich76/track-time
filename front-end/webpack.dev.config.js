"use strict";

var path = require('path');
var webpack = require('webpack');
var extractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
	context: path.join(__dirname, 'app'),
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
			// **IMPORTANT** This is needed so that each bootstrap js file required by
			// bootstrap-webpack has access to the jQuery object
			{
				test: /bootstrap\/js\//,
				loader: 'imports?jQuery=jquery'
			},
			// Needed for the css-loader when [bootstrap-webpack](https://github.com/bline/bootstrap-webpack)
			// loads bootstrap's css.
			{
				test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
				loader: "url?limit=10000&minetype=application/font-woff"
			}, {
				test: /\.woff(\d+)?$/,
				loader: 'url-loader?mimetype=application/font-woff'
			},
			{
				test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
				loader: "url?limit=10000&minetype=application/octet-stream"
			}, {
				test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
				loader: "file"
			}, {
				test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
				loader: "url?limit=10000&minetype=image/svg+xml"
			}, {
				test: /\.js$/,
				exclude: /node_modules/,
				loaders: ['react-hot', 'babel']
			}, {
				test: /\.less$/,
				loader: extractTextPlugin.extract('css?sourceMap!less?sourceMap')
			},
		],
	},
	plugins: [
		new extractTextPlugin('bundle.css', {
			allChunks: true
		}),
		new webpack.optimize.OccurenceOrderPlugin(),
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoErrorsPlugin()
	]
};