/*
 * Main Task: gulp
 * run gulp watch (scss, js, images, jade, etc)
 */
import gulp from 'gulp';
import browserSync from 'browser-sync';
import watch from 'gulp-watch';
import config from '../config';

const $browserSync = config.browserSync;
const reload = browserSync.reload;

gulp.task('default', ['watch']);

gulp.task('server', () => browserSync($browserSync));

gulp.task('watch', ['scripts'], function() {
    browserSync($browserSync);
    
    
    // watch scss
    watch(config.sass.watch, function(){
        gulp.start('sass', reload);
    });

    // watch jade
    watch(config.jade.watch, function(){
        gulp.start('jade', reload);
    });

    // watch template
    watch(config.template.src, function(){
        gulp.start('build-template', reload);
    });

    // watch json
    watch(config.json.src, function(){
        gulp.start('build-json', reload);
    });

    // watch js libs
    watch(config.js.libs, function(){
        gulp.start('concat-libs', reload);
    });

    // watch images
    watch(config.images.src, function(){
        gulp.start('images', reload);
    });

    // watch svg symbols
    watch(config.svgSymbols.src, function(){
        gulp.start('symbols', reload);
    });

    // watch sprites
    watch(config.svg.src, function(){
        gulp.start('sprite', reload);
    });

    // watch svg assets 
    watch(config.svg.assets, function(){
        gulp.start('svg-assets', reload);
    });
});