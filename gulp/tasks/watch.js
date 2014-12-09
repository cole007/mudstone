/* Notes:
   - gulp/tasks/browserify.js handles js recompiling with watchify
   - gulp/tasks/browserSync.js watches and reloads compiled files
*/

var gulp  = require('gulp');
var config = require('../config');
var runSequence = require('run-sequence');
var browserSync = require('browser-sync');
var reload = browserSync.reload;



gulp.task('watch', function() {
	gulp.watch(config.sass.watch,   ['sass']);
	gulp.watch(config.scripts.src, ['scripts']);
});
