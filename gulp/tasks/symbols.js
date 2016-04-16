/*
 * Main Task: gulp symbols
 * Converts svgs into a symbol object, which gets embeded into the html (via jade), and a svg file in the images build directory
 */
import gulp from 'gulp';
import svgmin from 'gulp-svgmin';
import handleErrors from '../util/handleErrors';
import browserSync from 'browser-sync';
import inject from 'gulp-inject';
import html2jade from 'gulp-html2jade';
import gulpif from 'gulp-if';
import svgSymbols from 'gulp-svg-symbols';
import runSequence from 'run-sequence';
import del from 'del';
import config from '../config';

const $symbols = config.svgSymbols;

gulp.task('symbolsSVG',  () => {
    const svgs = gulp.src($symbols.src)
          // .pipe(rename(renameFunction))
            .pipe(svgmin())
            .pipe(svgSymbols({
                svgId:      'icon--%f',
                className:  '.icon--%f',
                title:      false,
                warn:       true,
                fontSize:   0,
                templates: ['default-svg', $symbols.iconTemplate]
            }))
            .pipe(gulp.dest($symbols.fileDest));

    function fileContents (filePath, file) {
        return file.contents.toString();
    }

    return gulp
        .src($symbols.file)
        .pipe(inject(svgs, { transform: fileContents }))
        .on('error', handleErrors)
        .pipe(gulp.dest($symbols.fileDest));
});


gulp.task('symbolsAsset', () => {
  return gulp.src($symbols.fileDest + 'svg-symbols.svg')
    .pipe(gulp.dest($symbols.dest));
});


gulp.task('symbolsSCSS', () => {
  return gulp.src($symbols.fileDest +  $symbols.cssOutput)
    .pipe(gulp.dest($symbols.cssPath));
});

gulp.task('html-jade', () => {
    const options = {
        nspaces:2, 
        bodyless: true
    };
    return gulp.src($symbols.fileDest + $symbols.fileName)
        .pipe(html2jade(options))
        .pipe(gulp.dest($symbols.jadeDest));
})


gulp.task('clean-symbols', function () {
  return del($symbols.fileDest);
});

gulp.task('symbols', function(cb) {
    const run = runSequence.use(gulp);
    runSequence('symbolsSVG', ['symbolsSCSS', 'symbolsAsset', 'html-jade'], 'clean-symbols', cb)
});



