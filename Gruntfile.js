module.exports = function (grunt) {

    grunt.initConfig({
        src_path:       'src',
        dist_path:      'dist',

        watch: {
            styleWatch: {
                files: '<%= src_path %>/assets/scss/**/*.scss',
                tasks: ['sass:styleDist']
            },
            scriptWatch: {
                files: '<%= src_path %>/assets/js/**/*.js',
                tasks: ['uglify:uglyJsDist']
            },
            dataWatch: {
                files: '<%= src_path %>/assets/data/**/*.json',
                tasks: ['sync']
            },
            imgWatch: {
                files: '<%= src_path %>/assets/img/**/*',
                tasks: ['sync']
            },
            htmlWatch: {
                files: '<%= src_path %>/**/*.html',
                tasks: ['sync']
            },
            
        },

        sass: {
            styleDist: {
                options: {
                    noCache: true,
                    sourcemap: 'none',
                },
                files: {
                    '<%= dist_path %>/assets/css/style.css': '<%= src_path %>/assets/scss/style.scss'
                }
            }
        },

        jshint: {
            checkjs: {
                options: {
                    '-W015': true,
                },
                src: ['<%= src_path %>/assets/js/**/*.js'],
            },
        },

        sync: {
            allSync: {
                files: [{
                  cwd: '<%= src_path %>',
                  src: [
                    '*.html',
                    'assets/data/**/*.json',
                    'assets/img/**/*',
                  ],
                  dest: '<%= dist_path %>',
                }]
            },
        },

        clean: {
            folder: ['<%= dist_path %>/'],
        },

        uglify: {
            options: {
                mangle: false
            },
            uglyJsDist: {
                files: [{
                    expand: true,
                    cwd: '<%= src_path %>/assets/js',
                    src: '**/*.js',
                    dest: '<%= dist_path %>/assets/js'
                }]
            }
        },

        postcss: {
            options: {
                map: false,
                processors: [
                    require('pixrem')(),                                        // add fallbacks for rem units
                    require('autoprefixer')({browsers: 'last 30 versions'}),    // add vendor prefixes
                    require('cssnano')(),                                       // minify the result
                ],
            },
            stylePostDist: {
                src: '<%= dist_path %>/assets/css/style.css'
            }
        },

    });

    // load npm tasks
    grunt.loadNpmTasks('grunt-sync');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-postcss');

    // define default task
    grunt.registerTask('docheck', ['jshint']);
    grunt.registerTask('build', ['sync', 'sass', 'postcss', 'uglify', 'watch']);
    grunt.registerTask('default', ['build']);
};