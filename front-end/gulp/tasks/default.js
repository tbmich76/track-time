var gulp = require('gulp');
var runSequence = require('run-sequence');
var kill = require('tree-kill');
var grace = require ('grace');

gulp.task('default', function(done) {
  runSequence(
    'copy-dependencies',
    ['watch', 'test-watch']
    );
  done();
});

//Gracefully kills spawned processes
global.spawnedProcesses = {
  appHost: undefined,
  pactMockService: undefined
};

setInterval(function() {
  if(gulp.tasks) {
    var t = Object.keys(gulp.tasks);
    for(var i = 0; i < t.length; i++) {
      var task = gulp.tasks[t[i]];
      if(!task.done && task.hasOwnProperty('running')) {
        return;
      }
    }
    global.app.shutdown(0);
  }
}, 2000);

global.killSpawnedProcesses = function(cb) {
  console.log('killing spawned processes', global.spawnedProcesses);
  var spawned = Object.keys(global.spawnedProcesses);

  for(var i = 0; i < spawned.length; i++) {
    var pid = global.spawnedProcesses[spawned[i]];

    if(!pid) {
      continue;
    }

    kill(pid, 'SIGTERM', function(err) {
      if(err) {
        console.error('Error killing', pid, err);
      }
    });
    global.spawnedProcesses[spawned[i]] = undefined;
  }

  setTimeout(cb, 2000);
};

global.app = grace.create();
global.app.on('start', function() {
  //app.shutdown(); //Apparently this is meant to be done on windows however it doesn't work
});

global.app.on('shutdown', function(cb) {
  global.killSpawnedProcesses(cb);
});

global.app.on('error', function(error) {
  console.error('An error occurred', error);
  global.app.shutdown(1);
});
global.app.start();