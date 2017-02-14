import gulp from 'gulp'
import webpack from 'webpack'
import {
	logger
} from '../libs/utils'
import webpackConfig from '../libs/webpack.config.babel'

export function webpackProductionTask(callback) {
	const config = webpackConfig('production')
	webpack(config, function (err, stats) {
		logger(err, stats)
		callback()
	})
}


gulp.task('scripts:production', webpackProductionTask)