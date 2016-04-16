/*
 * Main Task: gulp sprite
 * Converts svgs into a png/svg sprite with scss variables
 */
import gulp from 'gulp';
import svgmin from 'gulp-svgmin';
import svg2png from 'gulp-svg2png';
import svgSprite from 'gulp-svg-sprite';
import handleErrors from '../util/handleErrors';
import runSequence from 'run-sequence';
import config from '../config';
import spritesmith from 'gulp.spritesmith';
import imagemin from 'gulp-imagemin';
import buffer from 'vinyl-buffer';
import merge from 'merge-stream';


gulp.task('svgSprite', () => {
    return gulp.src(config.svg.src)
        .pipe(svgmin())
        .pipe(svgSprite({
            "mode": {
                "css": {
                    "spacing": {
                        "padding": 0
                    },
                    "dest": "./",
                    "layout": "diagonal",
                    "sprite": config.svg.sprite,
                    "bust": false,
                    "render": {
                        "scss": {
                            "dest": config.svg.css,
                            "template": config.svg.template
                        }
                    }
                }
            }
        }))
        .pipe(gulp.dest(config.svg.dest));
});

gulp.task('pngSprite', ['svgSprite'], () => {
    return gulp.src(config.svg.src)
        .pipe(svg2png())
        .on('error', handleErrors)
        .pipe(gulp.dest(config.svg.pngs));
});


gulp.task('png-sprite', () => {
  // Generate our spritesheet
    const spriteData = gulp.src(config.sprites.data)
    .pipe(spritesmith({
        imgName: config.sprites.imgName,
        cssName: config.sprites.cssName,
        imgPath: config.sprites.imgPath,
        cssVarMap: (sprite) => {
            sprite.name = sprite.name;
        }
    }))
    .on('error', handleErrors);

  // Pipe image stream through image optimizer and onto disk
  const imgStream = spriteData.img
    // DEV: We must buffer our stream into a Buffer for `imagemin`
    .pipe(buffer())
    .pipe(imagemin())
    .pipe(gulp.dest(config.sprites.spriteDataImg));

  // Pipe CSS stream through CSS optimizer and onto disk
  const cssStream = spriteData.css
    .pipe(gulp.dest(config.sprites.spriteDataCss));

  // Return a merged stream to handle both `end` events
  return merge(imgStream, cssStream);
});

// svg2png, svg sprite, png sprite
//gulp.task('sprites', ['pngSprite', 'svgSprite', 'sprite']);

gulp.task('sprite', (cb) => {
    const run = runSequence.use(gulp);
    run('svgSprite',['pngSprite'], 'png-sprite', cb)
});


