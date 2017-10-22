module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    svgstore: {
      options: {
        prefix: 'icon-', // This will prefix each ID
        svg: { // will be added as attributes to the resulting SVG
          class : 'svgstore'
        },
        includedemo: '{{#each icons}}<li><svg><use xlink:href="#{{name}}" /></svg><pre>&lt;svg&gt&lt;use xlink:href=&quot;#{{name}}&quot; /&gt&lt;/svg&gt</pre></li>{{/each}}',
      },
      default : {
        files: {
          'templates/includes/icons.svg': ['assets/icons/*.svg'],
        },
      },
    },

    sass: {
      dist: {
        files: [{
          expand: true,
          cwd: 'assets/scss',
          src: ['*.scss'],
          dest: 'assets/css',
          ext: '.css'
        }]
      }
    },

    postcss: {
      options: {
        map: true,
        processors: [
          require('autoprefixer')
        ]
      },
      dist: {
        src: 'assets/css/*.css'
      }
    },

    modernizr: {
      dist: {
        "crawl": false,
        "customTests": [],
        "dest": "assets/js/modernizr.js",
        "tests": [
          "cssmask",
          "flexboxtweener"
        ],
        "options": [
          "setClasses"
        ],
        "uglify": true
      }
    },

		watch: {
			css: {
				files: '**/*.scss',
				tasks: ['sass', 'postcss:dist']
			},
      icons: {
				files: 'assets/icons/*.svg',
				tasks: ['svgstore']
			}
		}
  });

  // Load the plugins
  grunt.loadNpmTasks('grunt-svgstore');
  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-postcss');
  grunt.loadNpmTasks("grunt-modernizr");

  grunt.registerTask('icons', ['svgstore']);
  grunt.registerTask('default',['watch']);

};
