import gulp from 'gulp'
import nunjucks from 'gulp-nunjucks'
import browserSync from 'browser-sync'
import rename from 'gulp-rename'
import handleErrors from '../util/handleErrors'
import config from '../config'

const $nunjucks = config.nunjucks

gulp.task('nunjucks', () => {
	return gulp.src($nunjucks.src)
		.pipe(nunjucks.compile({
			basePath: '/dist/images/'
		}))
		.on('error', handleErrors)
		.pipe(rename((path) => path.extname = '.html'))
		.pipe(gulp.dest($nunjucks.dest))
		.pipe(browserSync.reload({
			stream: true
		}))
})
