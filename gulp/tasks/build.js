import gulp from 'gulp';
import runSequence from 'run-sequence';
import htmlreplace from'gulp-html-replace';
import config from '../config';


// replace two script tags with one
gulp.task('prod-html', () => {
  gulp.src(config.tags.src)
    .pipe(htmlreplace({
        'js': config.js.prodTag
    },{
        keepBlockTags: true
    }))
    .pipe(gulp.dest(config.tags.dest));
});

// replace one script tag with two
gulp.task('dev-html', () => {
  gulp.src(config.tags.src)
    .pipe(htmlreplace({
        'js': config.js.devTag
    },{
       keepBlockTags: true
    }))
    .pipe(gulp.dest(config.tags.dest));
});

gulp.task('build-fonts', () => {
    gulp.src(config.fonts.src)
      .pipe(gulp.dest(config.fonts.dest));
});

gulp.task('build-fonts-css', () => {
    gulp.src(config.webfontcss.src)
      .pipe(gulp.dest(config.webfontcss.dest));
});

gulp.task('build-favicons', () => {
    gulp.src(config.favicons.src)
      .pipe(gulp.dest(config.favicons.dest));
});


gulp.task('remove-dev-js', () => {
  return del(config.js.tmp);
});

gulp.task('init', () => {
  runSequence(
      'sprite', 
      'symbols', 
      [
        'jade', 
        'images', 
        'svg-assets', 
        'build-fonts-css',
        'build-favicons',
        'build-fonts', 
        'init-scripts',
        'dev-html'
      ], 
      'sass');
});

gulp.task('build-development', () => {
  runSequence(
    'sass', 
    [
      'lib-scripts', 
      'bundle-scripts', 
      'dev-html', 
      'move-scripts', 
      'build-font-css'
    ]);
});

gulp.task('build-stage', () => {
  runSequence(
    'sass', 
    [
      'merge-scripts', 
      'dev-html', 
      'move-scripts', 
      'build-font-css'
    ]);
});

gulp.task('build-production', () => {
  runSequence(
    'build-css', 
    [
      'build-scripts', 
      'prod-html', 
      'move-scripts', 
      'build-font-css'
    ], 
    'remove-dev-js');
});