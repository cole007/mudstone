import gulp from 'gulp'
import htmlreplace from 'gulp-html-replace'

export function cacheBusterTask() {

	const production = {
		'js': `${PATH_CONFIG.tags.js}${TASK_CONFIG.js.filename}.${TASK_CONFIG.stamp}.js`,
		'css': `${PATH_CONFIG.tags.css}${TASK_CONFIG.scss.filename}.${TASK_CONFIG.stamp}.css`,
		'ie': `${PATH_CONFIG.tags.css}${TASK_CONFIG.scss.ie}.${TASK_CONFIG.stamp}.css`
	}

	const development = {
		'js': `${PATH_CONFIG.tags.js}${TASK_CONFIG.js.filename}.js`,
		'css': `${PATH_CONFIG.tags.css}${TASK_CONFIG.scss.filename}.css`,
		'is': `${PATH_CONFIG.tags.css}${TASK_CONFIG.scss.is}.css`
	}

	const files = global.production ? production : development

	return gulp.src(PATH_CONFIG.tags.src)
		.pipe(htmlreplace(files, {
			keepBlockTags: true
		}))
		.pipe(gulp.dest(PATH_CONFIG.tags.dest))
}

gulp.task('cacheBuster', cacheBusterTask)