var config = require('./config');
var del = require('del');
var gulp = require('gulp');
var gutil = require('gulp-util');
var open = require('gulp-open');
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
gulp.task("clean", function(done) {
    return del(["dist/*"]);
});

gulp.task('copy-dependencies', function() {

    gulp.src('./src/index.html')
        .pipe(gulp.dest('./dist'));
});

gulp.task('build', function(done) {
    runSequence(
        'clean',
        'webpack',
        'copy-dependencies',
        function() {
            done();
        });
});

gulp.task('webpack-dev', ['build'], function() {

    var compiler = webpack(serverConfig);
    var server = express();

    server.use(webpackMiddleware(compiler, {
        noInfo: true,
        publicPath: serverConfig.output.publicPath
    }));

    server.use(webpackHotMiddleware(compiler));

    server.get('*', function(req, res) {
        res.sendFile(path.join(serverConfig.output.path, 'index.html'));
    });

    server.listen(config.webpack.devPort, 'localhost', function(err) {
        if (err) {
            throw new gutil.PluginError('dev-server', err);
        }
        gutil.log('[dev]', 'http://localhost:' + config.webpack.devPort);
    });
});

gulp.task('dev', ['webpack-dev','open-browser']);

gulp.task('webpack', function() {
    var buildConfig = Object.create(webpackConfig);
    buildConfig.debug = true;
    buildConfig.devtool = '#source-map';

    // run webpack
    webpack(buildConfig, function(err, stats) {
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

gulp.task('open-browser', function() {
    var options = {
        uri: 'http://localhost:' + config.webpack.devPort,
        app: 'google chrome'
    };
    gulp.src(__filename)
        .pipe(open(options));
});
