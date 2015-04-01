/*
 * watch 
 * default watch setup, sass, scripts, haml, html, sprites, images
 */

var gulp  				= require('gulp');
var config 				= require('../config');
var runSequence 		= require('run-sequence');
var browserSync 		= require('browser-sync');
var reload 				= browserSync.reload;
var gulpif 				= require('gulp-if');


gulp.task('watch', ['browserSync'], function() {
	gulp.watch(config.sass.watch,   ['sass', reload]);
	gulp.watch(config.scripts.src, ['scripts', reload]);
	gulp.watch(config.jade.watch,   ['jade', reload]);
	gulp.watch(config.sprites.data, ['sprite']);
	gulp.watch(config.images.src, ['images']);
});
