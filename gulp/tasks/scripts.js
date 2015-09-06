/*
 * scripts 
 * uglify if env = live
 * concat javascript files
 */


var gulp         	= require('gulp'),
	browserSync  	= require('browser-sync'),
	uglify       	= require('gulp-uglify'),
	concat       	= require('gulp-concat'),
	sourcemaps   	= require('gulp-sourcemaps'),
	handleErrors 	= require('../util/handleErrors'),
	config       	= require('../config').scripts,
	gulpif		 	= require('gulp-if'),
	env 		 	= require('../config').env;


gulp.task('scripts', function() {
  return gulp.src(config.src)
    .pipe(gulpif(env == 'dev', sourcemaps.init()))
    .pipe(gulpif(env == 'live', uglify()))
    .on('error', handleErrors)
    .pipe(concat(config.output))
    .pipe(gulpif(env == 'dev', sourcemaps.write('./')))
    .pipe(gulp.dest(config.dest))
    // .pipe(browserSync.reload({stream:true}))
});