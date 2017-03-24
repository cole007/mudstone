/* eslint-disable no-unused-consts */
import gulp from 'gulp'
import path from 'path'
import watch from 'gulp-watch'
import { getWatch } from '../libs/utils'
import * as tasks from './index'

export function watchTasks() {
	const { watchList } = getWatch()

	watchList.forEach((taskName) => {
		const taskConfig = TASK_CONFIG[taskName]
		const taskPath = PATH_CONFIG[taskName]

		let watchConfig = {}
		if(TASK_CONFIG.watch !== undefined && TASK_CONFIG.watch.gulpWatch !== undefined) {
			watchConfig = TASK_CONFIG.watch.gulpWatch
		}

		if(taskConfig) {
			const srcPath = typeof taskConfig.folder !== 'undefined' 
				? path.resolve(process.env.PWD, PATH_CONFIG.src, taskConfig.folder) 
				: path.resolve(process.env.PWD, PATH_CONFIG.src, taskPath.src)
			const globPattern = '**/*' + (taskConfig.extensions ? '.{' + taskConfig.extensions.join(',') + '}' : '')
			watch(path.join(srcPath, globPattern), watchConfig, function () {
				tasks[`${taskName}Task`]()
			})
		}
	})
}


gulp.task('watch', ['browserSync'], watchTasks)