import gulp from 'gulp'
import svgmin from 'gulp-svgmin'
import handleErrors from '../util/handleErrors'
import browserSync from 'browser-sync'
import inject from 'gulp-inject'
import gulpif from 'gulp-if'
import svgSymbols from 'gulp-svg-symbols'
import runSequence from 'run-sequence'
import del from 'del'
import rename from 'gulp-rename'
import config from '../config'

const $symbols = config.svgSymbols

gulp.task('symbols',  () => {
	const svgs = gulp.src($symbols.src)
		.pipe(svgmin())
		.pipe(svgSymbols({
			svgId:      'icon--%f',
			className:  '.icon--%f',
			title:      false,
			warn:       true,
			fontSize:   0,
			templates: ['default-svg', $symbols.iconTemplate]
		}))
		.pipe(gulpif( /[.]svg$/, gulp.dest($symbols.dest)))
		.pipe(gulpif( /[.]scss$/, gulp.dest($symbols.cssPath)))

	function fileContents (filePath, file) {
		return file.contents.toString()
	}
	
	return gulp
		.src($symbols.file)
		.pipe(inject(svgs, { transform: fileContents }))
		.pipe(rename($symbols.fileName))
		.on('error', handleErrors)
		.pipe(gulp.dest($symbols.fileDest))
})
