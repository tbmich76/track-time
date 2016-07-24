var gulp = require('gulp');
var electron = require('gulp-electron');

gulp.task('create-app', function() {
  var packageJson = require('../../dist/package.json');

  return gulp.src('')
  .pipe(electron({
    src: './dist',
    packageJson: packageJson,
    release: './out/release',
    cache: './out/cache',
    version: 'v0.34.2',
    packaging: false,
    platforms: ['win32-ia32'],
    platformResources: {
      win: {
        'version-string': packageJson.version,
        'file-version': packageJson.version,
        'product-version': packageJson.version,
        'icon': 'gulp-electron.ico'
      }
    }
  }))
  .pipe(gulp.dest(''));
});
