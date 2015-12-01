/*
 * Html
 * minify html and copy to output folder
 */


var gulp         		= require('gulp'),
	browserSync  		= require('browser-sync'),
	changed  		 	= require('gulp-changed'),
	reload 			 	= browserSync.reload,
	handleErrors 		= require('../util/handleErrors'),
	config       		= require('../config').html,
	gulpif       		= require('gulp-if'),
	env					= require('../config').env;



gulp.task('html', function() {
  var opts = {comments:true,spare:true,quotes:true};


	return gulp.src(config.build)
		.pipe(changed(config.build))
	    //.pipe(minifyHtml(opts)) // don't minify html as the justify grid method doesn't work
	    .pipe(gulp.dest(config.dest))
    	.pipe(browserSync.reload({stream:true}));
});