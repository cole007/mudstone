/*
 * Main Task: gulp sass
 * compile scss
 */
import gulp from 'gulp';
import browserSync from 'browser-sync';
import sass from 'gulp-sass';
import sourcemaps from 'gulp-sourcemaps';
import handleErrors from '../util/handleErrors';
import autoprefixer from 'autoprefixer';
import postcss from 'gulp-postcss';
import cssnano from 'gulp-cssnano';
import uncss from 'gulp-uncss';
import config from '../config';
import { includePaths } from 'node-bourbon';

gulp.task('sass', () => {
  return gulp.src(config.sass.watch)
    .pipe(sourcemaps.init())
    .pipe(sass({
        outputStyle: config.sass.options.outputStyle,
        includePaths
      }
    ))
    .on('error', handleErrors)
    .pipe(sourcemaps.write({includeContent: false}))
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(postcss([ autoprefixer({ browsers: config.sass.prefix }) ]))
    .pipe(sourcemaps.write('./'))
    .on('error', handleErrors)
    .pipe(gulp.dest(config.sass.dest))
    // .pipe(browserSync.reload({stream:true}));
});


gulp.task('build-css', () => {
  return gulp.src(config.sass.watch)
    .pipe(sass({
        outputStyle: config.sass.options.outputStyle,
        includePaths
      }
    ))
    .on('error', handleErrors)
    .pipe(postcss([ autoprefixer({ browsers: config.sass.prefix }) ]))
    .pipe(cssnano())
    .on('error', handleErrors)
    .pipe(gulp.dest(config.sass.dest))
});


gulp.task('uncss', () => {
  return gulp.src(config.uncss.src)
    .pipe(uncss({
        html: [config.uncss.html],
        ignore: [/\.no-\w+/g, /\.\w+\s?\.is-\w+/g]
    }))
    .pipe(cssnano())
    .on('error', handleErrors)
    .pipe(gulp.dest(config.uncss.dest))
});