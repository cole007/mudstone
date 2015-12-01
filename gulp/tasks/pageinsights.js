/*
 * pageinsights 
 * run pageinsights on urls (see config)
 */


var gulp 					= require('gulp'),
	psi 					= require('psi'),
	config        			= require('../config').psi;

gulp.task('insights', function (cb) {
	psi(config, cb);
});
