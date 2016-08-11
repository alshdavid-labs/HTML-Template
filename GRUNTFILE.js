
/****************************************
    0. Grunt Variables
****************************************/



var projectDir = '';
var privateDir = projectDir + 'private'
var publicDir = projectDir + 'public'

var privateStyle = privateDir + '/styles'
var privateJS = privateDir + '/scripts'

var publicStyle = publicDir + '/styles'
var publicJS = publicDir + '/scripts'

/****************************************
    1. Define Grunt Tasks
****************************************/
module.exports = function (grunt) {
      
    // S: Grunt Initiliaze Config
    grunt.initConfig({

/****************************************
    2. Watch Folders Tasks
****************************************/

    watch: {
        options: {
            spawn: false
        },
        watch_sass: {
            files: privateStyle + "/**/*.scss",
            tasks: ['sass']
        },
        watch_javascript: {
            files: privateJS + "/**/*.js",
            tasks: ['uglify']
        },
       watch_home: {
          files: privateDir + '/*.*',
          tasks: ['copy']
       },
    },

/****************************************
    3. Uglify JS  
****************************************/    

    uglify: {
        
        options:{
            sourceMap: false
        },
        javascript: {
            files: [{
                expand: true,
                cwd: privateJS,
                src: ['**/*.js'],
                dest: publicJS
            }]
        }
        
    },				
	
/****************************************
    4. Convert SCSS to CSS
****************************************/    
    
    sass: {
          global: {
            options: {
              sourceMap: false,
              outputStyle: 'compressed'
            },
            files: [{
                expand: true,
                cwd: privateStyle,
                src: ['*.scss'],
                dest: publicStyle,
                ext: '.css'
            },],
          }
        },
    
 /****************************************
    5. Copy site content to public folder
****************************************/   

    copy: {
        main: {
            expand: true,
            cwd: privateDir,
            src: ['**', '!**/scripts/**', '!**/styles/**'],
            dest: publicDir + '/',
        },
    },  


/****************************************
    6. Refresh Browser on changes
****************************************/

    browserSync: {
        bsFiles: {
            src : [publicDir]
        },
        options: {
            server: {
                baseDir: [publicDir]            
            }
        }
    },  
    

    concurrent: {
        target: ['watch', 'browserSync']
    }

    

});

/****************************************
    7. Load Grunt Tasks
****************************************/

	grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-browser-sync');
    require('load-grunt-tasks')(grunt);

/****************************************
    8. Register Default Task
****************************************/
    grunt.registerTask('default', ['concurrent:target']);

};
