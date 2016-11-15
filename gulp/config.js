/*
 * @param state
 * During html development state must equal 'dev',
 * This will build files into the tmp directory
 * and set browsersync to use the tmp directory as root
 *
 * Deployment builds, for static sites (no cms) state must equal 'static'
 * This will build files into the deploy directory and
 * browsersync will use this directory as the root
 *
 * CMS builds, state must equal 'cms'
 * This is the same as static except the url variable is used
 * as a proxy for browsersync
 */
const state = 'dev'

/*
 * src directories
 */
const assets = './_assets/'
	/*
	 * Build directory conditionals, based on state
	 */
const publicHtml = 'public'
const build = (state === 'dev') ? `tmp/${publicHtml}/_assets/` : `deploy/${publicHtml}/_assets/`
const root = (state === 'dev') ? `tmp/${publicHtml}/` : `deploy/${publicHtml}/`
	// where should the pug templates be built, usually root, except when state === cms
const url = 'www.bla.com'
const craftSourcePath = './deploy/craft/templates/includes/'

/*
 * Default browsersync settings,
 */
let browserSync = {
	server: {
		baseDir: root,
		directory: false,
		index: 'index.html'
	},
	notify: false
}

let pugDest = root
let tagSrc = `./${root}*.html`
let tagDest = root

/*
 * pug Build directory conditionals, based on state
 * CMS state Browsersync settings
 */

switch (state) {
  case 'static': {
    pugDest = `deploy/${publicHtml}/`
    break
  }
	case 'cms':	{
		pugDest = '_assets/html/dist/'
		tagSrc = './deploy/craft/templates/wrapper/_layout.twig',
		tagDest = './deploy/craft/templates/wrapper/'
		browserSync = {
			proxy: url,
			notify: false
		}
		break
	}
}
/*
 * Autoprefix browser suppport
 */

const AUTOPREFIXER_BROWSERS = [
  'ie >= 9',
  'ie_mob >= 10',
  'ff >= 45',
  'chrome >= 50',
  'safari >= 7',
  'opera >= 33',
  'ios >= 7',
  'android >= 4.4',
  'bb >= 10'
]
	/*
	 * module exports
	 * variables used by gulp tasks, see the tasks folder
	 */
const config = {

	browserSync,

	state,

	url,

	sass: {
		src: [`${assets}scss/*.scss`],
		dest: `${build}css`,
		prefix: AUTOPREFIXER_BROWSERS,
		watch: `${assets}scss/**/**/*.scss`,
		options: {
			outputStyle: 'expanded'
		},
		lint: {
			ignore: [`${assets}scss/_system/**/*.scss`],
			include: [`${assets}scss/base/*.scss`]
		}
	},

	craft: {
		watch: './deploy/craft/templates/**/**/**.*'
	},

	js: {
		src: `${assets}js/app.js`,
		watch: `${assets}js/**/**/*.js`,
		output: 'app.js',
		// temp files for devleoping
		// build dest for final output
		dest: `${build}js/dist`,
		// scripts for the <head> section
		libs: [`${assets}js/libs/modernizr.min.js`],
		libsDest: `${build}js/libs/`,

		lint: {
			ignore: `${assets}js/libs/*.js`
		}
	},

	// jpegs/pngs/etc
	images: {
		src: `${assets}images/site/*`,
		dest: `${build}images`
	},
	//svg symbols
	svgSymbols: {
		src: `${assets}images/svg-symbols/*.svg`,
		dest: `${build}images/`,
		iconTemplate: `${assets}scss/_system/_tpl/_svg-symbols.scss`,
		cssPath: `${assets}scss/_system/gulp/`,
		cssOutput: '_svg-symbols.scss',
		fileDest: state === 'dev' ? `${assets}html/pug/_includes/` : craftSourcePath,
		file: `${assets}images/svg-symbols/source.html`,
		fileName: state === 'dev' ? 'source.pug' : '_source.twig',
		pugDest: `${assets}html/pug/_includes`
	},
	//svg sprites/assets
	svg: {
		src: `${assets}images/svg-sprites/*.svg`,
		dest: `${build}images`,
		css: '../../../../_assets/scss/_system/gulp/_svg-sprites.scss',
		sprite: 'svg-sprite.svg',
		template: `${assets}scss/_system/_tpl/_sprite-template.scss`,
		pngs: `${assets}images/png-sprites`,
		assets: `${assets}images/svg-assets/*.svg`
	},

	uncss: {
		src: `${build}css/style.css`,
		html: `${root}**/*.html`,
		dest: `${build}css`
	},

	critical: {
		inline: true,
		base: './',
		src: 'index.html',
		dest: 'dist/index-critical.html',
		minify: true,
		width: 1200,
		height: 480
	},

	pug: {
		src: `${assets}html/pug/*.pug`,
		watch: `${assets}html/pug/**/*.pug`,
		dest: pugDest,
		basedir: `${assets}html/pug`
	},

	fonts: {
		src: `${assets}fonts/*.*`,
		dest: `${build}fonts/`
	},

	video: {
		src: `${assets}video/*.*`,
		dest: `${build}video/`
	},

	webfontcss: {
		src: `${assets}scss/fonts.css`,
		dest: `${build}css/`
	},

	tags: {
		src: tagSrc,
		dest: tagDest
	},

	favicons: {
		src: `${assets}favicons/*`,
		dest: root
	},

	json: {
		src: `${assets}js/content/content.json`,
		dest: root
	},

	template: {
		src: `${assets}js/template/*.html`,
		dest: `${build}js/template/`
	},

	clean: {
		assets: build,
		html: pugDest
	}
}

export default config
