/*
 * build
 * run all of the build scripts (sass, javascript, haml), 
 * clean out html partials, 
 * minify html,
 * combine media queries,
 * run uncss and csso 
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




// remove all the includes output files
gulp.task('clean', del.bind(null, [config.partials], {dot: true}));

// runSequence, ensure that 'clean' runs after the haml, to remove the includes folder
gulp.task('build', function(callback) {
  runSequence('sass', 'scripts', 'haml', 'images', 'clean', 'html', 'cmq', 'uncss', callback);
});