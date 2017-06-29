import debug from 'debug'
import * as behaviours from './behaviours'
// logs enabled during development
window.log = debug('app:log')
if(process.env.NODE_ENV === 'development') {
	debug.enable('app:log')
} else {
	debug.disable('app:log')
}
log(`Logging is enabled!, NODE_ENV: ${process.env.NODE_ENV}`)

function test() {
	log('run on every page load')
}

if(module.hot) {
	module.hot.accept()
}


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
