'use strict';
// generated on 2015-06-17 using generator-gulp-bootstrap 0.0.4

var gulp = require('gulp');
var gutil = require('gulp-util');
var replace = require('gulp-replace');
var uncss = require('gulp-uncss');
var exec = require('child_process').exec;

// load plugins
var $ = require('gulp-load-plugins')();

gulp.task('styles', function () {
    return gulp.src(['sass/main.scss', 'sass/shelf.scss', 'sass/alma.scss'])
        .pipe($.sass({errLogToConsole: true}))
        .pipe($.autoprefixer('last 1 version'))
        .pipe(gulp.dest('css'))
        .pipe($.size())
        .pipe($.notify("Compilation complete."));
});

gulp.task('absolute_urls', ['styles'], function(){
    gulp.src(['css/main.css'])
        .pipe(replace('../images/', 'http://nextbase.github.io/primo-suit/images/'))
        .pipe(replace('../fonts/', 'http://nextbase.github.io/primo-suit/fonts/'))
        .pipe(replace('../css/images/', 'http://nextbase.github.io/primo-suit/images/old/'))
        .pipe(gulp.dest('./css/build'));
        // .pipe(uncss({ html: ['html_sources/**/*.html'] })) // place before gulp.dest
        
});

gulp.task('clean', function () {
    return gulp.src(['css/main.css', 'dist'], { read: false }).pipe($.clean());
});

gulp.task('build', ['styles', 'absolute_urls']);

gulp.task('default', ['clean', 'build'], function () {
    gulp.start('watch');
});

gulp.task('push', function (cb) {
    exec('./deploy', function (err, stdout, stderr) {
        console.log(stdout);
        console.log(stderr);
        cb(err);
    });
});

gulp.task('watch', function () {
    // watch for changes
    gulp.watch('sass/**/*.scss', ['styles']);
});
