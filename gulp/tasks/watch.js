/*
 * Main Task: gulp
 * run gulp watch (scss, js, images, jade, etc)
 */
import gulp from 'gulp';
import browserSync from 'browser-sync';
import watch from 'gulp-watch';
import config from '../config';

gulp.task('default', ['watch']);

gulp.task('server', () => browserSync(config.browserSync));

gulp.task('watch', ['scripts'], function() {
    browserSync(config.browserSync);
    
    // watch scss
    watch(config.sass.watch, function(){
        gulp.start('sass', browserSync.reload);
    });

    // watch jade
    watch(config.jade.watch, function(){
        gulp.start('jade', browserSync.reload);
    });

    // watch images
    watch(config.images.src, function(){
        gulp.start('images', browserSync.reload);
    });

    // watch svgs
    watch(config.svgSymbols.src, function(){
        gulp.start('symbols', browserSync.reload);
    });

    // watch sprites
    watch(config.svg.src, function(){
        gulp.start('sprite', browserSync.reload);
    });
});