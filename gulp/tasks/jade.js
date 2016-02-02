var gulp            = require('gulp'),
    jade            = require('gulp-jade'),
    config          = require('../config').jade,
    browserSync     = require('browser-sync'),
    handleErrors    = require('../util/handleErrors'),
    runSequence     = require('run-sequence');

gulp.task('jade', function() {
  var YOUR_LOCALS = {
  	path: config.path
  };

  gulp.src(config.src)
    .pipe(jade({
      locals: YOUR_LOCALS,
      pretty: true,
      basedir: config.basedir
    }))
    .on('error', handleErrors)
    .pipe(gulp.dest(config.dest))
    .pipe(browserSync.reload({stream:true}));
});
