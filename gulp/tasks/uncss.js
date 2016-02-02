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
    handleErrors    = require('../util/handleErrors'),
    size            = require('gulp-size'),
    cssnano         = require('gulp-cssnano')
    uncss           = require('gulp-uncss'),
    config          = require('../config').sass;

gulp.task('uncss', function () {
  return gulp.src(config.dest + '/style.css')
    .pipe(uncss({
        html: ['tmp/public_html/*.html'],
        ignore: ['/(.is-)(\w)*', '(.no-)(\w)*']
    }))
    .pipe(cssnano())
    .on('error', handleErrors)
    .pipe(size())
    .pipe(gulp.dest(config.dest))
    // .pipe(browserSync.reload({stream:true}));
});






