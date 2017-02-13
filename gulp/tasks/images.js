import changed from 'gulp-changed'
import gulp from 'gulp'
import svgmin from 'gulp-svgmin'
import imagemin from 'gulp-imagemin'
import handleErrors from '../util/handleErrors'
import webp from 'gulp-webp'
import browserSync from 'browser-sync'
import config from '../config'

const $images = config.images
const $svg = config.svg

gulp.task('images', () => {
	return gulp.src($images.src)
		.pipe(changed($images.dest))
		.pipe(imagemin())
		.on('error', handleErrors)
		.pipe(gulp.dest($images.dest))
		.pipe(browserSync.create().reload({
			stream: true
		}))
})


gulp.task('svg-assets', () => {
	return gulp.src($svg.assets)
		.pipe(svgmin())
		.on('error', handleErrors)
		.pipe(gulp.dest($svg.dest))
		.pipe(browserSync.create().reload({
			stream: true
		}))
})


gulp.task('webp', () => {
	return gulp.src($images.src)
		.pipe(webp())
		.on('error', handleErrors)
		.pipe(gulp.dest($svg.dest))
		.pipe(browserSync.create().reload({
			stream: true
		}))
})
