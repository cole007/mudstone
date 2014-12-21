/*
 * Enviroment variables, and output directories
 */
var assets = './_assets/', 
    build = './_build/',
    buildAssets = assets,
    root = './',
    env = 'dev',
    outputStyle = 'expanded';


/*
 * Update values based on environment
 */
if(env === 'live') {
    root = build;
    outputStyle = 'compressed';
    buildAssets = build + '_assets/';
}

/*
 * Site url used for page insights
 */
var url = 'http://www.google.com';

/*
 * Resource paths
 */
var paths = {
      scss: {
        src: assets + 'css/scss',
        dest: buildAssets + 'css',
        outputStyle: outputStyle
      },
      js: {
        src: assets + 'js',
        dest: buildAssets + 'js/dist',
        hint:  assets + 'js/script.js'
      },
      sprites: {  
        data: assets + 'images/sprites/*.png',
        spriteName: 'sprite.png',
        cssName: '_sprites.scss',
        imgPath: '../images/sprite.png',
        spriteDataImg: buildAssets + 'images',
        spriteDataCss: assets + 'css/scss/libs/'
      },
      images: {
        src: assets + 'images/site/*',
        dest: buildAssets + 'images'
      },
      html: {
        src: root + '**/*.html',
        build: assets + 'templates/dest/*.html',
        dest: root
      },
      haml: {
        src: assets + 'templates/source/**/*.haml',
        dest: assets + 'templates/dest/',
        partials: assets + 'templates/dest/includes',
      }
    };

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
        baseDir: root
    }
  },
  sass: {
    src: paths.scss.src + '/style.scss',
    dest: paths.scss.dest,
    prefix: AUTOPREFIXER_BROWSERS,
    watch: paths.scss.src + '/**/*.scss',
    options: {
       outputStyle: paths.scss.outputStyle
    },
    output: 'style.min.css'
  },
  images: {
    src: paths.images.src,
    dest: paths.images.dest
  },
  scripts: {
    src: [
      paths.js.src + '/libs/jquery-1.10.2.min.js',
      paths.js.src + '/plugins.js',
      paths.js.src + '/script.js'
    ],
    dest: paths.js.dest,
    output: 'app.js',
    hint: paths.js.hint
  },
  sprites: {
    data: paths.sprites.data,
    imgName: paths.sprites.spriteName,
    cssName: paths.sprites.cssName,
    imgPath: paths.sprites.imgPath,
    spriteDataImg: paths.sprites.spriteDataImg,
    spriteDataCss: paths.sprites.spriteDataCss
  },
  html: {
    src: paths.html.src,
    build: paths.html.build,
    dest: paths.html.dest
  },
  haml : {
    src: paths.haml.src,
    dest: paths.haml.dest,
    partials: paths.haml.partials
  },
  env: env,

  psi : {
    nokey: 'true',
    url: '',
    strategy: 'mobile',
  },

  uncss: {
    css: buildAssets + 'css/style.css',
    html: root + '**/*.html',
    dest: buildAssets + 'css/dist'
  },

  cmq: {
    css: buildAssets + 'css/style.css',
    dest: buildAssets + 'css/dist'
  }
};
