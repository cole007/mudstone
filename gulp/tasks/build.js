import gulp from 'gulp';
import runSequence from 'run-sequence';
import htmlreplace from'gulp-html-replace';
import config from '../config';

const $tags = config.tags;
const $fonts = config.fonts;
const $favicons = config.favicons;
const $json = config.json;
const $js = config.js;
const $webfontcss = config.webfontcss;
const $template = config.template;

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

gulp.task('build-json', () => gulp.src($json.src).pipe(gulp.dest($json.dest)));

gulp.task('build-template', () => gulp.src($template.src).pipe(gulp.dest($template.dest)));

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
      'concat-libs', 
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
      'build-scripts-dev', 
      'dev-html', 
      'move-scripts', 
      'build-webfontcss'
    ]);
});

gulp.task('build-production', () => {
  runSequence(
    'build-css', 
    [
      'build-scripts-production', 
      'prod-html', 
      'move-scripts', 
      'build-webfontcss'
    ]);
});