var config = require('./config');
var del = require('del');
var gulp = require('gulp');
var gutil = require('gulp-util');
var webpack = require('webpack');
var path = require('path');
var express = require('express');
var webpackConfig = require(config.webpack.serverConfig);
var webpackMiddleware = require('webpack-dev-middleware');
var webpackHotMiddleware = require('webpack-hot-middleware');
var exec = require('child_process').exec;
var os = require('os');
var _ = require('lodash');
var $ = require('gulp-load-plugins')();
// var opn = require('opn');
var marked = require('marked');
var part = require('code-part');

// Sources for generating `index.html`.
  var IndexSources = [
    './app/index.js',
    './app/index.html',
    './webpack.dev.config.js',
    './gulpfile.js',
    './app/style.less',
    './bootstrap.config.less',
    './bootstrap.config.js'
  ];

  // ## Helper Functions

  // ### highlight

  // Returns code with [google-code-prettify](https://code.google.com/p/google-code-prettify/)
  // markup setup to use line numbers started at specified line. Used in both docco and
  // doccoHtml to add prettify markup to the code sections of the docs.
  var highlight = function (code, startLine) {
    var html = '<?prettify';
    if (_.isNumber(startLine))
      html += ' linenums=' + startLine;
    html += '><pre class="prettyprint">' + _.escape(code) + '</pre>'
    return html;
  };
  // Setup marked to use our highlighter.
  marked.setOptions({ highlight: highlight });

  // ### docco

  // [code-part](http://github.com/bline/code-part) To parse out code/docs
  // and [marked](https://github.com/chjj/marked) to format the docs.
  // marked is manually applied because we are using
  // [google-code-prettify](https://code.google.com/p/google-code-prettify/)
  // to highlight code.
  var docco = function (path, code, config) {
    var sections = part(path, code, config);
    _.forEach(sections, function (section) {
      section.codeHtml = highlight(section.codeText, section.codeLine);
      section.docsHtml = marked(section.docsText);
    });
    return sections;
  }



// gulp.task('watch', ['dev-server','open-browser']);

// ### task clean
// Cleans up dist directory using [del](https://github.com/sindresorhus/del).
gulp.task("clean", function(done) {
	del(["dist/*"], done);
});



 // ### task index
  // Build's the index file with documentation from [docco](http://jashkenas.github.io/docco/)
  // with the `index.html` [lodash template](https://lodash.com/docs#template).
  gulp.task("build", [], function (done) {
    var docs = [];
    gulp.src(IndexSources)
      .pipe($.tap(function (file) {
        docs.push({
          file: file,
          docco: docco(file.path, file.contents.toString()),
          id: _.uniqueId('file-')
        })}))
      // After we've created the `docs` array, build the template.
      .on('end', function () {
        gulp.src('./app/index.html')
          .pipe($.template({ docs: docs }))
          .pipe(gulp.dest('dist'))
          .on('end', function () { done() })
      });
  });

gulp.task('dev-server', ['build'], function() {

	var compiler = webpack(webpackConfig);
	var server = express();

	server.use(webpackMiddleware(compiler, {
		noInfo: true,
		publicPath: webpackConfig.output.publicPath
	}));

	server.use(webpackHotMiddleware(compiler));

	server.get('*', function(req, res) {
		res.sendFile(path.join(webpackConfig.output.path, 'index.html'));
	});

	server.listen(config.webpack.devPort, 'localhost', function(err) {
		if (err) {
			throw new gutil.PluginError('dev-server', err);
		}
		gutil.log('[dev-server]', 'http://localhost:' + config.webpack.devPort);
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