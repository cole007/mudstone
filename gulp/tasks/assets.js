import browserSync from 'browser-sync'
import changed from 'gulp-changed'
import gulp from 'gulp'
import { getPaths } from '../libs/utils'
import path from 'path'

export function fontsTask () {
	const paths = getPaths('fonts')

	return gulp.src(paths.src)
		.pipe(changed(paths.dest)) // Ignore unchanged files
		.pipe(gulp.dest(paths.dest))
		.pipe(browserSync.stream())
}

export function faviconsTask () {
	const paths = getPaths('favicons')
	
	return gulp.src(paths.src)
		.pipe(changed(paths.dest)) // Ignore unchanged files
		.pipe(gulp.dest(paths.dest))
		.pipe(browserSync.stream())
}

export function moveScriptsTask () {

	const src = PATH_CONFIG.js.libs.map((lib) => {
		return path.resolve(process.env.PWD, lib)
	})

	const dest = path.resolve(process.env.PWD, PATH_CONFIG.dest, PATH_CONFIG.js.dest)

	return gulp.src(src)
		.pipe(gulp.dest(dest))
		.pipe(browserSync.stream())
}

export function jsonTask () {

	const paths = getPaths('json')

	return gulp.src(paths.entry)
		.pipe(gulp.dest(paths.dest))
		.pipe(browserSync.stream())
}



export function cssFontsTask () {

	const paths = {
		src: path.resolve(process.env.PWD, PATH_CONFIG.src, PATH_CONFIG.cssFonts.src, '*.css'),
		dest: path.resolve(process.env.PWD, PATH_CONFIG.dest, PATH_CONFIG.cssFonts.dest)
	}

	return gulp.src(paths.src)
		.pipe(gulp.dest(paths.dest))
		.pipe(browserSync.stream())
}

export function staticAssetsTask () {
	const paths = getPaths('static')

	return gulp.src(paths.src)
		.pipe(changed(paths.dest)) // Ignore unchanged files
		.pipe(gulp.dest(paths.dest))
		.pipe(browserSync.stream())
}

gulp.task('fonts', fontsTask)
gulp.task('cssFonts', cssFontsTask)
gulp.task('favicons', faviconsTask)
gulp.task('move-scripts', moveScriptsTask)
gulp.task('json', jsonTask)
gulp.task('staticAssets', staticAssetsTask)