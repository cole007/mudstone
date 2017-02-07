/* global  __dirname */
import webpack from 'webpack'
import path from 'path'
import ProgressBarPlugin from 'progress-bar-webpack-plugin'
import webpackValidator from 'webpack-validator'
import { getIfUtils, removeEmpty } from 'webpack-config-utils'


const webpackConfig = env => {
	const { ifProd } = getIfUtils(env)


	const config = webpackValidator({
		context: __dirname,
		entry: `${__dirname}/_assets/js/app.js`,
		output: {
			path: path.join(__dirname, '/tmp/public/dist/js/'),
			publicPath: '/tmp/public/',
			filename: 'app.js'
		},
		devtool: ifProd('eval', 'source-map'),
		module: {
			loaders: [
				{
					test: /\.js?$/,
					loader: 'babel-loader',
					exclude: /node_modules/,
					query: {
						'presets': [
							['es2015', {modules: false}],
							'stage-0',
							'react'
						],
						'plugins': [
							'transform-runtime',
							'transform-object-rest-spread',
							'transform-es2015-parameters',
							'transform-es2015-destructuring',
							'transform-class-properties',
							'syntax-object-rest-spread'
						],
						babelrc: false,
						cacheDirectory: false
					}
				},
				{
					test: /\.js$/,
					loader: 'eslint-loader',
					exclude: /node_modules/
				}
			]
		},
		plugins: removeEmpty([
			new ProgressBarPlugin(),
			new webpack.DefinePlugin({
				'process.env': {
					NODE_ENV: ifProd('"production"', '"development"')
				}
			})
		])
	})

	if(env === 'production') {
		config.plugins.push(
			new webpack.optimize.UglifyJsPlugin()
		)
	}

	return config
}


export default webpackConfig
