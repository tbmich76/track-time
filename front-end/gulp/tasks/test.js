var gulp = require('gulp');
var config = require('../config');
var KarmaServer = require ('karma').Server;
var buildArgs = require('yargs').argv;
var spawn = require('child_process').spawn;
var isWindows = global.process.platform === 'win32';


function runTests(singleRun, done) {
  var serverConfig = {
    configFile: config.karma,
    singleRun: singleRun
  };

  if(buildArgs.teamcity) {
    serverConfig.reporters = ['teamcity'];
  }

  var server = new KarmaServer(
    serverConfig,
    function(exitCode) {
      if (exitCode === 0) {
        done();
      } else {
        console.error('Tests failed with exit code:', exitCode);
        global.app.shutdown(exitCode);
      }
    }
  );
  server.start();
}

gulp.task('test', ['start-pact-mock-provider'], function(done) {
  runTests(true, done);
});

gulp.task('test-watch', ['start-pact-mock-provider'], function(done) {
  runTests(false, done);
});

gulp.task('start-pact-mock-provider', function(done) {
  var childProcess = spawn(
    'pact-mock-service' + (isWindows ? '.bat' : ''),
    [ '-p', '9723', '--pact-dir', config.pactDir, '-l', config.pactLogFile, '--pact-specification-version', '1.1.0' ],
    { detached: true });

  global.spawnedProcesses.pactMockService = childProcess.pid;
  childProcess.unref();
  done();
});
