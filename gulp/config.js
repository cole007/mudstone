/*
 * Enviroment variables, and output directories
 */
var assets = './_assets/',
    build = './_assets/',
    root = './',
    env = 'dev',
    outputStyle = 'expanded',
    assetPath = "_assets/",
    deployAssets = '_dist/_assets/',
    deployRoot = '_dist';
/*
 * Update values based on environment
 */
if(env === 'live') {
    outputStyle = 'compressed';
    assetPath = "/_assets/";
    build = '/_dist/_assets/';
    root = '_dist';
}
/*
 * Site url used for page insights
 */
var url = '';

/*
 * Autoprefix browser suppport
 */
var AUTOPREFIXER_BROWSERS = [
      'ie >= 9',
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
        baseDir: root,
        directory: false
    },
    notify: false
  },

  sass: {
    src: assets + 'css/scss/style.scss',
    dest: build + 'css',
    prefix: AUTOPREFIXER_BROWSERS,
    watch: assets + 'css/scss/**/*.scss',
    options: {
      outputStyle: outputStyle
    },
    output: 'style.min.css'
  },

  images: {
    src: assets + 'images/site/*',
    dest: build + 'images'
  },

  scripts: {
    src: [
      assets + 'js/libs/jquery-1.11.3.min.js',
      assets + 'js/plugins/*.js',
      assets + 'js/application.js',
      assets + 'js/tools.js',
      assets + 'js/behaviours/*.js'
    ],
    dest: build + 'js/dist',
    output: 'app.js',
    hint:  assets + 'js/behaviours/*.js'
  },

  sprites: {
    data: assets + 'images/png-sprites/*.png',
    imgName: 'png-sprite.png',
    cssName: '_png-sprites.scss',
    imgPath: '../images/png-sprite.png',
    spriteDataImg: build + 'images',
    spriteDataCss: assets + 'css/scss/gulp/'
  },

  svg: {
    src: assets + 'images/svg-sprites/*.svg',
    dest: build + 'images',
    css: '../../_assets/css/scss/gulp/_svg-sprites.scss',
    sprite: 'svg-sprite.svg',
    template: assets + 'css/scss/_tpl/_sprite-template.scss',
    pngs: assets + 'images/png-sprites',
    assets: assets + 'images/svg-assets/*.svg'
  },


  svgStore: {
    src: assets + 'images/svg-inline/*.svg',
    dest: assets + 'images/svg-inline/output/',
    file: assets + 'images/svg-inline/inline-svg.html',
    fileName: 'inline-svg.html',
    jadeDest: assets + 'jade/source/includes'
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
    dest: build + 'css'
  },

  cmq: {
    css: assets + 'css/style.css',
    dest: build + 'css'
  },

  jade: {
    src: assets + 'jade/source/*.jade',
    watch: assets + 'jade/source/**/*.jade',
    dest: root,
    path: assetPath,
    basedir: assets + 'jade/source'
  },


  build: {
    js_src: [assets + 'js/libs/modernizr.min.js'],
    js_dest: deployAssets + 'js/libs/',
    js_MergeDest: deployAssets + 'js/dist/',
    fonts_src: assets + 'fonts/*.*',
    fonts_dest: deployAssets + 'fonts/',
    images_src: assets + 'images/*.*',
    images_dest: deployAssets + 'images/',
    css_src: assets + 'css/*.css',
    css_dest: deployAssets + 'css/',
    html_src: root + '*.html',
    html_dest: deployRoot
  },

  styleguide: {
    scssRoot: assets + 'css/scss/style.scss',
    scssWatch: assets + 'css/scss/components/**/*.scss',
    scssBuild: '/_assets/css',
    readmore: assets + 'css/scss/README.md',
    tmp: 'tmp',
    buildRoot: 'docs/styleguide'
  }

};
