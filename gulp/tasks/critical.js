/*
 * Critical path
 * returns "above the fold css"
 * builds inlined html file
 */


var gulp            = require('gulp'),
    critical        = require('critical'),
    rename          = require('gulp-rename'),
    config          = require('../config');


gulp.task('critical', function (cb) {
  critical.generate({
    base: 'deploy/test/',
    src: 'index-test.html',
    css: ['_assets/css/style.css'],
    dimensions: [{
      width: 320,
      height: 100
    },{
      width: 768,
      height: 100
    },{
      width: 1600,
      height: 100
    }],
    dest: 'critical.css',
    minify: false,
    extract: true
  });
});