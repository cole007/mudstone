import './utils/polyfills'
import debug from 'debug'
import WebFont from 'webfontloader'

import * as behaviours from './behaviours'
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


import App from './core/loader'

new App(document, behaviours)
	.start()
	.watch()
