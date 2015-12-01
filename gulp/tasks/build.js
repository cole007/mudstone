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
    cssmin              = require('gulp-minify-css'),
    util                = require('gulp-util'),
    setup               = require('../config'),
    config              = setup.build,
    scripts             = setup.scripts;
 

// move the html files to dist
gulp.task('build-html', function(callback) {
    gulp.src(config.html_src)
      .pipe(gulp.dest(config.html_dest));
});

// move the favicons
gulp.task('build-favicons', function(callback) {
    gulp.src(setup.favicons.src)
      .pipe(gulp.dest(setup.favicons.dest));
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
        //https://github.com/jakubpawlowicz/clean-css
        .pipe(cssmin())
        .pipe(gulp.dest(config.css_dest));
});
 

gulp.task('build-css', function() {
  return gulp.src(setup.sass.watch)
    .pipe(sass({
        outputStyle: setup.sass.options.outputStyle,
        includePaths: require('node-bourbon').includePaths
      }
    ))
    .on('error', handleErrors)
    .pipe(postcss([ autoprefixer({ browsers: setup.sass.prefix }) ]))
    .pipe(cssmin())
    .on('error', handleErrors)
    .pipe(gulp.dest(setup.sass.dest))
    // .pipe(browserSync.reload({stream:true}));
}); 

gulp.task('build', function(callback) {
  runSequence(['jade', 'build-fonts', 'build-images', 'build-scripts', 'move-scripts', 'build-css'], callback);
});

gulp.task('init', function(callback) {
  runSequence('sprites', ['jade', 'build-fonts', 'iconfont', 'images', 'build-scripts', 'move-scripts', 'build-css','build-favicons'], callback);
});