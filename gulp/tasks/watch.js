/*
 * watch 
 * default watch setup, sass, scripts, haml, html, sprites, images
 */

var gulp  				= require('gulp');
var config 				= require('../config');
var runSequence 	= require('run-sequence');
var browserSync 	= require('browser-sync');
var reload 				= browserSync.reload;
var gulpif 				= require('gulp-if');


gulp.task('watch', function() {
	gulp.watch(config.sass.watch,   ['sass']);
	gulp.watch(config.scripts.src, ['scripts']);
	gulp.watch(config.haml.src, ['haml']);
	gulp.watch(config.html.build, ['html']);
	gulp.watch(config.sprites.data, ['sprite']);
	gulp.watch(config.images.src, ['images']);
});
