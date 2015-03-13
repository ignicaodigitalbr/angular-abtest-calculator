module.exports = function (grunt) {

  'use strict';

  grunt.initConfig({

    concat: {
        options: {
            separator: ';',
        },
        dist: {
            src: [
                'source/main.js',
                'source/controllers/*.js',
                'source/services/*.js',
            ],
            dest: 'dist/klick-ng-calculator.js',
        }
    }, // concat

    uglify: {

        main: {
            options: {
                sourceMap: true
            },
            files: {
                'dist/klick-ng-calculator.min.js': [
                    'dist/klick-ng-calculator.js'
                ]
            }
        }, // main

    }, // uglify

    eslint: {
      target: [
        'source/**/*.js',
        'spec/**/*.js'
      ]
    },

    watch: {
        options: {
            spawn: false,
            livereload: true
        },
        js: {
            files: [
                'source/main.js',
                'source/controllers/*.js',
                'source/services/*.js'
            ],
            tasks: ['concat', 'uglify']
        }
    } // watch

  });

  // Load all plugins
  require('load-grunt-tasks')(grunt);

  //Tasks
  grunt.registerTask('default', [
    'concat',
    'uglify'
  ]);

  //Watch task
  grunt.registerTask('w', ['watch']);

};
