import gulp from 'gulp'
import runSequence from 'run-sequence'
import config from '../config'
import del from 'del'
import htmlreplace from'gulp-html-replace'

const $fonts = config.fonts
const $favicons = config.favicons
const $json = config.json
const $webfontcss = config.webfontcss
const $template = config.template
const $video = config.video
const $clean = config.clean
const $tags = config.tags
const $js = config.js
const $sass = config.sass

gulp.task('bust-cache', () => {
	gulp.src($tags.src)
		.pipe(htmlreplace({
			'js': `${$js.build}/${$js.output}?v=${Date.now()}`,
			'css': `${$sass.build}/${$sass.output}?v=${Date.now()}`
		}, {
			keepBlockTags: true
		}))
		.pipe(gulp.dest($tags.dest))
})



gulp.task('build-video', () => gulp.src($video.src).pipe(gulp.dest($video.dest)))
gulp.task('build-fonts', () => gulp.src($fonts.src).pipe(gulp.dest($fonts.dest)))
gulp.task('build-webfontcss', () => gulp.src($webfontcss.src).pipe(gulp.dest($webfontcss.dest)))
gulp.task('build-favicons', () => gulp.src($favicons.src).pipe(gulp.dest($favicons.dest)))
gulp.task('build-json', () => gulp.src($json.src).pipe(gulp.dest($json.dest)))
gulp.task('build-template', () => gulp.src($template.src).pipe(gulp.dest($template.dest)))

gulp.task('init', () => {
	del([`${$clean.assets}/*`, `${$clean.html}/*.html`]).then(() => {
		runSequence(
			'symbols', [
				'images',
				'svg-assets',
				'build-webfontcss',
				'build-favicons',
				'build-video',
				'build-fonts'
			],
			'move-scripts',
			'scripts',
			'sass',
			'pug')
	})
})

gulp.task('build-production', ['sass', 'scripts', 'bust-cache'])
