var source = require('vinyl-source-stream'),
    gulp = require('gulp'),
    gutil = require('gulp-util'),
    browserify = require('browserify'),
    babelify = require('babelify'),
    watchify = require('watchify'),
    gulpif   = require('gulp-if'),
    del = require('del'),
    sourcemaps = require('gulp-sourcemaps'),
    notify = require('gulp-notify'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    rename = require('gulp-rename'),
    buffer = require('vinyl-buffer'),
    browserSync = require('browser-sync'),
    handleErrors = require('../util/handleErrors'),
    reload = browserSync.reload,
    runSequence = require('run-sequence'),

    env = require('../config').env,
    config = require('../config').scripts;


gulp.task('lib-scripts', function() {
  return gulp.src(config.libs)
    .pipe(concat(config.libsOutput))
    .pipe(gulp.dest(config.tmp))
});


gulp.task('squish-lib-scripts', function() {
  return gulp.src(config.libs)
    .pipe(uglify())
    .pipe(concat(config.libsOutput))
    .pipe(gulp.dest(config.tmp))
});

// gulp.task('clean', function () {
//   return del(config.tmp);
// });


gulp.task('concat-scripts', function() {
  console.log(config.tmp + '/' + config.libsOutput, config.dest + '/' + config.output);
  return gulp.src([config.tmp + '/' + config.libsOutput, config.dest + '/' + config.output ])
    .pipe(concat(config.output))
    .pipe(gulp.dest(config.dest))
});


function buildScript(file, watch, minify) {
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
      .pipe(gulpif(minify === true, uglify()))
      .pipe(gulpif(minify === false, sourcemaps.init({ loadMaps: true })))
      .pipe(gulpif(minify === false, sourcemaps.write('./')))
      .pipe(gulp.dest(config.dest))
      // If you also want to uglify it
      // .pipe(rename('app.min.js'))
      .pipe(reload({stream:true}))
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
  return buildScript(config.output, true, false); // browserify watch for JS changes
});

gulp.task('bundle-scripts', function() {
  return buildScript(config.output, false, false); // browserify watch for JS changes
});

gulp.task('squish-scripts', function() {
  return buildScript(config.output, false, true); // browserify watch for JS changes
});

gulp.task('merge-scripts', function(callback) {
  runSequence('bundle-scripts', ['lib-scripts'], 'concat-scripts', callback);
});

gulp.task('build-scripts', function(callback) {
  runSequence('squish-scripts', ['squish-lib-scripts'], 'concat-scripts', callback);
});