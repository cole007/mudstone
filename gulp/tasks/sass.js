/*
 * sass 
 * compile scss with libsass
 */


var gulp          = require('gulp');
var browserSync   = require('browser-sync');
var sass          = require('gulp-sass');
var sourcemaps    = require('gulp-sourcemaps');
var handleErrors  = require('../util/handleErrors');
var config        = require('../config').sass;
var autoprefixer  = require('gulp-autoprefixer');
var gulpif        = require('gulp-if');
var size          = require('gulp-size');
var handleErrors  = require('../util/handleErrors');
var env           = require('../config').env;



gulp.task('sass', function () {
  return gulp.src(config.watch)
    .pipe(gulpif(env == 'dev', sourcemaps.init()))
    .pipe(sass({
        outputStyle: config.options.outputStyle,
        includePaths: require('node-bourbon').includePaths
      }
    ))
    .on('error', handleErrors)
    .pipe(sourcemaps.write({includeContent: false}))
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(autoprefixer(config.prefix)) // doesn't play nice with sourcemaps
    .pipe(gulpif(env == 'dev', sourcemaps.write('./')))
    .on('error', handleErrors)
    .pipe(gulp.dest(config.dest))
    .pipe(size())
    // .pipe(browserSync.reload({stream:true}));
});
