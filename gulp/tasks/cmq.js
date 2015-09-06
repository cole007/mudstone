/*
 * combine media queries
 */
 
var gulp  			= require('gulp'),
	cmq   			= require('gulp-combine-media-queries'),
	csso   			= require('gulp-csso'),
	config 			= require('../config').cmq;

gulp.task('cmq', function () {
  gulp.src(config.css)
    .pipe(cmq({
      log: true
    }))
    .pipe(gulp.dest(config.dest));
});


