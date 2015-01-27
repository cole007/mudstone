var gulp              = require('gulp');
var svgo           		= require('gulp-svgo');
var gutil 						= require('gulp-util');
var svg2png						= require('gulp-svg2png');
var svgSprites        = require('gulp-svg-sprites');
var config						= require('../config').svg;
var handleErrors 			= require('../util/handleErrors');
var browserSync 			= require('browser-sync');

gulp.task('svgSprite', function () {

	return gulp.src(config.src)
		.pipe(svgo())
		.pipe(svgSprites({
			cssFile: config.css,
			preview: false,
			layout: 'diagonal',
			padding: 0,
			svg: {
				sprite: config.sprite
			},
			templates: {
				css: require("fs").readFileSync(config.template, "utf-8")
			}
		}))
		.on('error', handleErrors)
		.pipe(gulp.dest(config.dest));

});

gulp.task('pngSprite', ['svgSprite'], function() {
	return gulp.src(config.src)
		.pipe(svg2png())
		.on('error', handleErrors)
		.pipe(gulp.dest(config.dest + 'images/sprites'));
});

// svg2png, svg sprite, png sprite
gulp.task('sprites', ['pngSprite', 'svgSprite', 'sprite']);


