/*
 * uncss 
 * optimise css with uncss
 */


var gulp 			= require('gulp'),
	uncss 			= require('gulp-uncss'),
	glob 			= require('glob'),
	config 			= require('../config').uncss,
	gulpif       	= require('gulp-if'),
	csso        	= require('gulp-csso');

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