import gulp from 'gulp'
import svgmin from 'gulp-svgmin'
import iconfont from 'gulp-iconfont'
import iconfontCss from 'gulp-iconfont-css'
import { handleErrors } from '../libs/utils'
import path from 'path'


export function iconFontTask() {

	const paths = {
		src: path.resolve(process.env.PWD, PATH_CONFIG.src, PATH_CONFIG.iconFont.src, '*.svg'),
		dest: path.resolve(process.env.PWD, PATH_CONFIG.dest, PATH_CONFIG.iconFont.dest)
	}

	const { name, template, scss, fontPath } = TASK_CONFIG.iconFont

	gulp.src(paths.src)
		.pipe(svgmin())
		.pipe(iconfontCss({
			fontName: name,
			path: template,
			targetPath: scss,
			fontPath: fontPath
		}))
		.pipe(iconfont({
			fontName: name, // required
			appendCodepoints: true, // recommended option
			normalize: true,
			fontHeight: 500,
			centerHorizontally: true
		}))
		.on('error', handleErrors)
		.pipe(gulp.dest(paths.dest))
}


gulp.task('iconFont', iconFontTask)