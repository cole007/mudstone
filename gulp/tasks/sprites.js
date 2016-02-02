/*
 * sprites 
 * create sprites and sass variables
 */


var gulp            = require('gulp'),
    spritesmith     = require('gulp.spritesmith'),
    imagemin        = require('gulp-imagemin'),
    config          = require('../config').sprites,
    handleErrors    = require('../util/handleErrors'),
    buffer          = require('vinyl-buffer'),
    merge           = require('merge-stream');


gulp.task('png-sprite', function () {
  // Generate our spritesheet
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

  // Pipe image stream through image optimizer and onto disk
  var imgStream = spriteData.img
    // DEV: We must buffer our stream into a Buffer for `imagemin`
    .pipe(buffer())
    .pipe(imagemin())
    .pipe(gulp.dest(config.spriteDataImg));

  // Pipe CSS stream through CSS optimizer and onto disk
  var cssStream = spriteData.css
    .pipe(gulp.dest(config.spriteDataCss));

  // Return a merged stream to handle both `end` events
  return merge(imgStream, cssStream);
});