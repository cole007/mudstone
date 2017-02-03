import gulp from 'gulp'
import pug from 'gulp-pug'
import browserSync from 'browser-sync'
import handleErrors from '../util/handleErrors'
import config from '../config'



const $pug = config.pug

gulp.task('pug', () => {
	return gulp.src($pug.src)
		.pipe(pug({
			pretty: true,
			basedir: $pug.basedir
		}))
		.on('error', handleErrors)
		.pipe(gulp.dest($pug.dest))
		.pipe(browserSync.reload({stream:true}))
})
