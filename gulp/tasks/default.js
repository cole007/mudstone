/*
 * Default - just run gulp
 * Runs watch, for browsersync, sass, js, images, haml, sprites
 */

var gulp 			= require('gulp'),
	runSequence 	= require('run-sequence'),
	config 			= require('../config');

gulp.task('default', ['watch' , 'sass', 'scripts', 'browserSync'], function () {
   // gulp.watch(config.sass.src, ['sass']);
});