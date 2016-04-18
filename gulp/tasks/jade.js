/*
 * Main Task: gulp jade
 * compile jade
 */
import gulp           from 'gulp';
import jade           from 'gulp-jade';
import browserSync    from 'browser-sync';
import handleErrors   from '../util/handleErrors';
import config         from '../config';

const $jade = config.jade;

gulp.task('jade', () => {
  gulp.src($jade.src)
    .pipe(jade({
      pretty: true,
      basedir: $jade.basedir
    }))
    .on('error', handleErrors)
    .pipe(gulp.dest($jade.dest))
    .pipe(browserSync.reload({stream:true}));
});
