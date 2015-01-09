/*
 * Haml
 * Converts haml templates to html
 * Ruby version of gulp haml used to allow partials
 * Partials also rendered
 */

var gulp 				 	= require('gulp');
var haml 				 	= require('gulp-ruby-haml'); // using the ruby version so we can use parials
var changed  		 	= require('gulp-changed');
var handleErrors 	= require('../util/handleErrors');
var config       	= require('../config').haml;
var browserSync 	= require('browser-sync');
var reload 				= browserSync.reload;
var clean 				= require('gulp-clean');
var del 					= require('del');
var runSequence 	= require('run-sequence');


gulp.task('haml', function () {
	return gulp.src(config.src)
				.pipe(changed(config.src))
		    .pipe(haml())
		    .on('error', handleErrors)
		    .pipe(gulp.dest(config.dest))
    		.pipe(browserSync.reload({stream:true}));
});

// remove all the includes output files
gulp.task('hamlClean', del.bind(null, [config.partials], {dot: true}));

// runSequence, ensure that 'clean' runs after the haml, to remove the includes folder
gulp.task('hamlBuild', function(callback) {
  runSequence('haml', 'hamlClean', 'html', callback);
});