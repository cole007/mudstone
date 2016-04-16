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

const $sass = $sass;
const $uncss = config.uncss;

gulp.task('sass', () => {
  return gulp.src($sass.watch)
    .pipe(sourcemaps.init())
    .pipe(sass({
        outputStyle: $sass.options.outputStyle,
        includePaths
      }
    ))
    .on('error', handleErrors)
    .pipe(sourcemaps.write({includeContent: false}))
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(postcss([ autoprefixer({ browsers: $sass.prefix }) ]))
    .pipe(sourcemaps.write('./'))
    .on('error', handleErrors)
    .pipe(gulp.dest($sass.dest))
    // .pipe(browserSync.reload({stream:true}));
});


gulp.task('build-css', () => {
  return gulp.src($sass.watch)
    .pipe(sass({
        outputStyle: $sass.options.outputStyle,
        includePaths
      }
    ))
    .on('error', handleErrors)
    .pipe(postcss([ autoprefixer({ browsers: $sass.prefix }) ]))
    .pipe(cssnano())
    .on('error', handleErrors)
    .pipe(gulp.dest($sass.dest))
});


gulp.task('uncss', () => {
  return gulp.src($uncss.src)
    .pipe(uncss({
        html: [$uncss.html],
        ignore: [/\.no-\w+/g, /\.\w+\s?\.is-\w+/g]
    }))
    .pipe(cssnano())
    .on('error', handleErrors)
    .pipe(gulp.dest($uncss.dest))
});