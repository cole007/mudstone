import browserSync from 'browser-sync'
import gulp from 'gulp'
import {
	getPaths
} from '../libs/utils'


export function twigTask() {
	const paths = getPaths('twig')

	return gulp.src(paths.src)
		.pipe(browserSync.stream())
}

gulp.task('twig', twigTask)