/*
 * sprites 
 * create sprites and sass variables
 */


var gulp            = require('gulp');
var spritesmith     = require('gulp.spritesmith');
var imagemin        = require('gulp-imagemin');
var config          = require('../config').sprites;
var handleErrors    = require('../util/handleErrors');
var browserSync     = require('browser-sync');
var reload          = browserSync.reload;



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