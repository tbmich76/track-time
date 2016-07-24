var gulp = require('gulp');
var eslint = require('gulp-eslint');
var config = require('../config');
var teamcityReporter = require('gulp-eslint-teamcity-formatter');
var buildArgs = require('yargs').argv;

gulp.task('lint', function() {

  var formater = buildArgs.teamcity ? teamcityReporter : 'stylish';

  return gulp.src(config.lintDir)
    .pipe(eslint())
    .pipe(eslint.format(formater))
    .pipe(eslint.failAfterError());
});
