/*
 * combine media queries
 */
 
var gulp  	= require('gulp');
var cmq   	= require('gulp-combine-media-queries');
var config 	= require('../config').uncss;

gulp.task('cmq', function () {
  gulp.src(config.css)
    .pipe(cmq({
      log: true
    }))
    .pipe(gulp.dest(config.css));
});


