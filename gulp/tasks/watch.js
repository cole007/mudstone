/*
 * watch 
 * default watch setup, sass, scripts, haml, html, sprites, images
 */

var gulp                  = require('gulp'),
    browserSync         = require('browser-sync'),
    watch                = require('gulp-watch'),
    reload                 = browserSync.reload,
    config                 = require('../config');

gulp.task('watch', ['scripts'], function() {
    browserSync(config.browserSync);
    
    // watch scss
    watch(config.sass.watch, function(){
        gulp.start('sass', reload);
    });

    // watch scripts
    // remove comments for non browserify build
    // watch(config.scripts.src, function(){
    //     gulp.start('scripts', reload);
    // });

    // watch jade
    watch(config.jade.watch, function(){
        gulp.start('jade', reload);
    });

    // watch images
    watch(config.images.src, function(){
        gulp.start('images', reload);
    });

    // watch svgs
    watch(config.svgStore.src, function(){
        gulp.start('build-svgstore', reload);
    });
});