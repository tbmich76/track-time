var gulp = require('gulp');
var gutil = require('gulp-util');
var webpack = require('webpack');
var path = require('path');
var express = require('express');
var config = require('../config');
var webpackConfig = require(config.webpack.serverConfig);
var webpackMiddleware = require('webpack-dev-middleware');
var webpackHotMiddleware = require('webpack-hot-middleware');
var devServerUrl = 'http://localhost:' + config.webpack.devPort;
var exec = require('child_process').exec;
var os = require('os');

gulp.task('watch', ['dev-server','open-browser']);

gulp.task('dev-server', function() {

  var compiler = webpack(webpackConfig);
  var server = express();

  server.use('/assets',express.static(path.join(webpackConfig.output.path,'assets')));

  server.use(webpackMiddleware(compiler, {
    noInfo: true,
    publicPath: webpackConfig.output.publicPath
  }));

  server.use(webpackHotMiddleware(compiler));

  server.get('*', function(req, res) {
    res.sendFile(path.join(webpackConfig.output.path,'index.html'));
  });

  server.listen(config.webpack.devPort, 'localhost', function(err) {
    if (err) {
      throw new gutil.PluginError('dev-server', err);
    }
    gutil.log('[dev-server]', devServerUrl);
  });
});

gulp.task('open-browser', function() {
  var runChromeCommand = 'start /w chrome.exe --user-data-dir=%temp%';
  if(os.platform() === 'darwin') {
    runChromeCommand = '/Applications/Google\\ Chrome.app/Contents/MacOS/Google\\ Chrome --user-data-dir=/tmp';
  }

  var childProcess = exec(runChromeCommand + ' --test-type --disable-web-security --incognito --window-size=1280,800 ' + devServerUrl, function(err) {
    if(err) {
      console.error('Error running app', err);
      global.app.shutdown(1);
      return;
    }

    global.spawnedProcesses.appHost = undefined;
    global.app.shutdown(0);
  });

  global.spawnedProcesses.appHost = childProcess.pid;
});
