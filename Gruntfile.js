'use strict';
module.exports = function (grunt) {

    require('load-grunt-tasks')(grunt);     // Load tasks automatically
    require('time-grunt')(grunt);           // Grunt task time

    var appConfig = {
        app: 'app',
        dist: 'dist'
    };

    grunt.initConfig({
        calendarTM: appConfig,

        // inject bower depedencies in index.html
        wiredep: {

            target: {
                src: [
                    'app/index.html'
                ],
                dependencies: true,
                devDependencies: false
            }
        },

        // grunt server settings
        connect: {
            options: {
                port: 9000,
                hostname: 'localhost',
                livereload: 35729
            },
            livereload: {
                options: {
                    open: true,
                    middleware: function (connect) {
                        return [
                                connect.static('.tmp'),
                                connect().use('/bower_components', 
                                connect.static('./bower_components')
                            ),
                            connect.static(appConfig.app)
                        ];
                    }
                }
            },
            dist: {
                options: {
                    open: true,
                    base: '<%= calendarTM.dist %>'
                }
            }
        },
        less: {
            development: {
                options: {
                    compress: true,
                    optimization: 2
                },
                files: {
                    "app/styles/style.css": "app/less/style.less"
                }
            }
        },
        // watch task that tracks changes
        watch: {
            styles: {
                files: ['app/less/**/*.less'],
                tasks: ['less', 'copy:styles'],
                options: {
                    nospawn: true,
                    livereload: '<%= connect.options.livereload %>'
                }
            },
            js: {
                files: ['<%= calendarTM.app %>/scripts/{,*/}*.js'],
                options: {
                    livereload: '<%= connect.options.livereload %>'
                }
            },
            livereload: {
                options: {
                    livereload: '<%= connect.options.livereload %>'
                },
                files: [
                    '<%= calendarTM.app %>/**/*.html',
                    '.tmp/styles/{,*/}*.css',
                    '<%= calendarTM.app %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
                ]
            }
        },
        uglify: {
            options: {
                mangle: false
            }
        },
        // Clean dist folder
        clean: {
            dist: {
                options: { force: true },
                files: [{
                    dot: true,
                    src: [
                        '.tmp',
                        '<%= calendarTM.dist %>/{,*/}*',
                        '!<%= calendarTM.dist %>/.git*'
                    ]
                }]
            },
            server: {
                options: { force: true },
                files: '.tmp'
            }
        },
        copy: {
            dist: {
                files: [
                    {
                        expand: true,
                        dot: true,
                        cwd: '<%= calendarTM.app %>',
                        dest: '<%= calendarTM.dist %>',
                        src: [
                            '*.html',
                            'views/{,*/}*.html',
                        ]
                    },
                    {
                        expand: true,
                        dot: true,
                        cwd: 'bower_components/font-awesome',
                        src: ['styles/*.*'],
                        dest: '<%= calendarTM.dist %>'
                    },
                    {
                        expand: true,
                        dot: true,
                        cwd: 'bower_components/bootstrap',
                        src: ['styles/*.*'],
                        dest: '<%= calendarTM.dist %>'
                    }
                ]
            },
            styles: {
                expand: true,
                cwd: '<%= calendarTM.app %>/styles',
                dest: '.tmp/styles/',
                src: '{,*/}*.css'
            }
        },
        // Renames files: browser caching
        filerev: {
            dist: {
                src: [
                    '<%= calendarTM.dist %>/scripts/{,*/}*.js',
                    '<%= calendarTM.dist %>/styles/{,*/}*.css',
                ]
            }
        },
        htmlmin: {
            dist: {
                options: {
                    collapseWhitespace: true,
                    conservativeCollapse: true,
                    collapseBooleanAttributes: true,
                    removeCommentsFromCDATA: true,
                    removeOptionalTags: true
                },
                files: [{
                    expand: true,
                    cwd: '<%= calendarTM.dist %>',
                    src: ['*.html', 'views/{,*/}*.html'],
                    dest: '<%= calendarTM.dist %>'
                }]
            }
        },
        useminPrepare: {
            html: 'app/index.html',
            options: {
                dest: 'dist'
            }
        },
        usemin: {
            html: ['dist/index.html']
        }
    });

    // Run live version of app
    grunt.registerTask('dev', [
        'clean:server',
        'copy:styles',
        'connect:livereload',
        'watch'
    ]);

    grunt.registerTask('inject', [
        'wiredep'
    ]);

    grunt.registerTask('prod', [
        'build',
        'connect:dist:keepalive'
    ]);

    grunt.registerTask('build', [
        'clean:dist',
        'less',
        'useminPrepare',
        'concat',
        'copy:dist',
        'cssmin',
        'uglify',
        'filerev',
        'usemin',
        'htmlmin'
    ]);

};
