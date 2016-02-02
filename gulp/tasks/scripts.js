/*
 * scripts 
 * uglify if env = live
 * concat javascript files
 */
var gulp         = require('gulp'),
	browserSync  = require('browser-sync'),
	uglify       = require('gulp-uglify'),
	concat       = require('gulp-concat'),
	babel 		 = require('gulp-babel'),
	sourcemaps   = require('gulp-sourcemaps'),
	handleErrors = require('../util/handleErrors'),
	config       = require('../config').scripts,
	gulpif		 = require('gulp-if'),
	env 		 = require('../config').env;


gulp.task('scripts', function() {
  return gulp.src(config.src)
    .pipe(gulpif(env == 'dev', sourcemaps.init()))
	.pipe(babel({
		presets: ['es2015']
	}))
    .on('error', handleErrors)
    .pipe(gulpif(env == 'live', uglify()))
    .pipe(concat(config.output))
    .pipe(gulpif(env == 'dev', sourcemaps.write('./')))
    .pipe(gulp.dest(config.dest))
    .pipe(browserSync.reload({stream:true}))
});