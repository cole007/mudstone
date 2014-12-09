var gulp         = require('gulp');
var spritesmith  = require('gulp.spritesmith');
var config       = require('../config').sprites;



gulp.task('sprites', function () {
    var spriteData = gulp.src(config.data).pipe(spritesmith({
        imgName: config.imgName,
        cssName: config.cssName,
        imgPath: config.imgPath,
        cssVarMap: function (sprite) {
            sprite.name = sprite.name;
        }
    }));
    spriteData.img.pipe(gulp.dest(config.spriteDataImg));
    spriteData.css.pipe(gulp.dest(config.spriteDataCss));
});