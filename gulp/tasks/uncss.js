/*
 * uncss 
 * optimise css with uncss
 */


var gulp 					= require('gulp');
var uncss 				= require('gulp-uncss');
var glob 					= require('glob');
var config 				= require('../config').uncss;
var gulpif       	= require('gulp-if');
var csso        	= require('gulp-csso');

gulp.task('uncss', function() {
    return gulp.src(config.css)
        .pipe(uncss({
            html: 'index.html'
        }))
        .pipe(gulp.dest(config.dest));
});


gulp.task('csso', function() {
    return gulp.src(config.css)
        .pipe(csso())
        .pipe(gulp.dest(config.dest));
});