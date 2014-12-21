/*
 * scripts 
 * uglify if env = live
 * concat javascript files
 */


var gulp         = require('gulp');
var browserSync  = require('browser-sync');
var uglify       = require('gulp-uglify');
var concat       = require('gulp-concat');
var sourcemaps   = require('gulp-sourcemaps');
var handleErrors = require('../util/handleErrors');
var config       = require('../config').scripts;
var gulpif			 = require('gulp-if');
var env 				 = require('../config').env;


gulp.task('scripts', function() {
  return gulp.src(config.src)
    .pipe(gulpif(env == 'dev', sourcemaps.init()))
    .pipe(gulpif(env == 'live', uglify()))
    .on('error', handleErrors)
    .pipe(concat(config.output))
    .pipe(gulpif(env == 'dev', sourcemaps.write('./')))
    .pipe(gulp.dest(config.dest))
    .pipe(browserSync.reload({stream:true}))
});