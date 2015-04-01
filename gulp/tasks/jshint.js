/*
 * jshint
 * run jshint of javascript
 */

var gulp         = require('gulp');
var browserSync  = require('browser-sync');
var reload			 = browserSync.reload;
var jshint       = require('gulp-jshint');
var reporter     = require('jshint-stylish');
var gulpif			 = require('gulp-if');
var notify 			 = require('gulp-notify');
var handleErrors = require('../util/handleErrors');
var config       = require('../config').scripts;
var env 				 = require('../config').env	 


gulp.task('jshint', function() {
  return gulp.src(config.hint)
    .pipe(reload({stream: true, once: true}))
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'))
    .pipe(gulpif(!browserSync.active, jshint.reporter('fail')));
});