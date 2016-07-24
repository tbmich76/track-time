var config = require('./config');
var del = require('del');
var gulp = require('gulp');
var gutil = require('gulp-util');
var webpack = require('webpack');
var path = require('path');
var express = require('express');
var webpackConfig = require(config.webpack.config);
var serverConfig = require(config.webpack.serverConfig);
var webpackMiddleware = require('webpack-dev-middleware');
var webpackHotMiddleware = require('webpack-hot-middleware');
var exec = require('child_process').exec;
var os = require('os');
var _ = require('lodash');
var $ = require('gulp-load-plugins')();
// var opn = require('opn');
var marked = require('marked');
var part = require('code-part');
var runSequence = require('run-sequence');
// var gulpreplace = require('gulp-replace');
// var gulpif = require('gulp-if');

// ### task clean
// Cleans up dist directory using [del](https://github.com/sindresorhus/del).
gulp.task("clean", function (done) {
  return del(["dist/*"]);
});

gulp.task('copy-dependencies', function () {

  gulp.src('./src/index.html')
    .pipe(gulp.dest('./dist'));

  gulp.src('./bower_components/bootstrap/dist/css/bootstrap.min.css')
    .pipe(gulp.dest('./dist/bootstrap/css'));

  gulp.src('./bower_components/bootstrap/dist/css/bootstrap.min.css.map')
    .pipe(gulp.dest('./dist/bootstrap/css'));

  gulp.src('./bower_components/bootstrap/dist/fonts/*')
    .pipe(gulp.dest('./dist/bootstrap/fonts'));

  gulp.src('./bower_components/bootstrap/dist/js/bootstrap.min.js')
    .pipe(gulp.dest('./dist/bootstrap/js'));

  gulp.src('./bower_components/jquery/dist/jquery.min.js')
    .pipe(gulp.dest('./dist/jquery'));
});

gulp.task('build', function (done) {
  runSequence(
    'clean',
    'webpack',
    'copy-dependencies',
    function () {
      done();
    });
});

gulp.task('dev-server', ['build'], function () {

  var compiler = webpack(serverConfig);
  var server = express();

  server.use('/jquery', express.static(path.join(webpackConfig.output.path, 'jquery')));
  server.use('/bootstrap', express.static(path.join(webpackConfig.output.path, 'bootstrap')));

  server.use(webpackMiddleware(compiler, {
    noInfo: true,
    publicPath: serverConfig.output.publicPath
  }));

  server.use(webpackHotMiddleware(compiler));

  server.get('*', function (req, res) {
    res.sendFile(path.join(serverConfig.output.path, 'index.html'));
  });

  server.listen(config.webpack.devPort, 'localhost', function (err) {
    if (err) {
      throw new gutil.PluginError('dev-server', err);
    }
    gutil.log('[dev-server]', 'http://localhost:' + config.webpack.devPort);
  });
});

gulp.task('webpack', function () {
  var buildConfig = Object.create(webpackConfig);
  buildConfig.debug = true;
  buildConfig.devtool = '#source-map';

  // run webpack
  webpack(buildConfig, function (err, stats) {
    if (err) {
      throw new gutil.PluginError('webpack', err);
    }

    var statsOutput = stats.toString({
      colors: true
    });

    if (stats.hasErrors() === true) {
      throw new gutil.PluginError('webpack', statsOutput);
    }
    gutil.log('[webpack]', statsOutput);
  });
});

// gulp.task('open-browser', function() {
//   var runChromeCommand = 'start /w chrome.exe --user-data-dir=%temp%';
//   if(os.platform() === 'darwin') {
//     runChromeCommand = '/Applications/Google\\ Chrome.app/Contents/MacOS/Google\\ Chrome --user-data-dir=/tmp';
//   }

//   var childProcess = exec(runChromeCommand + ' --test-type --disable-web-security --incognito --window-size=1280,800 ' + devServerUrl, function(err) {
//     if(err) {
//       console.error('Error running app', err);
//       global.app.shutdown(1);
//       return;
//     }

//     global.spawnedProcesses.appHost = undefined;
//     global.app.shutdown(0);
//   });

//   global.spawnedProcesses.appHost = childProcess.pid;
// });

//   // ## Tasks

//   // ### task clean
//   // Cleans up dist directory using [del](https://github.com/sindresorhus/del).
//   gulp.task("clean", function (done) {
//     del(["dist/*"], done);
//   });

// 	gulp.task('webpack', function (callback) {
// 	var buildConfig = Object.create(webpackConfig);
// 	buildConfig.devtool = '#source-map';

// 		// run webpack
// 	webpack(buildConfig, function (err, stats) {
// 		if (err) {
// 			throw new gutil.PluginError('webpack', err);
// 		}

// 		var statsOutput = stats.toString({
// 			colors: true
// 		});

// 		if (stats.hasErrors() === true) {
// 			throw new gutil.PluginError('webpack', statsOutput);
// 		}
// 		gutil.log('[webpack]', statsOutput);
// 		callback();
// 	});
// });

// });