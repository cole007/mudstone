import gulp from 'gulp'
import svgmin from 'gulp-svgmin'
import svgSprite from 'gulp-svg-sprite'
import spritesmith from 'gulp.spritesmith'
import imagemin from 'gulp-imagemin'
import { handleErrors } from '../libs/utils'
import browserSync from 'browser-sync'
import path from 'path'
import buffer from 'vinyl-buffer'
import merge from 'merge-stream'


export function spritesTask() {

	const {
		dest,
		template
	} = TASK_CONFIG.sprites.mode.css.render.scss
	const paths = {
		src: path.resolve(process.env.PWD, PATH_CONFIG.src, PATH_CONFIG.sprites.src, '*.svg'),
		dest: path.resolve(process.env.PWD, PATH_CONFIG.dest, PATH_CONFIG.sprites.dest)
	}

	TASK_CONFIG.sprites.mode.css.render.scss.dest = `/_assets/${PATH_CONFIG.scss.src}/${dest}`
	TASK_CONFIG.sprites.mode.css.render.scss.template = path.resolve(process.env.PWD, template)

	return gulp.src(paths.src)
		.pipe(svgmin())
		.pipe(svgSprite(TASK_CONFIG.sprites))
		.pipe(gulp.dest(paths.dest))
		.pipe(browserSync.stream())
}

export function pngsTask() {

	const { output, scssPath, scssFile, imagePath, template } = TASK_CONFIG.pngs
	const paths = {
		src: path.resolve(process.env.PWD, PATH_CONFIG.src, PATH_CONFIG.pngs.src, '*.png'),
		dest: path.resolve(process.env.PWD, PATH_CONFIG.dest, PATH_CONFIG.pngs.dest)
	}
	// Generate our spritesheet
	const spriteData = gulp.src(paths.src)
		.pipe(spritesmith({
			imgName: output,
			cssName: scssFile,
			imgPath: imagePath,
			cssTemplate: template,
			cssVarMap: function (sprite) {
				sprite.name = sprite.name
			}
		}))
		.on('error', handleErrors)

	// Pipe image stream through image optimizer and onto disk
	const imgStream = spriteData.img
		// DEV: We must buffer our stream into a Buffer for `imagemin`
		.pipe(buffer())
		.pipe(imagemin())
		.pipe(gulp.dest(paths.dest))

	// Pipe CSS stream through CSS optimizer and onto disk
	const cssStream = spriteData.css
		.pipe(gulp.dest(scssPath))

	// Return a merged stream to handle both `end` events
	return merge(imgStream, cssStream)

}

gulp.task('sprites', spritesTask)
gulp.task('pngs', pngsTask)
