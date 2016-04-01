/*
 * sass 
 * compile scss with libsass
 */

var gulp            = require('gulp'),
    browserSync     = require('browser-sync'),
    sass            = require('gulp-sass'),
    sourcemaps      = require('gulp-sourcemaps'),
    handleErrors    = require('../util/handleErrors'),
    gulpif          = require('gulp-if'),
    size            = require('gulp-size'),
    handleErrors    = require('../util/handleErrors'),
    autoprefixer    = require('autoprefixer'),
    postcss         = require('gulp-postcss'),
    config          = require('../config').sass,
    env             = require('../config').env;

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
    .pipe(postcss([ autoprefixer({ browsers: config.prefix }) ]))
    .pipe(gulpif(env == 'dev', sourcemaps.write('./')))
    .on('error', handleErrors)
    .pipe(size())
    .pipe(gulp.dest(config.dest))
    // .pipe(browserSync.reload({stream:true}));
});