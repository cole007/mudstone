var gulp          = require('gulp');
var iconfont      = require('gulp-iconfont');
var config        = require('../config').icons;
var handleErrors  = require('../util/handleErrors');
var iconfontCss   = require('gulp-iconfont-css');
var runSequence   = require('run-sequence');

gulp.task('iconfont', function(){
  gulp.src(config.src)
    .pipe(iconfontCss({
      fontName: config.name,
      path: config.path,
      targetPath: config.targetPath,
      fontPath: config.fontPath
    }))
    .pipe(iconfont({
      fontName: config.name, // required
      appendCodepoints: true, // recommended option
      normalize: true
    }))
    .on('error', handleErrors)
    .pipe(gulp.dest(config.dest));
});

