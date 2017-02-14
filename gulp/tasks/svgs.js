import gulp from 'gulp'
import svgmin from 'gulp-svgmin'
import browserSync from 'browser-sync'
import { getPaths } from '../libs/utils'

export function svgTask() {

	const paths = getPaths('svgs')

	return gulp.src(paths.src)
		.pipe(svgmin())
		.pipe(gulp.dest(paths.dest))
		.pipe(browserSync.stream())
}


gulp.task('svgs', svgTask)