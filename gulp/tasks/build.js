/*
 * build
 * move all src files to dist directory
 */
 
var gulp                = require('gulp'),
    runSequence         = require('run-sequence'),
    uglify              = require('gulp-uglify'),
    sass                = require('gulp-sass'),
    autoprefixer        = require('autoprefixer'),
    postcss             = require('gulp-postcss'),
    concat              = require('gulp-concat'),
    handleErrors        = require('../util/handleErrors'),
    cssnano             = require('gulp-cssnano'),
    util                = require('gulp-util'),
    setup               = require('../config'),
    config              = setup.build,
    scripts             = setup.scripts;
 
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


gulp.task('build-css', function() {
  return gulp.src(setup.sass.watch)
    .pipe(sass({
        outputStyle: setup.sass.options.outputStyle,
        includePaths: require('node-bourbon').includePaths
      }
    ))
    .on('error', handleErrors)
    .pipe(postcss([ autoprefixer({ browsers: setup.sass.prefix }) ]))
    .pipe(cssnano())
    .on('error', handleErrors)
    .pipe(gulp.dest(setup.sass.dest))
    // .pipe(browserSync.reload({stream:true}));
}); 

gulp.task('build', function(callback) {
  runSequence('sprites', ['jade', 'build-fonts', 'iconfont', 'images', 'build-scripts', 'move-scripts', 'build-css'], callback);
});

gulp.task('build-cms', function(callback) {
  runSequence('build-css', ['scripts'], callback);
});
