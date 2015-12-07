var source = require('vinyl-source-stream'),
    gulp = require('gulp'),
    gutil = require('gulp-util'),
    browserify = require('browserify'),
    babelify = require('babelify'),
    watchify = require('watchify'),
    sourcemaps = require('gulp-sourcemaps'),
    notify = require('gulp-notify'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    buffer = require('vinyl-buffer'),
    browserSync = require('browser-sync'),
    handleErrors = require('../util/handleErrors'),
    reload = browserSync.reload,
    config = require('../config').scripts,
    sass = require('../config').sass;


function buildScript(file, watch) {
  var props = {
    entries: [config.path + file],
    debug : false,
    transform:  [babelify.configure( {presets: ["es2015"]})]
  };

  // watchify() if watch requested, otherwise run browserify() once 
  var bundler = watch ? watchify(browserify(props)) : browserify(props);

  function rebundle() {
    var stream = bundler.bundle();
    return stream
      .on('error', handleErrors)
      .pipe(source(file))
      .pipe(buffer())
      .pipe(sourcemaps.init({ loadMaps: true }))
      .pipe(sourcemaps.write('./'))
      // .pipe(uglify())
      .pipe(gulp.dest(config.dest))
      // If you also want to uglify it
      // .pipe(rename('app.min.js'))
      // .pipe(gulp.dest('./build'))
      //.pipe(reload({stream:true}))
  }

  // listen for an update and run rebundle
  bundler.on('update', function() {
    rebundle();
    gutil.log('Rebundle...');
  });

  // run it once the first time buildScript is called
  return rebundle();
}

// gulp.task('babel-react', function() {
//   return buildScript(config.output, false); // this will run once because we set watch to false
// });

gulp.task('scripts', function() {
  return buildScript(config.output, true); // browserify watch for JS changes
});