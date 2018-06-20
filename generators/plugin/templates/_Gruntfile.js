module.exports = function (grunt) {

	// Start out by loading the grunt modules we'll need
	require('load-grunt-tasks')(grunt);

	// Show elapsed time
	require('time-grunt')(grunt);

	grunt.initConfig(
		{

    <% if (true === needsCSS) { %>

      /**
       * Auto-prefix CSS Elements after SASS is processed.
       */
      autoprefixer: {

        options: {
          browsers: ['last 5 versions'],
            map:      true
        },

        files: {
          expand:  true,
            flatten: true,
            src:     ['assets/css/<%= textDomain %>.css'],
            dest:    'assets/css'
        }
      },

      /**
       * Minify CSS after prefixes are added
       */
      cssmin: {

        target: {

          files: [{
            expand: true,
            cwd:    'assets/css',
            src:    ['<%= textDomain %>.css'],
            dest:   'assets/css',
            ext:    '.min.css'
          }]

        }
      },

      /**
       * Process SASS
       */
      sass: {

        dist: {

          options: {
            style:     'expanded',
              sourceMap: true,
              noCache:   true
          },

          files: {
            'assets/css/<%= textDomain %>.css': 'assets/css/scss/<%= textDomain %>.scss'
          }
        }
      },

			/**
			 * Clean existing files
			 */
			clean: {
				styles:  {
					src: [
						'assets/css/*.css',
						'assets/css/*.map'
					]
				},
				scripts: {
					src: [
						'assets/js/*.js',
						'assets/js/*.map'
					]
				}
			},

    <% } %>

    <% if (true === needsJS) { %>

			/**
			 * Processes and compresses JavaScript.
			 */
			uglify: {

				production: {

					options: {
						beautify:         false,
						preserveComments: false,
						sourceMap:        false,
						mangle:           {
							reserved: ['jQuery']
						}
					},

					files: {
						'assets/js/<%= textDomain %>.min.js': [
							'assets/js/src/<%= textDomain %>.js'
						]
					}
				},

				dev: {

					options: {
						beautify:         true,
						preserveComments: true,
						sourceMap:        true,
						mangle:           {
							reserved: ['jQuery']
						}
					},

					files: {
						'assets/js/<%= textDomain %>.js': [
							'assets/js/src/<%= textDomain %>.js'
						]
					}
				}
			},

      /**
       * Clean up the JavaScript
       */
      jshint: {
        options: {
          jshintrc: true
        },
        all:     ['assets/js/src/<%= textDomain %>.js']
      },

    <% } %>

    <% if (true === needsCSS || true === needsJS) { %>

      /**
       * Watch scripts and styles for changes
       */
      watch: {

        options: {
          livereload: true
        },

      <% if (true === needsJS) { %>

        scripts: {

          files: [
            'assets/js/src/*'
          ],

            tasks: ['uglify:production']

        }<% if (true === needsCSS) { %>,<% } %>

      <% } %>

      <% if (true === needsCSS) { %>

        styles: {

          files: [
            'assets/css/scss/*'
          ],

            tasks: ['sass', 'autoprefixer', 'cssmin']

        }

      <% } %>
      }
    <% } %>

			/**
			 * Update translation file.
			 */
			makepot: {

				target: {
					options: {
						type:        'wp-plugin',
						domainPath:  '/languages',
						mainFile:    '<%= textDomain %>.php',
						potFilename: '<%= textDomain %>.pot',
						exclude: ['vendor']
					}
				}
			}
		}
	);

	// A very basic default task.
  grunt.registerTask('default', [<% if (true === needsJS) { %>'jshint', 'uglify:production', 'uglify:dev', <% } %><% if (true === needsCSS) { %>'sass', 'autoprefixer', 'cssmin', <% } %>'makepot']);
  <% if (true === needsCSS || true === needsJS) { %>
  grunt.registerTask('dev', ['default', 'watch']);
  <% } %>

};
