/*
 * Enviroment variables, and output directories
 */
var assets = './_assets/', 
    build = './_assets/',
    root = './',
    env = 'dev',
    outputStyle = 'expanded',
    assetPath = "/_assets/";
/*
 * Update values based on environment
 */
if(env === 'live') {
    outputStyle = 'compressed';
    assetPath = "/_build/";
    build = './_dist/_build/';
    root = '_dist'
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
      assets + 'js/libs/jquery-1.11.2.min.js',
      assets + 'js/plugins/*.js',
      assets + 'js/application.js',
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
    css: '../../../_assets/css/scss/gulp/_svg-sprites.scss',
    sprite: 'svg-sprite.svg',
    template: assets + 'css/scss/_tpl/_sprite-template.scss',
    pngs: 'png-sprites'
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
    js_src: [assets + 'js/libs/modernizr.touch.min.js'],
    js_dest: build + 'js/libs/',
    fonts_src: assets + 'fonts/*.*',
    fonts_dest: build + 'fonts/',
    images_src: assets + 'images/*.*',
    images_dest: build + 'images/',
    css_src: assets + 'css/*.css',
    css_dest: build + 'css/'
  }

};
