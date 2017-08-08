import gulp from 'gulp'
import data from 'gulp-data'
import render from 'gulp-twig'
import browserSync from 'browser-sync'
import gulpif from 'gulp-if'
import rename from 'gulp-rename'
import htmlmin from 'gulp-htmlmin'
import htmlbeautify from 'gulp-html-beautify'
import path from 'path'
import fs from 'fs'
import {
	getPaths,
	handleErrors
} from '../libs/utils'

export function html() {

	const stamp = global.production ? `.${TASK_CONFIG.stamp}` : ''

	const exclude = '!' + path.resolve(process.env.PWD, PATH_CONFIG.src, PATH_CONFIG.html.src, '**/{' + TASK_CONFIG.html.excludeFolders
		.join(',') + '}/**')

	const paths = getPaths('html')
	const src = [...paths.src, exclude]

	const getData = TASK_CONFIG.html.getData || function (file) {
		const dataPath = path.resolve(process.env.PWD, PATH_CONFIG.src, PATH_CONFIG.html.src, TASK_CONFIG.html.dataFile)
		return {...JSON.parse(fs.readFileSync(dataPath, 'utf8')), stamp}
	}

	return gulp.src(src)
		.pipe(data(getData))
		.on('error', handleErrors)
		.pipe(render({
			base: [path.resolve(process.env.PWD, PATH_CONFIG.src, PATH_CONFIG.html.src)],
			debug: false
		}))
		.on('error', handleErrors)
		.pipe(gulpif(global.production, htmlmin({
			collapseWhitespace: true,
			removeComments: false
		})))
		.pipe(gulpif(!global.production, htmlbeautify({
			indent_with_tabs: true
		})))
		.pipe(gulp.dest(paths.dest))
		.pipe(browserSync.stream())
}



gulp.task('html', html)