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
const state = 'dev'; 
/*
 * src directories
 */
const assets = './_assets/';
/*
 * Build directory conditionals, based on state
*/ 
const public_html = 'public';
const build = (state === 'dev') ? `tmp/${public_html}/_assets/` : `deploy/${public_html}/_assets/`;
const root = (state === 'dev') ? `tmp/${public_html}/` : `deploy/${public_html}/`;
// where should the jade templates be built, usually root, except when state === cms
const url = 'local.ournameismud.co.uk';
const craftLayout = '_layout.twig';
const craftLayoutPath = 'deploy/craft/templates/wrapper/';

/*
 * Default browsersync settings, 
*/ 
var server = { 
      server: {
          baseDir: root,
          directory: false
      },
      notify: false
    };

var jadeDest = root;
var tagSrc = ` ${root}*.html`;
var tagDest = root;

/*
 * Jade Build directory conditionals, based on state
 * CMS state Browsersync settings
*/ 
switch (state) {
  case "dev":
    jadeDest = root;
    break;
  case "static":
    jadeDest = `deploy/${public_html}/`;
    break;
  case "cms":
    jadeDest = '_assets/jade/dist/';
    tagSrc = `${craftLayout}${craftLayout}`;
    tagDest = `${craftLayout}`;
    server = {
      proxy: url,
      notify: false
    };
    break;
}
/*
 * Autoprefix browser suppport
 */
const AUTOPREFIXER_BROWSERS = [
      'ie >= 9',
      'ie_mob >= 10',
      'ff >= 40',
      'chrome >= 47',
      'safari >= 7',
      'opera >= 33',
      'ios >= 7',
      'android >= 4.4',
      'bb >= 10'
    ];
/*
 * module exports
 * variables used by gulp tasks, see the tasks folder
 */
const config = {
 
  browserSync: server,
 
  sass: {
    src: [`${assets}scss/style.scss`, `${assets}scss/ie.scss`],
    dest: `${build}css`,
    prefix: AUTOPREFIXER_BROWSERS,
    watch: assets + 'scss/**/**/*.scss',
    options: {
      outputStyle: 'expanded'
    }
  },


  js: {
    src: `${assets}js/app.js`,
    libs: [`${assets}js/libs/*.js`, `${assets}js/plugins/*.js`],
    path: `${assets}js/`,
    libsOutput: 'libs.js',
    output: 'app.js',
    // temp files for devleoping
    tmp: `${build}js/deps`,
    // build dest for final output
    dest: `${build}js/dist`,
    // scripts for the <head> section
    deps: [`${assets}js/libs/modernizr.min.js`],
    depsDest: `${build}js/libs/`,
    // html tags
    prodTag: '/_assets/js/dist/app.js',
    devTag: ['/_assets/js/deps/libs.js', '/_assets/js/dist/app.js']
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
    fileDest: `${assets}images/svg-symbols/output/`,
    file: `${assets}images/svg-symbols/source.html`,
    fileName: 'source.html',
    jadeDest: `${assets}jade/source/_includes`
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
  // png sprite assets 
  sprites: {
    data: `${assets}images/png-sprites/*.png`,
    imgName: 'png-sprite.png',
    cssName: '_png-sprites.scss',
    imgPath: '../images/png-sprite.png',
    spriteDataImg: `${build}images`,
    spriteDataCss: `${assets}scss/_system/gulp/`
  },
 
  uncss: {
    css: `${build}css/style.css`,
    html: root + '**/*.html',
    dest: `${build}css`
  },
 
  jade: {
    src: `${assets}jade/source/*.jade`,
    watch: `${assets}jade/source/**/*.jade`,
    dest: jadeDest,
    basedir: `${assets}jade/source`
  },

  fonts: {
    src: `${assets}fonts/*.*`,
    dest: `${build}fonts/`
  },

  webfontcss: {
    src: `${assets}scss/fonts.css`,
    dest: `${build}css/`
  },

  tags: {
    src: tagSrc,
    dest: tagDest,
  },

  favicons: {
    src: `${assets}favicons/*`,
    dest: `${build}favicons/`
  }
 
};


export default config;