import gulp from 'gulp'
import gulpif from 'gulp-if'
import util from 'gulp-util'
import webpack from 'webpack'
import stream from 'webpack-stream'
import rename from 'gulp-rename'
import browserSync from 'browser-sync'
import handleErrors from '../util/handleErrors'
import config from '../config'
import webpackConfig from '../../webpack.config.babel.js'
const $js = config.js

gulp.task('scripts', function() {

	const env = util.env.production ? 'production' : 'development'

	return gulp.src($js.src)
    .pipe(stream(webpackConfig(env), webpack))
		.on('error', handleErrors)
		.pipe(gulpif(process.env.NODE_ENV === 'production', rename({
			suffix: `-${config.stamp}`
		})))
    .pipe(gulp.dest($js.dest))
		.pipe(browserSync.create().stream())
})


gulp.task('move-scripts', () => gulp.src($js.libs).pipe(gulp.dest($js.libsDest)))
