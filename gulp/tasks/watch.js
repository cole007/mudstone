/*
 * watch 
 * default watch setup, sass, scripts, haml, html, sprites, images
 */

var gulp  				= require('gulp'),
	browserSync 		= require('browser-sync'),
	reload 				= browserSync.reload,
	config 				= require('../config');

gulp.task('watch', ['scripts'], function() {
	browserSync(config.browserSync);
	gulp.watch(config.sass.watch,   ['sass', reload]);
	// gulp.watch(config.scripts.src, ['scripts', reload]);
	gulp.watch(config.jade.watch,   ['jade', reload]);
	gulp.watch(config.sprites.data, ['sprite']);
	gulp.watch(config.images.src, ['images']);
});
