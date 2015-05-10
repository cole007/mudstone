/*
 * combine media queries
 */
 
var gulp  	= require('gulp');
var cmq   	= require('gulp-combine-media-queries');
var csso   	= require('gulp-csso');
var config 	= require('../config').cmq;

gulp.task('cmq', function () {
  gulp.src(config.css)
    .pipe(cmq({
      log: true
    }))
    .pipe(gulp.dest(config.dest));
});


