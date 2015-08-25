/*
 * build
 * move all src files to dist directory
 */
 
var gulp                    = require('gulp');
var runSequence             = require('run-sequence');
var uglify                  = require('gulp-uglify');
var concat                  = require('gulp-concat');
var handleErrors            = require('../util/handleErrors');
var cmq                     = require('gulp-combine-media-queries');
var csso                    = require('gulp-csso');
var config                  = require('../config').build;
var scripts                 = require('../config').scripts;
 
gulp.task('o-css', function(callback) {
  runSequence('sass', 'cmq', 'csso', callback);
});
 
 
 
// move the html files to dist
gulp.task('build-html', function(callback) {
    gulp.src(config.html_src)
      .pipe(gulp.dest(config.html_dest));
});
 
// move the fonts to dist
gulp.task('build-fonts', function(callback) {
    gulp.src(config.fonts_src)
      .pipe(gulp.dest(config.fonts_dest));
});
 
// move images to dist
gulp.task('build-images', function(callback) {
    gulp.src(config.images_src)
      .pipe(gulp.dest(config.images_dest));
});
 
// move and optimise the scripts
gulp.task('build-scripts', function(callback) {
    gulp.src(scripts.src)
        .pipe(uglify())
        .on('error', handleErrors)
        .pipe(concat(scripts.output))
        .pipe(gulp.dest(config.js_MergeDest));
});
 
// move any scripts which are not merged in to app.js
// for example modernizer 
gulp.task('move-scripts', function(callback) {
    gulp.src(config.js_src)
      .pipe(gulp.dest(config.js_dest));
});
 
// optimise the css and move to the dist folder
gulp.task('build-css', function(callback) {
    gulp.src(config.css_src)
        .pipe(cmq({
          log: true
        }))
        .pipe(csso())
        .pipe(gulp.dest(config.css_dest));
});
 
// optimise the css and move to the dist folder
// gulp.task('build-js-temps', function(callback) {
//     gulp.src(config.js_temp_source)
//         .pipe(gulp.dest(config.js_temp_dest));
// });
 
// run all the build tasks
gulp.task('build', function(callback) {
  runSequence(['build-html', 'build-fonts', 'build-images', 'build-scripts', 'move-scripts', 'build-css'], callback);
});