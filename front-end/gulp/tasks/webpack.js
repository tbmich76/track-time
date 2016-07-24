var gulp = require('gulp');
var gutil = require('gulp-util');
var webpack = require('webpack');
var config = require('../config');
var buildArgs = require('yargs').argv;
var webpackConfig = require(config.webpack.config);

var isProd = function() {
  return buildArgs.ENV === 'production';
};

gulp.task('webpack', function(callback) {
  var buildConfig = Object.create(webpackConfig);
  buildConfig.debug = !isProd();
  buildConfig.devtool = '#source-map';

  if(isProd()) {
    buildConfig.plugins.push(new webpack.DefinePlugin(
        {	'process.env': { 'NODE_ENV': JSON.stringify('production')	}
      }));
    buildConfig.plugins.push(new webpack.optimize.DedupePlugin());
  }

	// run webpack
  webpack(buildConfig, function(err, stats) {
    if(err) {
      throw new gutil.PluginError('webpack', err);
    }

    var statsOutput =  stats.toString({
      colors: true
    });

    if(stats.hasErrors() === true)
    {
      throw new gutil.PluginError('webpack', statsOutput);
    }
    gutil.log('[webpack]', statsOutput);
    callback();
  });
});
