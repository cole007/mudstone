/*
 * Critical path
 * returns "above the fold css"
 * builds inlined html file
 */


var gulp            = require('gulp');
var critical        = require('critical');
var rename          = require('gulp-rename');
var config          = require('../config');


// Copy our site styles to a site.css file
// for async loading later
gulp.task('copystyles', function () {
    return gulp.src(['./_build/css/dist/style.css'])
        .pipe(rename({
            basename: "site"
        }))
        .pipe(gulp.dest('./_build/css/dist/'));
});



gulp.task('critical', ['copystyles'], function (cb) {
    critical.generateInline({
        base: './_build/',
        src: 'index.html',
        width: 1800,
        height: 600,
        minify: true
    }, function(err, output){

        critical.inline({
            base: './_build/',
            src: '/index.html',
            dest: '/index-critical.html',
            minify: true
        });       

    });
});