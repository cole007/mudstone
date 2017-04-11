import gulp from 'gulp'
import data from 'gulp-data'
import render from 'gulp-nunjucks-render'
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
import r from 'nunjucks/src/runtime'


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

	const manageEnv = function (environment) {

		/*
			array methods (nunjuck filters)
			"things": [{a: 1}, {a: 2}, {a: 3}]
			{{ things|has('a', 2) }}
			{% for thing in things %}
				<p>{{ thing.a }}</p>
			{% endfor %}
			<p>2</p>
		*/
		environment.addFilter('has', (input, prop, value) => {
			return input.filter((entry) => entry[prop] === value)
		})

		/*
			the opposite of has
		*/
		environment.addFilter('not', (input, prop, value) => {
			return input.filter((entry) => entry[prop] !== value)
		})

		/*
			Randomise array
			{{ things|rand }}
		*/
		environment.addFilter('rand', (input) => {
			let i = input.length
			while(i) {
				let j = Math.floor(Math.random() * i)
				let t = input[(i -= 1)]
				input[i] = input[j]
				input[j] = t
			}
			return input
		})

		/*
			Limit the number of items returned from array
			{{ things|limit(2) }}
		*/
		environment.addFilter('limit', (input, count) => input.slice(0, count))

		/*
			string methods (nunjuck filters)
			"thing": "Hello\nHugh"
			<p>{{ thing|nbr2tag('p') }}</p>
			<p>Hello</p><p>Hugh</p>
		*/
		environment.addFilter('nbr2tag', (input, tag) => {
			return r.markSafe(input.replace(/\n/i, `</${tag}><${tag}>`))
		})

		/*
			string methods (nunjuck filters)
			"thing": "Hello\nHugh"
			{{ thing|nbr2br }}
			Hello<br />Hugh
		*/
		environment.addFilter('nbr2br', (input) => {
			return r.markSafe(input.replace(/\n/i, '<br />'))
		})
	}


	return gulp.src(src)
		.pipe(data(getData))
		.on('error', handleErrors)
		.pipe(render({
			path: [path.resolve(process.env.PWD, PATH_CONFIG.src, PATH_CONFIG.html.src)],
			ext: '.njk',
			envOptions: {
				watch: false
			},
			manageEnv: manageEnv
		}))
		.on('error', handleErrors)
		.pipe(gulpif(global.production, htmlmin({
			collapseWhitespace: true,
			removeComments: false
		})))
		.pipe(gulpif(!global.production, htmlbeautify({
			indent_with_tabs: true
		})))
		.pipe(rename((path) => path.extname = '.html'))
		.pipe(gulp.dest(paths.dest))
		.pipe(browserSync.stream())

}



gulp.task('html', html)