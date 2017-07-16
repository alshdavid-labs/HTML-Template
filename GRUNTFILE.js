/*
    Terminal Usage:
    
    'grunt' - minifies and compiles TypeScript and JavaScript and launches browserSync
    'grunt watch' - minifies and compiles TypeScript and JavaScript
    'grunt browserSync' - watches changes to the public directory and syncs it with the browser

*/

var path = require('path')
var fs = require('fs')

var privateDir = path.resolve('src')
var publicDir = path.resolve('dist')

if (!fs.existsSync(  publicDir )){
    fs.mkdirSync( publicDir );
}   


module.exports = function (grunt) {
      
    // S: Grunt Initiliaze Config
    grunt.initConfig({

/****************************************
    Watch Folders Tasks
****************************************/

    watch: {
        options: {
            spawn: false
        },
        default : {
            files: ["src/*", "src/**", "src/**/*.*"],
            tasks: ['clean', 'sass', 'copy', 'includes', 'autoprefixer'],
            options: {
                spawn: false,
            },
        }    
    },		
	
/****************************************
    Convert SCSS to CSS
****************************************/    
    sass: {
		options: {
            //outputStyle: 'compressed'
		},
		dist: {
			files: {
                'dist/css/index.css' : 'src/scss/index.scss'
			}
		}
	},

    autoprefixer: {
        options: {
            map: true,
            browsers: ['> 0.5%', 'last 2 versions', 'Firefox ESR', 'Opera 12.1']
        },
        dist: {
            src: 'dist/css/index.css',
            dest: 'dist/css/index.css'
        }
    },
    
 /****************************************
    Copy site content to public folder
****************************************/   

    copy: {
        main: {
            expand: true,
            cwd: 'src',
            src: ["*", "**", '!**/scss/**', '!**/partials/**'],
            dest: 'dist/',
        },
    },  

    clean: {
        contents : ['dist/*']
    },

    includes: {
        files: {
            src: ['**/*.html', '!**/partials/**'],
            dest: 'dist',
            cwd: 'src',
            options: {
                includeRegexp: /^(\s*)&&include\s+"(\S+)"\s*$/,
                silent: true,
                banner: '<!-- I am a banner <% includes.files.dest %> -->'
            }
        }
    },


/****************************************
    Refresh Browser on changes
****************************************/

    //doesn't work tho
    //
    // browserSync: {
    //     bsFiles: {
    //         src : ['dist']
    //     },
    //     options: {
    //         server: {
    //             baseDir: ['dist']            
    //         },
    //         notify:{
    //             styles: {
    //                 display: 'none',
    //                 top: 'auto',
    //                 bottom: '0',
    //                 height: 'auto',
    //                 opacity: '0',
    //                 "border-radius" : "0px"
    //             }
    //         }
    //     }
    // },  

    concurrent: {
        target: ['build', 'watch', 'browserSync']
    }
});

/****************************************
    7. Load Grunt Tasks
****************************************/

	grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-browser-sync');
    grunt.loadNpmTasks('grunt-autoprefixer');
    grunt.loadNpmTasks('grunt-includes');
    //grunt.loadNpmTasks("grunt-ts");
    require('load-grunt-tasks')(grunt);

/****************************************
    8. Register Default Task
****************************************/
    // grunt.registerTask('default', ['concurrent:target']);
    grunt.registerTask('default', ['build', 'watch']);
    grunt.registerTask('build', ['clean', 'sass', 'copy', 'includes', 'autoprefixer']);
};
