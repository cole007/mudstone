/*
 * Enviroment variables, and output directories
 */
var assets = './_assets/', 
    build = './_build/',
    root = './',
    env = 'dev',
    outputStyle = 'expanded';
/*
 * Update values based on environment
 */
if(env === 'live') {
    root = build;
    outputStyle = 'compressed';
    assets = build + '_assets/';
}
/*
 * Site url used for page insights
 */
var url = '';

/*
 * Autoprefix browser suppport
 */
var AUTOPREFIXER_BROWSERS = [
      'ie >= 10',
      'ie_mob >= 10',
      'ff >= 30',
      'chrome >= 34',
      'safari >= 7',
      'opera >= 23',
      'ios >= 7',
      'android >= 4.4',
      'bb >= 10' 
    ];
/*
 * module exports
 * variables used by gulp tasks, see the tasks folder
 */
module.exports = {

  browserSync: {
        server: {
            baseDir: "./"
        }
  },

  sass: {
    src: assets + 'css/scss/style.scss',
    dest: assets + 'css',
    prefix: AUTOPREFIXER_BROWSERS,
    watch: assets + 'css/scss/**/*.scss',
    options: {
      outputStyle: outputStyle
    },
    output: 'style.min.css'
  },

  images: {
    src: assets + 'images/site/*',
    dest: assets + 'images'
  },

  scripts: {
    src: [
      assets + 'js/libs/jquery-1.11.2.min.js',
      assets + 'js/libs/plugins.js',
      assets + 'js/libs/overflow-polyfill/*.js',
      assets + 'js/application.js',
      assets + 'js/behaviours/*.js',
      assets + 'js/script.js'
    ],
    dest: assets + 'js/dist',
    output: 'app.js',
    hint:  assets + 'js/script.js'
  },

  sprites: {
    data: assets + 'images/png-sprites/*.png',
    imgName: 'sprite.png',
    cssName: '_sprites.scss',
    imgPath: '../images/sprite.png',
    spriteDataImg: assets + 'images',
    spriteDataCss: assets + 'css/scss/gulp/'
  },

  svg: {
    src: assets + 'images/svg-sprites/*.svg',
    dest: assets + 'images',
    css: '../css/scss/gulp/_svg-sprites.scss',
    sprite: 'svg-sprite.svg',
    template: assets + 'css/scss/_tpl/_sprite-template.scss',
    pngs: 'sprites'
  },


  svgStore: {
    src: assets + 'images/svg-inline/*.svg',
    dest: assets + 'images/svg-inline/output/',
    file: assets + 'images/svg-inline/inline-svg.html',

  },

  icons: {
    src: assets + 'images/icons/*.svg',
    dest: assets + 'fonts/',
    name: 'icon-font',
    path: assets + 'css/scss/_tpl/_icon-font-template.scss',
    targetPath: '../css/scss/gulp/_icon-font.scss',
    fontPath: '../fonts/'
  },
  
  html: {
    src: root + '**/*.html',
    build: assets + 'templates/dest/*.html',
    dest: root
  },
  
  env: env,

  psi : {
    nokey: 'true',
    url: '',
    strategy: 'mobile',
  },

  uncss: {
    css: assets + 'css/style.css', 
    html: root + '**/*.html',
    dest: assets + 'css'
  },

  cmq: {
    css: assets + 'css/style.css',
    dest: assets + 'css'
  },

  jade: {
    src: assets + 'jade/source/*.jade',
    watch: assets + 'jade/source/**/*.jade',
    dest: root,
    basedir: assets + 'jade/source'
  }

};
