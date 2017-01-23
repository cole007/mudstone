import gulp from 'gulp'
import fs from 'fs'
import sass from 'gulp-sass'
import sourcemaps from 'gulp-sourcemaps'
import handleErrors from '../util/handleErrors'
import autoprefixer from 'autoprefixer'
import postcss from 'gulp-postcss'
import cssnano from 'gulp-cssnano'
import uncss from 'gulp-uncss'
import critical from 'critical'
import config from '../config'
import gulpif from 'gulp-if'
import writeSVG from 'postcss-write-svg'
import aspectRatio from 'postcss-aspect-ratio'
import animateCss from 'postcss-animation'
import postcssTriangle from 'postcss-triangle'
import quantityQueries from 'postcss-quantity-queries'
import objectFitImages from 'postcss-object-fit-images'
import sassLint from 'gulp-sass-lint'
import lost from 'lost'
import rename from 'gulp-rename'

const $sass = config.sass
const $uncss = config.uncss
const $critical = config.critical

gulp.task('sass', () => {
	return gulp.src($sass.watch)
		.on('error', handleErrors)
		.pipe(gulpif(process.env.NODE_ENV !== 'production', sassLint({
			options: {
				formatter: 'stylish',
				'merge-default-rules': false
			},
			rules: {
				'no-ids': 1,
				'no-mergeable-selectors': 0
			},
			files: {
				include: '_assets/scss/**/*.scss', // This will be ignored by gulp-sass-lint
				ignore: '_assets/scss/_system/**/*.scss' // This will still be respected and read
			}
		})))
		.on('error', handleErrors)
		.pipe(gulpif(process.env.NODE_ENV !== 'production', sassLint.format()))
		.on('error', handleErrors)
		.pipe(gulpif(process.env.NODE_ENV !== 'production', sassLint.failOnError()))
		.on('error', handleErrors)
		.pipe(gulpif(process.env.NODE_ENV !== 'production', sourcemaps.init()))
		.on('error', handleErrors)
		.pipe(sass({
			outputStyle: $sass.options.outputStyle
		}))
		.on('error', handleErrors)
		.pipe(gulpif(process.env.NODE_ENV !== 'production', sourcemaps.write({
			includeContent: false
		})))
		.pipe(gulpif(process.env.NODE_ENV !== 'production', sourcemaps.init({
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
			autoprefixer({
				browsers: $sass.prefix
			})
		]))
		.pipe(gulpif(process.env.NODE_ENV === 'production', cssnano()))
		.pipe(gulpif(process.env.NODE_ENV !== 'production', sourcemaps.write('./')))
		.on('error', handleErrors)
		.pipe(gulpif(process.env.NODE_ENV === 'production', rename({
			suffix: `-${config.stamp}`
		})))
		.pipe(gulp.dest($sass.dest))
})


/// this isn't ready for production yet
gulp.task('uncss', () => {
	return gulp.src($uncss.src)
		.pipe(uncss({
			html: JSON.parse(fs.readFileSync('./sitemap.json', 'utf-8')),
			ignore: [/\.no-\w+/g, /\.is-\w+/g, /\.plyr\w+/g, /\.lazy\w+/g]
		}))
		.pipe(cssnano())
		.on('error', handleErrors)
		.pipe(gulp.dest($uncss.dest))
})

const {
	inline,
	base,
	src,
	dest,
	minify,
	width,
	height
} = $critical

gulp.task('critical', () => critical.generate({
	inline,
	base,
	src,
	dest,
	minify,
	width,
	height
}))
