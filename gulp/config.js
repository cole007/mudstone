/*
 * Enviroment variables, and output directories
 */
var assets = './_assets/',
    base = 'tmp',
    env = 'dev',
    outputStyle = 'expanded',
    assetPath = "/_assets/",
    state = 'flat', 
    jadeDest = root;
    url = 'local.ournameismud.co.uk';
/*
 * Update values based on environment
 */
if(env === 'live') {
  outputStyle = 'compressed';
}

if(state === 'flat') {
    root = 'tmp/public_html/';
    build = 'tmp/public_html/_assets/';
    jadeDest = root;
    server = { 
      server: {
          baseDir: root,
          directory: false
      },
      notify: false
    }
} else {
    root = '/deploy/public_html/';
    build = '/deploy/public_html/_assets/';
    jadeDest = 'assets/jade/dist/'
    server = {
      proxy: url,
      notify: false
    }
}


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
 
  browserSync: server,
 
  sass: {
    src: [assets + 'scss/style.scss', assets + 'scss/ie.scss'],
    dest: build + 'css',
    prefix: AUTOPREFIXER_BROWSERS,
    watch: assets + 'scss/**/**/*.scss',
    options: {
      outputStyle: outputStyle
    }
  },
 
  images: {
    src: assets + 'images/site/*',
    dest: build + 'images'
  },
 
  scripts: {
    src: [
      assets + 'js/libs/jquery-1.11.3.min.js',
      assets + 'js/libs/underscore-min.js',
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
    spriteDataCss: assets + 'scss/gulp/'
  },
 
  svg: {
    src: assets + 'images/svg-sprites/*.svg',
    dest: build + 'images',
    css: '../../../../_assets/scss/gulp/_svg-sprites.scss',
    sprite: 'svg-sprite.svg',
    template: assets + 'scss/_tpl/_sprite-template.scss',
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
    dest: build + 'fonts/',
    name: 'icon-font',
    path: assets + 'scss/_tpl/_icon-font-template.scss',
    targetPath: '../../../../_assets/scss/gulp/_icon-font.scss',
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
    url: 'http://local.search-star.co.uk',
    strategy: 'mobile',
  },
 
  // THESE PATHS NEED UPDATING BEFORE USING THE UNCSS TASK
  uncss: {
    css: assets + 'css/style.css',
    html: root + '**/*.html',
    dest: build + 'css'
  },
 
 
  jade: {
    src: assets + 'jade/source/*.jade',
    watch: assets + 'jade/source/**/*.jade',
    dest: jadeDest,
    path: assetPath,
    basedir: assets + 'jade/source'
  },
 
  build: {
    js_src: [assets + 'js/libs/modernizr.min.js'],
    js_dest: build + 'js/libs/',
    js_MergeDest: build + 'js/dist/',
    fonts_src: assets + 'fonts/*.*',
    fonts_dest: build + 'fonts/',
    images_src: assets + 'images/*.*',
    images_dest: build + 'images/',
    css_src: build + 'css/*.css',
    css_dest: build + 'css/',
    html_src: root + '*.html',
    html_dest: build + 'static/'
  },
 
  // styleguide: {
  //   scssRoot: assets + 'scss/style.scss',
  //   scssWatch: assets + 'scss/components/**/*.scss',
  //   scssBuild: '/_assets/css',
  //   readmore: assets + 'scss/README.md',
  //   tmp: 'tmp',
  //   buildRoot: 'docs/styleguide'
  // }
 
};