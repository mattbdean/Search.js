module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            build: {
                src: 'src/*.js',
                dest: 'build/script.min.js'
            }
        },
        cssmin: {
            files: {
                expand: true,
                cwd: 'src',
                src: ['*.css'],
                dest: 'build',
                ext: '.min.css'
            }
        },
        copy: {
            main: {
                files: [
                    {
                        src: ['src/index.html'],
                        dest: 'build/index.html'
                    }
                ]
            }
        }
    });
    
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.registerTask('default', ['uglify', 'cssmin', 'copy']);
}