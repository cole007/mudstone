/*
 * Html
 * minify html and copy to output folder
 */


var gulp         = require('gulp');
var browserSync  = require('browser-sync');
var changed  		 = require('gulp-changed');
var reload 			 = browserSync.reload;
var minifyHtml   = require('gulp-minify-html');
var handleErrors = require('../util/handleErrors');
var config       = require('../config').html;
var gulpif       = require('gulp-if');
var env					 = require('../config').env;



gulp.task('html', function() {
  var opts = {comments:true,spare:true,quotes:true};


	return gulp.src(config.build)
			.pipe(changed(config.build))
	    .pipe(minifyHtml(opts))
	    .pipe(gulp.dest(config.dest))
    	.pipe(browserSync.reload({stream:true}));
});