/*
 * build
 * run all of the build scripts (sass, javascript, haml), 
 * combine media queries,
 * run uncss and csso 
 */

var gulp 				 	= require('gulp');
var changed  		 	= require('gulp-changed');
var handleErrors 	= require('../util/handleErrors');
var config       	= require('../config').haml;
var browserSync 	= require('browser-sync');
var reload 				= browserSync.reload;
var del 					= require('del');
var runSequence 	= require('run-sequence');



// runSequence, ensure that 'clean' runs after the haml, to remove the includes folder
gulp.task('build', function(callback) {
  runSequence('sass', 'scripts', 'images', 'clean', 'html', 'cmq', 'uncss', callback);
});