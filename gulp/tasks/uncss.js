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
  return gulp.src(config.css)
    .pipe(uncss({
        html: [config.html],
        ignore: [/\.no-\w+/g, /\.\w+\s?\.is-\w+/g]
    }))
    .pipe(cssnano())
    .on('error', handleErrors)
    .pipe(size())
    .pipe(gulp.dest(config.dest))
    // .pipe(browserSync.reload({stream:true}));
});






