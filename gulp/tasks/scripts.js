/*
 * Main Task: gulp scripts
 * Watches and compiles es6 via babel
 */

import source from 'vinyl-source-stream';
import gulp from 'gulp';
import gutil from 'gulp-util';
import browserify from 'browserify';
import babelify from 'babelify';
import watchify from 'watchify';
import gulpif from 'gulp-if';
import del from 'del';
import sourcemaps from 'gulp-sourcemaps';
import uglify from 'gulp-uglify';
import concat from 'gulp-concat';
import buffer from 'vinyl-buffer';
import browserSync from 'browser-sync';
import handleErrors from '../util/handleErrors';
import runSequence from 'run-sequence';
import config from '../config';

/*
 * gulp lib-scripts
 * Concatenate lib files
 */

gulp.task('lib-scripts', function() {
  return gulp.src(config.js.libs)
    .pipe(concat(config.js.libsOutput))
    .pipe(gulp.dest(config.js.tmp))
});

/*
 * gulp squish-lib-scripts
 * Concatenate and minify lib files
 */
gulp.task('squish-lib-scripts', function() {
  return gulp.src(config.js.libs)
    .pipe(uglify())
    .pipe(concat(config.js.libsOutput))
    .pipe(gulp.dest(config.js.tmp))
});




/*
 * gulp concat-scripts
 * Concatenate libs with app
 */
gulp.task('concat-scripts', function() {
  return gulp.src([config.js.tmp + '/' + config.js.libsOutput, config.js.dest + '/' + config.js.output ])
    .pipe(uglify())
    .pipe(concat(config.js.output))
    .pipe(gulp.dest(config.js.dest))
});


/*
 * gulp - not exposed
 * Runs scripts through babel and browserify 
 */
function buildScript(file, watch, minify) {
  const props = {
    entries: [config.js.path + file],
    debug : false,
    transform:  [babelify.configure( {presets: ["es2015"]})]
  };

  // watchify() if watch requested, otherwise run browserify() once 
  const bundler = watch ? watchify(browserify(props)) : browserify(props);

  function rebundle() {
    const stream = bundler.bundle();
    return stream
      .on('error', handleErrors)
      .pipe(source(file))
      .pipe(buffer())
      .pipe(gulpif(minify === true, uglify()))
      .pipe(gulpif(minify === false, sourcemaps.init({ loadMaps: true })))
      .pipe(gulpif(minify === false, sourcemaps.write('./')))
      .pipe(gulp.dest(config.js.dest))
      // If you also want to uglify it
      .pipe(browserSync.reload({stream:true}))
  }

  // listen for an update and run rebundle
  bundler.on('update', function() {
    rebundle();
    gutil.log('Rebundle...');
  });

  // run it once the first time buildScript is called
  return rebundle();
}


gulp.task('scripts', () =>  buildScript(config.js.output, true, false));

gulp.task('bundle-scripts', () => buildScript(config.js.output, false, false));

gulp.task('squish-scripts', () => buildScript(config.js.output, false, true));

gulp.task('init-scripts', (callback) => runSequence('bundle-scripts', ['lib-scripts', 'move-scripts'], 'concat-scripts', callback));

gulp.task('merge-scripts', (callback) => runSequence('bundle-scripts', ['lib-scripts'], 'concat-scripts', callback));

gulp.task('build-scripts', (callback) => runSequence('squish-scripts', ['squish-lib-scripts'], 'concat-scripts', callback));

/*
 * gulp move-scripts
 * Move required lib files to desintation (things that need to go in the <head>)
 */
gulp.task('move-scripts', function(callback) {
    gulp.src(config.js.deps)
      .pipe(gulp.dest(config.js.depsDest));
});