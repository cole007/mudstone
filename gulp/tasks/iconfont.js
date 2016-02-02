var gulp              = require('gulp'),                        
    svgmin            = require('gulp-svgmin'),       
    iconfont          = require('gulp-iconfont'),       
    config            = require('../config').icons,     
    handleErrors      = require('../util/handleErrors'),
    iconfontCss       = require('gulp-iconfont-css');    

gulp.task('iconfont', function(){
 gulp.src(config.src)
   .pipe(svgmin())
   .pipe(iconfontCss({
     fontName: config.name,
     path: config.path,
     targetPath: config.targetPath,
     fontPath: config.fontPath,
   }))
   .pipe(iconfont({
     fontName: config.name, // required
     appendCodepoints: true, // recommended option
     normalize: true,
     fontHeight: 500,
     centerHorizontally: true
   }))
   .on('error', handleErrors)
   .pipe(gulp.dest(config.dest));
});