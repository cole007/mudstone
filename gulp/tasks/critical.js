import gulp from 'gulp'
import critical from 'critical'
import htmlreplace from 'gulp-html-replace'
import path from 'path'


export function critialCss() {
	const { paths, templates } = PATH_CONFIG.critical

	paths.map(({url, template, dir}) => {
		critical.generate({
			inline: false,
			base:  path.resolve(process.env.PWD, PATH_CONFIG.dest),
			src: url,
			width: 1300,
			minify: true,
			height: 900
		}).then((output) => {
			gulp.src(path.resolve(process.env.PWD, PATH_CONFIG.dest, template))
				.pipe(htmlreplace({
					critical: {
						src: null,
						tpl: `<style>${output}</style>`
					}
				}, {
					keepBlockTags: true
				}))
				.pipe(gulp.dest(path.resolve(process.env.PWD, templates)))
		}).catch(err => console.log(err))
	})
}


gulp.task('critical', critialCss)