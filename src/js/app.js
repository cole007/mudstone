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

import Loader from './core/loader'
import TransitionsManager from './views/TransitionsManager'
import DispatchManager from './views/DispatchManager'



document.addEventListener('DOMContentLoaded', function () {
	new Loader(document, behaviours)
		.start()
		.watch([
			new TransitionsManager(),
			new DispatchManager()
		])
})