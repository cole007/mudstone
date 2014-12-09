var assets = './_assets/';
var root = './';


var paths = {
  scss: {
    src: assets + 'css/scss',
    dest: assets + 'css'
  },
  js: {
    src: assets + 'js',
    dest: assets + 'js/dist'
  },
  sprites: {  
    data: assets + 'images/sprites/*.png',
    spriteName: 'sprite.png',
    cssName: '_sprites.scss',
    imgPath: '../images/sprite.png',
    spriteDataImg: assets + 'images',
    spriteDataCss: assets + '/libs/'
  },
  images: {
    src: assets + 'images/site',
    dest: assets + 'images'
  }
}

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


module.exports = {
  browserSync: {
    server: {
        baseDir: "./"
    }
  },
  sass: {
    src: paths.scss.src + '/style.scss',
    dest: paths.scss.dest,
    prefix: AUTOPREFIXER_BROWSERS,
    watch: paths.scss.src + '/**/*.scss'
  },
  images: {
    src: paths.images.src,
    dest: paths.images.dest
  },
  scripts: {
    src: [
      paths.js.src + '/script.js'
    ],
    dest: paths.js.dest,
    output: 'app.js'
  },
  sprites: {
    data: paths.sprites.data,
    imgName: paths.sprites.spriteName,
    cssName: paths.sprites.cssName,
    imgPath: paths.sprites.imgPath,
    spriteDataImg: paths.sprites.spriteDataImg,
    spriteDataCss: paths.sprites.spriteDataCss
  }
};
