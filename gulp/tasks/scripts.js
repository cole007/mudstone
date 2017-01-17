/*eslint no-undef: "error"*/

import gulp from 'gulp'
import rollup from 'rollup-stream'
import babel from 'rollup-plugin-babel'
import eslint from 'rollup-plugin-eslint'
import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import replace from 'rollup-plugin-replace'
import uglify from 'rollup-plugin-uglify'
import config from '../config'
import source from 'vinyl-source-stream'
import handleErrors from '../util/handleErrors'

const $js = config.js

let cache

const options = {
	entry: $js.src,
	dest: `${$js.dest}/${$js.output}`,
	format: 'iife',
	sourceMap: (process.env.NODE_ENV !== 'production' && 'inline'),
	cache: cache,
	plugins: [
		resolve({
			jsnext: true,
			main: true,
			browser: true
		}),
		commonjs({
			include: 'node_modules/**'
		}),
		eslint({
			exclude: $js.lint.ignore
		}),
		babel({
			exclude: 'node_modules/**',
			presets: [
				'stage-0',
				'stage-2',
				['es2015', {
					'modules': false
				}]
			],
			plugins: [
				'external-helpers',
				'syntax-object-rest-spread',
				'transform-es2015-parameters',
				'transform-es2015-destructuring',
				'transform-object-rest-spread',
				'transform-class-properties'
			],
			babelrc: false,
			runtimeHelpers: true
		}),
		replace({
			ENV: JSON.stringify(process.env.NODE_ENV || 'development')
		}),
		(process.env.NODE_ENV === 'production' && uglify())
	]
}

gulp.task('scripts', () => {
	return rollup(options)
		.on('error', handleErrors)
		.on('bundle', (bundle) => {
			cache = bundle
		})
		.pipe(source($js.output))
		.pipe(gulp.dest($js.dest))
})

gulp.task('move-scripts', () => gulp.src($js.libs).pipe(gulp.dest($js.libsDest)))
