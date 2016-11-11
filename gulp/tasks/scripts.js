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
import gulpif from 'gulp-if'

const $js = config.js

const options = {
	entry: $js.src,
	dest: `${$js.dest}/${$js.output}`,
	format: 'iife',
	sourceMap: (process.env.NODE_ENV !== 'production' && 'inline'),
	plugins: [
		resolve({
			jsnext: true,
			main: true,
			browser: true,
		}),
		commonjs({
			include: 'node_modules/**',
			namedExports: {
				// 'node_modules/jquery/dist/jquery.min.js': [ '' ],
			}
		}),
		eslint({
			exclude: $js.lint.ignore
		}),
		babel({
			exclude: 'node_modules/**',
			presets: ['es2015-rollup', 'stage-0'], 
			plugins: [
				"syntax-object-rest-spread",
				"transform-es2015-parameters",
				"transform-es2015-destructuring",
				"transform-object-rest-spread"
			], 
			babelrc: false
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
	.pipe(source($js.output))
	.pipe(gulp.dest($js.dest))
})

gulp.task('move-scripts', () => gulp.src($js.libs).pipe(gulp.dest($js.libsDest)))