var gulp             			= require('gulp');
var svgo           				= require('gulp-svgo');
var gutil 						= require('gulp-util');
var svg2png						= require('gulp-svg2png');
var svgSprite        			= require('gulp-svg-sprite');
var config						= require('../config');
var handleErrors 				= require('../util/handleErrors');
var browserSync 				= require('browser-sync');
var svgstore 					= require('gulp-svgstore');
var inject 						= require('gulp-inject');
var runSequence 				= require('run-sequence').use(gulp);

gulp.task('svgSprite', function () {

    return gulp.src(config.svg.src)
        .pipe(svgo())
        .pipe(svgSprite({
            "mode": {
                "css": {
                    "spacing": {
                        "padding": 5
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

gulp.task('pngSprite', ['svgSprite'], function() {
	return gulp.src(config.svg.src)
		.pipe(svg2png())
		.on('error', handleErrors)
		.pipe(gulp.dest(config.svg.dest + '/sprites'));
});

// svg2png, svg sprite, png sprite
//gulp.task('sprites', ['pngSprite', 'svgSprite', 'sprite']);

gulp.task('sprites', function(cb) {
	runSequence('svgSprite',['pngSprite'], 'sprite', cb)
});



gulp.task('svgstore', function() {
    var svgs = gulp
        .src(config.svgStore.src)
        .pipe(svgo())
        .pipe(svgstore({ inlineSvg: true }));

    function fileContents (filePath, file) {
        return file.contents.toString();
    }

    return gulp
        .src(config.svgStore.file)
        .pipe(inject(svgs, { transform: fileContents }))
		.on('error', handleErrors)
        .pipe(gulp.dest(config.svgStore.dest));
});