var path = require('path');
var extractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  context: path.join(__dirname, 'src'),
  entry: './index.js',

  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js'
  },

  module: {
    loaders: [
			{ test: /\.less$/, loader: extractTextPlugin.extract('css!less') },
      { test: /\.js$/, loaders: ['babel'], exclude: /node_modules/, include: path.join(__dirname, 'src') },
      { test: /\.json$/, loaders: ['json'], exclude: /node_modules/, include: path.join(__dirname, 'src') }
    ]
  },

  resolve: {
    extensions: ['', '.js']
  },

  plugins: [
    new extractTextPlugin('bundle.css', { allChunks: true })
  ]
};
