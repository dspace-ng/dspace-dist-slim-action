module.exports = function(grunt) {

  //Project configuration.
  grunt.initConfig({
    //pkg: grunt.file.readJSON('package.json'),
    connect: {
      app: {
        options: {
          port: 8000,
          hostname: "*",
          livereload: true
        }
      },
      doc: {
        options: {
          port: 8001,
          hostname: "*",
          base: 'tmp/doc',
          livereload: 35730
        }
      }
    },
    watch: {
      options: {
        livereload: true
      },
      scripts: {
        files: ["js/**", "node_modules/dspace*/**"],
        tasks: ["jshint", 'browserify:main']
      },
      templates: {
        files: "templates/*.hbs",
        tasks: ["jshint"]
      },
      doc: {
        files: "README.md",
        tasks:["markdown"],
        options: {
          livereload: 35730
        }
      }
    },
    markdown: {
      all: {
        files: [
          {
            src: 'README.md',
            dest: 'tmp/doc/README.md.html'
          }
        ]
      }
    },
    jshint: {
      all: ["Gruntfile.js", "js/**"]
    },
    browserify: {
      vendor: {
        src: [
          'bower_components/zepto/zepto.js',
          'bower_components/leaflet-dist/leaflet-src.js',
          'bower_components/lodash/dist/lodash.js',
          'bower_components/backbone/backbone.js',
          'bower_components/faye/include.js',
        ],
        dest: 'tmp/vendor.js',
        options: {
          shim: {
            zepto: {
              path: 'bower_components/zepto/zepto.js',
              exports: '$'
            },
            leaflet: {
              path: 'bower_components/leaflet-dist/leaflet-src.js',
              exports: 'L'
            },
            underscore: {
              path: 'bower_components/lodash/dist/lodash.js',
              exports: '_'
            },
            backbone: {
              path: 'bower_components/backbone/backbone.js',
              exports: 'Backbone'
            },
            faye: {
              path: 'bower_components/faye/include.js',
              exports: 'Faye'
            },
          }
        }
      },
      main: {
        src: ['js/main.js'],
        dest: 'tmp/main.js',
        options: {
          external: ["$", "L", "_", "Backbone", "Faye"],
          transform: ['hbsfy'],
          debug: true
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-markdown');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-browserify');

  // Default task(s).
  grunt.registerTask('default', ['markdown', 'jshint', 'browserify', 'connect', 'watch']);

};
