var styledocco 	= require('gulp-styledocco');
var gulp 				= require('gulp');

gulp.task('styledocco', function () {
  gulp.src('./_assets/css/style.css')
    .pipe(styledocco({
      out: 'docs'
    }));
});