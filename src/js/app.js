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

import Loader from './core/loader'
import RouteManager from './core/router'
import routes from './views/routes'

document.addEventListener('DOMContentLoaded', function () {
	new Loader(document, behaviours)
		.start()
		.watch([
			new RouteManager(routes)
		])
		.setup([
			test
		])
		.globals()
})