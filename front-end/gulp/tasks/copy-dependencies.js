var gulp = require('gulp');
var replace = require('gulp-replace');
var gulpif = require('gulp-if');
var buildArgs = require('yargs').argv;

gulp.task('copy-dependencies', function() {
  var buildNumber = generateBuildNumber();

  gulp.src('./src/index.html')
  .pipe(gulp.dest('./dist'));

  gulp.src('./src/electron/main.js')
  .pipe(gulpif(buildArgs.teamcity,replace('mainWindow.openDevTools();','')))
  .pipe(gulp.dest('./dist'));

  gulp.src('./src/electron/package.json')
  .pipe(replace('x.y.z', buildNumber))
  .pipe(gulp.dest('./dist'));

  gulp.src('./src/electron/preload.js')
  .pipe(gulp.dest('./dist'));

  gulp.src('./bower_components/mmr-desktop/dist/assets/css/main.css')
  .pipe(gulp.dest('./dist/assets/css'));

  gulp.src('./bower_components/mmr-desktop/dist/assets/images/**/*')
  .pipe(gulp.dest('./dist/assets/images'));

  gulp.src('./bower_components/mmr-desktop/dist/assets/fonts/**/*')
  .pipe(gulp.dest('./dist/assets/fonts'));
});

function generateBuildNumber() {
  var number = '0.0.0-beta+dev-local';
  if(buildArgs.teamcity) {
    number = global.process.env.BUILD_NUMBER;
    if(global.process.env.TEAMCITY_BUILD_BRANCH !== 'master') {
      number += '-beta+' + global.process.env.TEAMCITY_BUILD_BRANCH.replace('_', '-');
    }
  }
  return number;
}