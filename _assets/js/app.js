import './libs/polyfills'

import WebFont from 'webfontloader'
import { events } from './helpers/events'
import { views } from './views'
import 'lazysizes'
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
	// custom: {
  //   families: ['My Font', 'My Other Font:n4,i4,n7'],
  //   urls: ['/dist/css/fonts.css']
  // }
	// google: {
  //   families: ['Droid Sans', 'Droid Serif:bold']
  // }
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
})
