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
    htmlreplace         = require('gulp-html-replace'),
    setup               = require('../config'),
    htmlv               = require('gulp-html-validator'),
    config              = setup.build,
    scripts             = setup.scripts;
 
// move the html files to dist
gulp.task('build-html', function(callback) {
    gulp.src(config.html_src)
      .pipe(gulp.dest(config.html_dest));
});

gulp.task('prod-html', function() {
  gulp.src(config.htmlScript)
    .pipe(htmlreplace({
        'js': '/_assets/js/dist/app.js'
    },{
        keepBlockTags: true
    }))
    .pipe(gulp.dest(config.htmlScriptDest));
});


gulp.task('dev-html', function() {
  gulp.src(config.htmlScript)
    .pipe(htmlreplace({
        'js': ['/_assets/js/tmp/libs.js', '/_assets/js/dist/app.js']
    },{
       keepBlockTags: true
    }))
    .pipe(gulp.dest(config.htmlScriptDest));
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
// gulp.task('build-scripts', function(callback) {
//     gulp.src(scripts.src)
//         .pipe(uglify())
//         .on('error', handleErrors)
//         .pipe(concat(scripts.output))
//         .pipe(gulp.dest(config.js_MergeDest));
// });
 
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

gulp.task('html-validation', function () {
  gulp.src('tmp/public/*.html')
    .pipe(htmlv({format: 'html'}))
    .pipe(gulp.dest('./reports'));
});


gulp.task('init', function(callback) {
  runSequence('sprite', ['jade', 'lib-scripts', 'svg-assets', 'build-fonts', 'iconfont', 'images', 'bundle-scripts', 'sass', 'dev-html'], callback);
});

gulp.task('build-local', function(callback) {
  runSequence('sass', ['merge-scripts', 'dev-html'], callback);
});

gulp.task('build-stage', function(callback) {
  runSequence('sass', ['merge-scripts', 'prod-html'], 'clean-tmp-scripts', callback);
});

gulp.task('build-production', function(callback) {
  runSequence('build-css', ['build-scripts', 'prod-html'], 'clean-tmp-scripts', callback);
});