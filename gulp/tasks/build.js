import gulp from 'gulp';
import runSequence from 'run-sequence';
import htmlreplace from'gulp-html-replace';
import config from '../config';

const $tags = config.tags;
const $fonts = config.fonts;
const $favicons = config.favicons;
const $js = config.js;
const $webfontcss = config.webfontcss;

// replace two script tags with one
gulp.task('prod-html', () => {
  gulp.src($tags.src)
    .pipe(htmlreplace({
        'js': $js.prodTag
    },{
        keepBlockTags: true
    }))
    .pipe(gulp.dest($tags.dest));
});

// replace one script tag with two
gulp.task('dev-html', () => {
  gulp.src($tags.src)
    .pipe(htmlreplace({
        'js': $js.devTag
    },{
       keepBlockTags: true
    }))
    .pipe(gulp.dest($tags.dest));
});

gulp.task('build-fonts', () => gulp.src($fonts.src).pipe(gulp.dest($fonts.dest)));

gulp.task('build-webfontcss', () => gulp.src($webfontcss.src).pipe(gulp.dest($webfontcss.dest)));

gulp.task('build-favicons', () => gulp.src($favicons.src).pipe(gulp.dest($favicons.dest)));



gulp.task('init', () => {
  runSequence(
      'sprite', 
      'symbols', 
      [
        'images', 
        'svg-assets', 
        'build-webfontcss',
        'build-favicons',
        'build-fonts', 
        'init-scripts',
        'dev-html'
      ], 
      'sass',
      'jade');
});

gulp.task('build-development', () => {
  runSequence(
    'sass', 
    [
      'lib-scripts', 
      'bundle-scripts', 
      'dev-html', 
      'move-scripts', 
      'build-webfontcss'
    ]);
});

gulp.task('build-stage', () => {
  runSequence(
    'sass', 
    [
      'merge-scripts', 
      'dev-html', 
      'move-scripts', 
      'build-webfontcss'
    ]);
});

gulp.task('build-production', () => {
  runSequence(
    'build-css', 
    [
      'build-scripts', 
      'prod-html', 
      'move-scripts', 
      'build-webfontcss'
    ], 
    'remove-dev-js');
});