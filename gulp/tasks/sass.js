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
var env           = require('../config').env;

var AUTOPREFIXER_BROWSERS = [
  'ie >= 10',
  'ie_mob >= 10',
  'ff >= 30',
  'chrome >= 34',
  'safari >= 7',
  'opera >= 23',
  'ios >= 7',
  'android >= 4.4',
  'bb >= 10'
];

gulp.task('sass', function () {
  return gulp.src(config.watch)
    .pipe(gulpif(env == 'dev', sourcemaps.init()))
    .pipe(sass({
        outputStyle: config.options.outputStyle,
        includePaths: require('node-bourbon').includePaths
      }
    ))
    .pipe(autoprefixer(config.prefix)) // doesn't play nice with sourcemaps
    .on('error', handleErrors)
    .pipe(gulpif(env == 'dev', sourcemaps.write('./')))
    .on('error', handleErrors)
    .pipe(gulp.dest(config.dest))
    .pipe(size())
    // .pipe(browserSync.reload({stream:true}));
});
