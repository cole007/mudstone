/*
 * jshint
 * run jshint of javascript
 */

var gulp         		= require('gulp'),
	browserSync  		= require('browser-sync'),
	reload				= browserSync.reload,
	jshint       		= require('gulp-jshint'),
	reporter     		= require('jshint-stylish'),
	gulpif			 	= require('gulp-if'),
	notify 			 	= require('gulp-notify'),
	handleErrors 		= require('../util/handleErrors'),
	config       		= require('../config').scripts,
	env 				= require('../config').env	 


gulp.task('jshint', function() {
  return gulp.src(config.hint)
    .pipe(reload({stream: true, once: true}))
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'))
    .pipe(gulpif(!browserSync.active, jshint.reporter('fail')));
});