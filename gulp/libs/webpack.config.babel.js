/* global  */
import webpack from 'webpack'
import path from 'path'
import ProgressBarPlugin from 'progress-bar-webpack-plugin'
import webpackValidator from 'webpack-validator'
import {
	getIfUtils,
	removeEmpty
} from 'webpack-config-utils'
import {
	pathToUrl
} from './utils'


const webpackConfig = env => {

	const context = path.resolve(process.env.PWD, PATH_CONFIG.src, PATH_CONFIG.js.src)
	const dest = path.resolve(process.env.PWD, PATH_CONFIG.dest, PATH_CONFIG.js.dest)
	const publicPath = pathToUrl(PATH_CONFIG.js.dest, '/')
	const filename = TASK_CONFIG.js.filename
	console.log(env)
	const {
		ifProd
	} = getIfUtils(env)

	const config = webpackValidator({
		entry: TASK_CONFIG.js.entries,
		cache: true,
		context: context,
		output: {
			path: path.normalize(dest),
			filename: `${filename}.js`,
			publicPath: publicPath
		},
		devtool: ifProd('eval', 'source-map'),
		resolve: {
			alias: {
				'vue$': 'vue/dist/vue.common.js'
			}
		},
		module: {
			loaders: [
				{
					test: /\.js?$/,
					loader: 'babel-loader',
					exclude: /node_modules/,
					query: {
						'presets': [
							['es2015', {
								modules: false
							}],
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


	if(env === 'development') {
		config.devtool = 'eval-cheap-module-source-map'
		config.output.pathinfo = true

		// Create new entries object with webpack-hot-middleware and react-hot-loader (if enabled)
		if(!TASK_CONFIG.js.hot || TASK_CONFIG.js.hot.enabled !== false) {
			for(let key in TASK_CONFIG.js.entries) {
				const entry = TASK_CONFIG.js.entries[key]
				// TODO: To work in < node 6, prepend process.env.PWD + node_modules/
				const entries = []
				let middleware = 'webpack-hot-middleware/client?'

				if(!TASK_CONFIG.js.hot || TASK_CONFIG.js.hot.reload !== false) {
					middleware += '&reload=true'
				}

				if(TASK_CONFIG.js.hot && TASK_CONFIG.js.hot.noInfo) {
					middleware += '&noInfo=true'
				}

				if(TASK_CONFIG.js.hot && TASK_CONFIG.js.hot.quiet) {
					middleware += '&quiet=true'
				}

				if(TASK_CONFIG.js.hot && TASK_CONFIG.js.hot.react) {
					entries.push('react-hot-loader/patch')
				}

				TASK_CONFIG.js.entries[key] = entries.concat(middleware).concat(entry)
			}


			config.plugins.push(new webpack.HotModuleReplacementPlugin())
		}
		// Addtional loaders for dev
		config.module.loaders = config.module.loaders.concat(TASK_CONFIG.js.developmentLoaders || [])
	}


	if(env === 'production') {
		config.plugins.push(
			new webpack.optimize.UglifyJsPlugin(),
			new webpack.NoEmitOnErrorsPlugin()
		)

		config.output.filename = `${filename}.${TASK_CONFIG.stamp}.js`
	}

	return config
}


export default webpackConfig