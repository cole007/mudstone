import './libs/polyfills'
// attached jQuery to the window for global access
import jQuery from 'jquery'
window.$ = jQuery
import WebFont from 'webfontloader'
import {
	events
} from './helpers/events'
import {
	views
} from './views'
import lazysizes from 'lazysizes'
import debug from 'debug'

// logs enabled during development
window.log = debug('app:log')
if (ENV === 'development') {
	debug.enable('app:log')
} else {
	debug.disable('app:log')
}

log('Logging is enabled!, ENV')

WebFont.load({
	typekit: {
		id: 'cdu5srl'
	},
	active() {
		events.trigger('fonts:loaded')
	},
	inactive() {
		events.trigger('fonts:loaded')
	}
})

$(function() {
	views()
	lazysizes.init()
})
