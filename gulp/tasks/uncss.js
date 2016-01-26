/*
 * uncss 
 * optimise css with uncss
 */


var gulp 			= require('gulp'),
	uncss 			= require('gulp-uncss'),
	glob 			= require('glob'),
	config 			= require('../config').uncss,
	gulpif       	= require('gulp-if'),
	cssnano         = require('gulp-cssnano');

gulp.task('uncss', function() {
    return gulp.src(config.css)
        .pipe(uncss({
            html: 'index.html'
        }))
        .pipe(gulp.dest(config.dest));
});


gulp.task('cssmin', function() {
    return gulp.src(config.css)
        .pipe(cssnano())
        .pipe(gulp.dest(config.dest));
});