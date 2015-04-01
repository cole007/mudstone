var gulp = require('gulp');
var jade = require('gulp-jade');
var config = require('../config').jade;
var browserSync   = require('browser-sync');
var handleErrors  = require('../util/handleErrors');
var rename = require("gulp-rename");
var runSequence = require('run-sequence');

gulp.task('jade', function() {
  var YOUR_LOCALS = {
  	
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


// gulp.task('rename-jade', function() {

//     return gulp.src("./*.html")
//       .pipe(rename(function (path) {
//           path.extname = ".php"
//       }))
//       .pipe(gulp.dest("./"));

// })



// gulp.task('jade', function(cb) {
//   runSequence('templates', ['svgstore'], cb);
// });