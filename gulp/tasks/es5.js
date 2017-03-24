import gulp from 'gulp'
import uglify from 'gulp-uglify'
import concat from 'gulp-concat'
import gulpif from 'gulp-if'
import sourcemaps from 'gulp-sourcemaps'
import browserSync from 'browser-sync'
import path from 'path'
import rename from 'gulp-rename'
import { handleErrors } from '../libs/utils'

export function es5Task() {

	const paths = {
		src: PATH_CONFIG.es5.src,
		dest: path.resolve(process.env.PWD, PATH_CONFIG.dest, PATH_CONFIG.es5.dest)
	}

	return gulp.src(paths.src)
		.pipe(gulpif(!global.production, sourcemaps.init()))
		.on('error', handleErrors)
		.pipe(gulpif(global.production, uglify()))
		.pipe(concat(TASK_CONFIG.es5.output))
		.pipe(gulpif(!global.production, sourcemaps.write('./')))
		.pipe(gulpif(global.production, rename({
			suffix: `.${TASK_CONFIG.stamp}`
		})))
		.on('error', handleErrors)
		.pipe(gulp.dest(paths.dest))
		.pipe(browserSync.stream())
}


gulp.task('es5', es5Task)