/*
 * watch 
 * default watch setup, sass, scripts, haml, html, sprites, images
 */

var gulp  				= require('gulp'),
	config 				= require('../config'),
	runSequence 		= require('run-sequence'),
	browserSync 		= require('browser-sync'),
	reload 				= browserSync.reload,
	gulpif 				= require('gulp-if');


gulp.task('watch', ['browserSync'], function() {
	gulp.watch(config.sass.watch,   ['sass', reload]);
	gulp.watch(config.scripts.src, ['scripts', reload]);
	gulp.watch(config.jade.watch,   ['jade', reload]);
	// gulp.watch(config.sprites.data, ['sprite']);
	// gulp.watch(config.images.src, ['images']);
});
