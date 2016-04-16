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

const $js = config.js;

gulp.task('scripts', () =>  buildScript($js.output, true, false));

gulp.task('bundle-scripts', () => buildScript($js.output, false, false));

gulp.task('squish-scripts', () => buildScript($js.output, false, true));

gulp.task('init-scripts', () => runSequence('bundle-scripts', ['lib-scripts', 'move-scripts'], 'concat-scripts'));

gulp.task('merge-scripts', () => runSequence('bundle-scripts', ['lib-scripts'], 'concat-scripts'));

gulp.task('build-scripts', () => runSequence('squish-scripts', ['squish-lib-scripts'], 'concat-scripts'));

/*
 * gulp move-scripts
 * Move required lib files to desintation (things that need to go in the <head>)
 */
gulp.task('move-scripts', () => gulp.src($js.deps).pipe(gulp.dest($js.depsDest)));

/*
 * gulp lib-scripts
 * Concatenate lib files
 */

gulp.task('lib-scripts', function() {
  return gulp.src($js.libs)
    .pipe(concat($js.libsOutput))
    .pipe(gulp.dest($js.tmp))
});

/*
 * gulp squish-lib-scripts
 * Concatenate and minify lib files
 */
gulp.task('squish-lib-scripts', function() {
  return gulp.src($js.libs)
    .pipe(uglify())
    .pipe(concat($js.libsOutput))
    .pipe(gulp.dest($js.tmp))
});




/*
 * gulp concat-scripts
 * Concatenate libs with app
 */
gulp.task('concat-scripts', function() {
  return gulp.src([$js.tmp + '/' + $js.libsOutput, $js.dest + '/' + $js.output ])
    .pipe(uglify())
    .pipe(concat($js.output))
    .pipe(gulp.dest($js.dest))
});


/*
 * gulp - not exposed
 * Runs scripts through babel and browserify 
 */
function buildScript(file, watch, minify) {
  const props = {
    entries: [$js.path + file],
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
      .pipe(gulp.dest($js.dest))
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