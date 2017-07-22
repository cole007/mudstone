import './utils/polyfills'
import debug from 'debug'
import * as behaviours from './behaviours'
import WebFont from 'webfontloader'
// logs enabled during development
window.log = debug('app:log')
if(process.env.NODE_ENV === 'development') {
	debug.enable('app:log')
} else {
	debug.disable('app:log')
}
log(`Logging is enabled!, NODE_ENV: ${process.env.NODE_ENV}`)


if(module.hot) {
	module.hot.accept()
}

WebFont.load({
	google: {
		families: ['Lato:300,400,700', 'Alfa Slab One']
	},
})


import Loader from './core/loader'

import pathToRegexp from 'path-to-regexp'

window.pathToRegexp = pathToRegexp

new Loader(document, behaviours)
	.start()
	.watch()
	// .setup([
	// 	test
	// ])
	// .globals()
