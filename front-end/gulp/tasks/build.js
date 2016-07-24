var gulp = require('gulp');
var runSequence = require('run-sequence');

gulp.task('build', function(done) {
  runSequence(
    'clean',
    'webpack',
    'copy-dependencies',
    ['lint', 'test'],
    function() {
      done();
    });
});
