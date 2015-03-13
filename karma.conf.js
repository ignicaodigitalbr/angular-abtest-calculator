module.exports = function(config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine'],
    files: [
      'bower_components/angular/angular.min.js',
      'node_modules/angular-mocks/angular-mocks.js',
      'source/*.js',
      'source/**/*.js',
      'specs/**/*.js'
    ],
    exclude: [],
    reporters: ['spec', 'coverage'],
    preprocessors: {
      'source/**/*.js': ['coverage']
    },
    coverageReporter: {
      type: 'html',
      dir: 'coverage/'
    },
    port: 8080,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['Chrome'],
    singleRun: false
  });
};
