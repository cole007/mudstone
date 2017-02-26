import gulp from 'gulp'
import sizereport from 'gulp-sizereport'
import gulpSequence from 'gulp-sequence'
import path from 'path'
import { getTasks } from '../libs/utils'

gulp.task('size-report', function () {
	return gulp.src([path.resolve(process.env.PWD, PATH_CONFIG.dest, '**/*'), '*!rev-manifest.json'])
		.pipe(sizereport({
			gzip: true
		}))
})

export function buildTask(cb) {

	global.production = true

	const { assetTasks, codeTasks } = getTasks()
	assetTasks.push('move-scripts')
	codeTasks.push('bundle-script')

	gulpSequence('clean', assetTasks, codeTasks, 'cacheBuster', 'size-report', cb)
}

gulp.task('build', buildTask)