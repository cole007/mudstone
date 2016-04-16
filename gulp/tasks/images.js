/*
 * Main Task: gulp images
 * image optimisation
 */
import changed from 'gulp-changed';
import gulp from 'gulp';
import svgmin from 'gulp-svgmin';
import imagemin from 'gulp-imagemin';
import handleErrors from '../util/handleErrors';
import browserSync from 'browser-sync';
import config from '../config';

gulp.task('images', () => {
  return gulp.src(config.images.src)
    .pipe(changed(config.images.dest)) // Ignore unchanged files
    .pipe(imagemin()) // Optimize
    .pipe(gulp.dest(config.images.dest))
    .pipe(browserSync.reload({stream:true}));
});


gulp.task('svg-assets', () => {
    return gulp.src(config.svg.assets)
        .pipe(svgmin())
        .on('error', handleErrors)
        .pipe(gulp.dest(config.svg.dest));
});