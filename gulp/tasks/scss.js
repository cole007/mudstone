import gulp from 'gulp'
import rename from 'gulp-rename'
import sass from 'gulp-sass'
import sourcemaps from 'gulp-sourcemaps'
import autoprefixer from 'autoprefixer'
import postcss from 'gulp-postcss'
import cssnano from 'gulp-cssnano'
import gulpif from 'gulp-if'
import writeSVG from 'postcss-write-svg'
import aspectRatio from 'postcss-aspect-ratio'
import animateCss from 'postcss-animation'
import postcssTriangle from 'postcss-triangle'
import quantityQueries from 'postcss-quantity-queries'
import objectFitImages from 'postcss-object-fit-images'
import styleLint from 'gulp-stylelint'
import lost from 'lost'
import browserSync from 'browser-sync'
import { handleErrors } from '../libs/utils'
import path from 'path'

export function scss() {


	const paths = {
		src: path.resolve(process.env.PWD, PATH_CONFIG.src, PATH_CONFIG.scss.src, '**/**/*.scss'),
		dest: path.resolve(process.env.PWD, PATH_CONFIG.dest, PATH_CONFIG.scss.dest)
	}


	return gulp.src(paths.src)
		.pipe(styleLint({
			debug: true,
			failAfterError: false,
			syntax: 'scss',
			reporters: [{
				formatter: 'string',
				console: true
			}]
		}))
		.on('error', handleErrors)
		.pipe(gulpif(!global.production, sourcemaps.init()))
		.pipe(sass(TASK_CONFIG.scss.options))
		.on('error', handleErrors)
		.pipe(gulpif(!global.production, sourcemaps.init({
			loadMaps: true
		})))
		.pipe(postcss([
			objectFitImages(),
			animateCss(),
			aspectRatio(),
			postcssTriangle(),
			quantityQueries(),
			lost(),
			writeSVG({
				encoding: 'base64'
			}),
			autoprefixer(TASK_CONFIG.scss.autoprefixer)
		]))
		.on('error', handleErrors)
		.pipe(gulpif(global.production, cssnano(TASK_CONFIG.scss.cssnanoOptions)))
		.pipe(gulpif(!global.production, sourcemaps.write()))
		.pipe(gulpif(global.production, rename({
			suffix: `.${TASK_CONFIG.stamp}`
		})))
		.pipe(gulp.dest(paths.dest))
		.pipe(browserSync.stream())
}


gulp.task('scss', scss)