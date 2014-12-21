var gulp 					= require('gulp');
var psi 					= require('psi');
var config        = require('../config').psi;

gulp.task('insights', function (cb) {
	psi(config, cb);
});
