/*
 * sprites 
 * create sprites and sass variables
 */


var gulp            = require('gulp'),
    spritesmith     = require('gulp.spritesmith'),
    imagemin        = require('gulp-imagemin'),
    config          = require('../config').sprites,
    handleErrors    = require('../util/handleErrors'),
    browserSync     = require('browser-sync'),
    reload          = browserSync.reload;



gulp.task('sprite', function () {
    var spriteData = gulp.src(config.data)
    .pipe(spritesmith({
        imgName: config.imgName,
        cssName: config.cssName,
        imgPath: config.imgPath,
        cssVarMap: function (sprite) {
            sprite.name = sprite.name;
        }
    }))
    .on('error', handleErrors);
    spriteData.img
        .pipe(imagemin())
        .pipe(gulp.dest(config.spriteDataImg));
    spriteData.css
        .pipe(gulp.dest(config.spriteDataCss))
        .pipe(browserSync.reload({stream:true}));
});