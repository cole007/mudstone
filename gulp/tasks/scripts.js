var gulp         = require('gulp');
var browserSync  = require('browser-sync');
var uglify       = require('gulp-uglify');
var concat       = require('gulp-concat');
var sourcemaps   = require('gulp-sourcemaps');
var handleErrors = require('../util/handleErrors');
var config       = require('../config').scripts;


gulp.task('scripts', function() {
  return gulp.src(config.src)
    .pipe(sourcemaps.init())
    .pipe(uglify())
    .pipe(concat(config.output))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(config.dest))
    .pipe(browserSync.reload({stream:true}));
});