import gulp from 'gulp'
import webpack from 'webpack'
import {
	logger
} from '../libs/utils'
import webpackConfig from './webpack.config.babel'

export function webpackProductionTask(callback) {
	const env = global.production ? 'production' : 'development'
	const config = webpackConfig(env)
	webpack(config, function (err, stats) {
		logger(err, stats)
		callback()
	})
}


gulp.task('bundle-script', webpackProductionTask)