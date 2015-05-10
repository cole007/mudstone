/*
 * build
 * run all of the build scripts (sass, javascript, haml), 
 * clean out html partials, 
 * minify html,
 * combine media queries,
 * run uncss and csso 
 */

var gulp 				 	= require('gulp');
var changed  		 	= require('gulp-changed');
var rename  		 	= require('gulp-rename');
var handleErrors 	= require('../util/handleErrors');
var browserSync 	= require('browser-sync');
var reload 				= browserSync.reload;
var del 					= require('del');
var runSequence 	= require('run-sequence');
var config        = require('../config').build;





gulp.task('o-css', function(callback) {
  runSequence('sass', 'cmq', 'csso', callback);
});


gulp.task('build-scripts', function(callback) {
	gulp.src(config.js_src)
	  .pipe(gulp.dest(config.js_dest)); 
});

gulp.task('build-fonts', function(callback) {
	gulp.src(config.fonts_src)
	  .pipe(gulp.dest(config.fonts_dest)); 
});

gulp.task('build-css', function(callback) {
	gulp.src(config.css_src)
	  .pipe(gulp.dest(config.css_dest)); 
});

gulp.task('build-images', function(callback) {
	gulp.src(config.images_src)
	  .pipe(gulp.dest(config.images_dest)); 
});

//
gulp.task('build', function(callback) {
  runSequence(['build-scripts', 'build-fonts', 'build-images', 'o-css', 'jade', 'scripts'], callback);
});
