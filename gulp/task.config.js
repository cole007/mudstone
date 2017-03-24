/*
	Task config

	Warning... when using either the watch or task propety there MUST 
	be a task and with the same name, and a named function with Task appended
	For example

	json: {
		watch: true,
		task: 'asset',
		extensions: ['json']
	}

	export function jsonFunk() {}
	gulp.task('json', jsonFunk)

	/tasks/index.php
	export { jsonFunk } from './file'

	Keys with watch set to true will be watched!
	Keys with task = asset will be compiled before tasks = code

	Every task MUST have an array of extensions
	For example ['html, 'json']

	Note. 
	The js task is mainly used by webpack, only the filename is ever used by gulp
*/
export default {

	stamp: Date.now(),

	js: {
		entries: {
			app: ['./app.js']
		},
		extensions: ['js', 'json'],
		extractSharedJs: false,
		filename: 'bundle' // no extension
	},

	es5: {
		extensions: ['js'],
		task: 'code',
		watch: true,
		output: 'bundle.js',
		folder: 'js'
	},

	json: {
		watch: true,
		task: 'asset',
		extensions: ['json']
	},

	pug: {
		extensions: ['pug'],
		task: 'code',
		watch: true,
		excludeFolders: ['_mixins', '_includes', '_sidebars', '_modules', 'wrapper', '_wrapper']
	},


	scss: {
		task: 'code',
		watch: true,
		autoprefixer: {
			browsers: ['last 8 version']
		},
		options: {
			indentedSyntax: false,
			outputStyle: 'expanded'
		},
		cssnanoOptions: {
			autoprefixer: false
		},
		extensions: ['scss'],
		lintIgnorePaths: ['_system/**/*.scss', '_config/*.scss'],
		filename: 'style', // no extension
		ie: 'ie'
	},

	html: {
		task: 'code',
		watch: true,
		dataFile: 'data/global.json',
		extensions: ['njk', 'html', 'json'],
		excludeFolders: ['layout', 'macros', 'data', 'partials', 'modules', 'wrapper', 'includes']
	},

	images: {
		task: 'asset',
		watch: true,
		extensions: ['jpg', 'png', 'svg', 'gif']
	},

	svgs: {
		task: 'asset',
		watch: true,
		extensions: ['svg']
	},

	pngs: {
		task: 'asset',
		watch: true,
		template: 'gulp/libs/png-sprites.tmp.scss.handlebars',
		scssPath: '_assets/scss/_system/gulp-output/',
		scssFile: '_png-sprites.scss',
		output: 'png-sprite.png',
		imagePath: '../images/png-sprite.png',
		extensions: ['png']
	},

	sprites: {
		task: true,
		watch: true,
		mode: {
			css: {
				spacing: {
					padding: 0
				},
				dest: './',
				layout: 'diagonal',
				sprite: 'svg-sprite.svg',
				bust: false,
				render: {
					scss: {
						dest: '_system/gulp-output/_svg-sprites.scss',
						template: 'gulp/libs/sprites.tmp.scss'
					}
				}
			}
		},

		extensions: ['svg']
	},

	cssFonts: {
		task: 'asset',
		watch: true,
		extensions: ['css']
	},

	fonts: {
		task: 'asset',
		watch: true,
		extensions: ['woff2', 'woff', 'eot', 'ttf', 'svg']
	},

	favicons: {
		task: 'asset',
		extensions: ['xml', 'ico', 'json', 'png', 'svg']
	},

	symbols: {
		task: 'asset',
		watch: true,
		scssTemplate: '../gulp/libs/symbols.tmp.scss',
		scssOutputPath: 'scss/_system/gulp-output/',
		scssOutputFile: '_svg-symbols.scss',
		sourceFile: 'images/svg-symbols/source.html',
		fileName: 'symbols.njk',
		extensions: ['svg']
	},

	iconFont: {
		task: 'asset',
		watch: true,
		name: 'icon-font',
		template: 'gulp/libs/iconfont.tmp.scss',
		scss: '../../../../_assets/scss/_system/gulp-output/_icon-font.scss',
		fontPath: '../fonts/',
		extensions: ['svg']
	},

	watch: {
		gulpWatch: {
			usePolling: false
		}
	}
}