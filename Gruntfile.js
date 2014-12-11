module.exports = function(grunt){

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
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
    concat: {
      js: {
        src: [
          'dev/js/*.js'
        ],
        dest: 
          'dev/tmp/single.js'
      }
    },
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
        },
      },
    },
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', ['concat:js', 'uglify:scripts']);

  grunt.registerTask("hello", function(){
    grunt.log.writeln('Hello World!')
  });
}