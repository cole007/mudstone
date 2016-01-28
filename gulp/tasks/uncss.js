/*
 * uncss 
 * optimise css with uncss
 */
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
    cssnano         = require('gulp-cssnano')
    postcss         = require('gulp-postcss'),
    uncss           = require('gulp-uncss'),
    glob            = require('glob'),
    config          = require('../config').sass,
    env             = require('../config').env;

gulp.task('uncss', function () {
  return gulp.src(config.dest + '/style.css')
    .pipe(uncss({
        html: ['tmp/public_html/*.html'],
        ignore: ['/(.is-)(\w)*', '(.no-)(\w)*']
    }))
    .pipe(cssnano())
    .pipe(gulpif(env == 'dev', sourcemaps.write('./')))
    .on('error', handleErrors)
    .pipe(size())
    .pipe(gulp.dest(config.dest))
    // .pipe(browserSync.reload({stream:true}));
});






