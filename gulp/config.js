/*
 * Enviroment variables, and output directories
 */
var assets = './_assets/',
    base = 'tmp',
    env = 'dev', //  env = dev will create sourcemaps, set as live will not
    outputStyle = 'expanded', // scss output style
    build,
    server,
    assetPath = "/_assets/"; 
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
var state = 'dev', 
    jadeDest = root, // where should the jade templates be built, usually root, except when state === cms
    public_html = 'public',
    url = 'local.ournameismud.co.uk';
/*
 * Update values based on environment
 */
if(env === 'live') {
  outputStyle = 'compressed';
}

/*
 * Build directory conditionals, based on state
*/ 
if(state === 'dev') {
    root = 'tmp/' + public_html + '/';
    build = 'tmp/' + public_html + '/_assets/';
} else {
    root = 'deploy/' + public_html + '/';
    build = 'deploy/' + public_html + '/_assets/';
}

/*
 * Jade Build directory conditionals, based on state
*/ 
if(state === 'dev') {
  jadeDest = root;
} else if(state === 'static') {
  jadeDest = 'deploy/' + public_html + '/';
} else if(state === 'cms') {
  jadeDest = '_assets/jade/dist/';
}

/*
 * Browsersync settings, based on state
*/ 
if(state === 'dev' || state === 'static') {
  server = { 
    server: {
        baseDir: root,
        directory: false
    },
    notify: false
  }
} else {
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

  //^\is-\S+
 
  scripts: {
    src: assets + 'js/app.js',
    libs: assets + 'js/libs/*.js',
    path: assets + 'js/',
    libsOutput: 'libs.js',
    output: 'app.js',
    tmp: build + 'js/tmp',
    dest: build + 'js/dist',
  },
 
  sprites: {
    data: assets + 'images/png-sprites/*.png',
    imgName: 'png-sprite.png',
    cssName: '_png-sprites.scss',
    imgPath: '../images/png-sprite.png',
    spriteDataImg: build + 'images',
    spriteDataCss: assets + 'scss/_system/gulp/'
  },
 
  svg: {
    src: assets + 'images/svg-sprites/*.svg',
    dest: build + 'images',
    css: '../../../../_assets/scss/_system/gulp/_svg-sprites.scss',
    sprite: 'svg-sprite.svg',
    template: assets + 'scss/_system/_tpl/_sprite-template.scss',
    pngs: assets + 'images/png-sprites',
    assets: assets + 'images/svg-assets/*.svg'
  },
 
 
  svgStore: {
    src: assets + 'images/svg-inline/*.svg',
    dest: assets + 'images/svg-inline/output/',
    file: assets + 'images/svg-inline/source.html',
    fileName: 'source.html',
    jadeDest: assets + 'jade/source/_includes'
  },
 
  icons: {
    src: assets + 'images/icons/*.svg',
    dest: build + 'fonts/',
    name: 'icon-font',
    path: assets + 'scss/_system/_tpl/_icon-font-template.scss',
    targetPath: '../../../../_assets/scss/_system/gulp/_icon-font.scss',
    fontPath: '../fonts/'
  },
 
  html: {
    src: root + '**/*.html',
    build: assets + 'templates/dest/*.html',
    dest: root
  },
 
  env: env,
 
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
    html_dest: build + 'static/',
    htmlScript: root + '*.html',
    htmlScriptDest: root
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

