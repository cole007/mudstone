/*
 * Main Task: gulp jade
 * compile jade
 */
import gulp           from 'gulp';
import jade           from 'gulp-jade';
import browserSync    from 'browser-sync';
import handleErrors   from '../util/handleErrors';
import config         from '../config';

gulp.task('jade', () => {
  gulp.src(config.jade.src)
    .pipe(jade({
      pretty: true,
      basedir: config.jade.basedir
    }))
    .on('error', handleErrors)
    .pipe(gulp.dest(config.jade.dest))
    .pipe(browserSync.reload({stream:true}));
});
