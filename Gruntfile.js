module.exports = function(grunt){

  // load up all of the necessary grunt plugins
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-express-server');
  grunt.loadNpmTasks('grunt-karma');
  grunt.loadNpmTasks('grunt-casperjs');
  grunt.loadNpmTasks('grunt-mocha');

  // grunt setup
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    // what files should be linted
    jshint: {
            all: {
                src: 'dev/js/*.js',
                options: {
                    bitwise: true,
                    camelcase: true,
                    curly: true,
                    eqeqeq: true,
                    forin: true,
                    immed: true,
                    indent: 4,
                    latedef: true,
                    newcap: true,
                    noarg: true,
                    noempty: true,
                    nonew: true,
                    quotmark: 'single',
                    regexp: true,
                    undef: true,
                    unused: true,
                    trailing: true,
                    maxlen: 120
                }
            }
        },

    // create a task called clean, which
    // deletes all files in the listed folders
    clean: {
      dist: 'dist/*',
      results: 'results/*'
    },
    concat: {
      js: {
        src: [
          'dev/js/*.js'
        ],
        dest:
          'dev/tmp/single.js'
      }
    },


    karma: {
      unit: {
        configFile: './karma.conf.js'
      },
      watch: {
        configFile: './karma.conf.js',
        autoWatch: true
      }
    },

     // uglify the files
    uglify: {
      scripts: {
        options: {
          // the banner is inserted at the top of the output
          banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
        },
        files: {
          'public/js/app.min.js': ['dev/tmp/single.js']
        }
      }
  //     src: {
  //       files: {
  //         'src/tmp/script1.min.js': ['src/js/script1.js']
  //       }
  //     },
  //     test: {
  //       src: 'src/js/script2.js',
  //       dest: 'src/tmp/script2.min.js'
  //     }
    },
    watch: {
      scripts: {
        files: ['dev/js/*.js'],
        tasks: ['default'],
        options: {
          spawn: false,
        }
      },
      gruntfile: {
        files: 'Gruntfile.js',
        tasks: 'jshint:gruntfile'
      },
      client: {
        files: [ 'client/**' ],
        tasks: [ 'build', 'karma:watch:run', 'casperjs' ]
      },
      server: {
        files: [ 'server/**' ],
        tasks: [ 'build', 'express:dev', 'casperjs' ],
        options: {
          spawn: false // Restart server
        }
      },
      unitTests: {
        files: [ 'test/unit/**/*.js' ],
        tasks: [ 'karma:watch:run' ]
      },
      integrationTests: {
        files: [ 'test/integration/**/*.js' ],
        tasks: [ 'karma:watch:run' ]
      },
      e2eTests: {
        files: [ 'test/e2e/**/*.js' ],
        tasks: [ 'casperjs' ]
      }
    },

    // configure the server
    express: {
      dev: {
        options: {
          script: 'index.js'
        }
      }
    },

    // configure karma
    karma: {
      options: {
        configFile: 'karma.conf.js',
        reporters: ['progress', 'coverage']
      },
      // Watch configuration
      watch: {
        background: true,
        reporters: ['progress']
      },
      // Single-run configuration for development
      single: {
        singleRun: true,
      },
      // Single-run configuration for CI
      ci: {
        singleRun: true,
        coverageReporter: {
          type: 'lcov',
          dir: 'results/coverage/'
        }
      }
    },

    // configure casperjs
    casperjs: {
      options: {},
      e2e: {
        files: {
          'results/casper': 'test/e2e/**/*.js'
        }
      }
    },
  });

  // Perform a build
  grunt.registerTask('build', [ 'jshint', 'clean', 'copy', 'concat', 'uglify']);

  // Run e2e tests once
  grunt.registerTask('teste2e', [ 'express:dev', 'casperjs' ]);

  // Run client tests once
  grunt.registerTask('testClient', [ 'karma:single' ]);

  // Run all tests once
  grunt.registerTask('test', [ 'testClient', 'teste2e']);

  // Run all tests once
  grunt.registerTask('ci', [ 'karma:ci', 'express:dev', 'casperjs' ]);


  grunt.registerTask('default', ['concat:js', 'uglify:scripts']);
};
