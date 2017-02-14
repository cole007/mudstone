
import gulp from 'gulp'
import pug from 'gulp-pug'
import browserSync from 'browser-sync'
import path from 'path'
import { handleErrors } from '../libs/utils'

export function pugTask() {

	const paths = {
		src: path.resolve(process.env.PWD, PATH_CONFIG.src, PATH_CONFIG.pug.src, '*.pug'),
		dest: path.resolve(process.env.PWD, PATH_CONFIG.dest, PATH_CONFIG.pug.dest)
	}
	
	return gulp.src(paths.src)
		.pipe(pug({
			pretty: true,
			basedir: paths.src
		}))
		.on('error', handleErrors)
		.pipe(gulp.dest(paths.dest))
		.pipe(browserSync.stream())
}


gulp.task('pug', pugTask)