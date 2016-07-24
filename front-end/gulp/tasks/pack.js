var gulp = require('gulp');
var runSequence = require('run-sequence');

gulp.task('pack', function(done) {
  runSequence(
    'build',
    'create-app',
    function() {
      done();
    });
});
