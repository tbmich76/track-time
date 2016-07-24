var path = require('path');

module.exports = {
  webpack: {
    devPort: 3000,
    serverConfig: path.join(__dirname, '/../', 'webpack.dev.config.js'),
    config: path.join(__dirname, '/../', 'webpack.config.js')
  },
  karma: path.join(__dirname, '/../', 'karma.conf.js'),
  lintDir: ['./src/**/*.js','!./src/libs/*', '!./node_modules/**/*.*'],
  pactDir: path.join(__dirname, '/../', '/tests/pacts'),
  pactLogFile: path.join(__dirname, '/../', '/tests/logs/pact.log')
};