/*
 * watch 
 * default watch setup, sass, scripts, haml, html, sprites, images
 */

var gulp  				= require('gulp'),
	browserSync 		= require('browser-sync'),
	reload 					= browserSync.reload,
	config 					= require('../config'),
	configBrowserSync = config.browserSync,
	configJade    		= config.jade,
	configSass			= config.sass;

gulp.task('watch', ['scripts'], function() {


	browserSync(configBrowserSync);
	gulp.watch(configSass.watch,   ['sass', reload]);
	// gulp.watch(config.scripts.src, ['scripts', reload]);
	gulp.watch(configJade.watch,   ['jade', reload]);
	// // gulp.watch(config.sprites.data, ['sprite']);
	// // gulp.watch(config.images.src, ['images']);
});
