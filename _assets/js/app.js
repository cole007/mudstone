import debug from 'debug'

// logs enabled during development
window.log = debug('app:log')
if(process.env.NODE_ENV === 'development') {
	debug.enable('app:log')
} else {
	debug.disable('app:log')
}

log(`Logging is enabled!, NODE_ENV: ${process.env.NODE_ENV}`)


import Base from './helpers/base'

class Root extends Base {
	constructor(document) {
		super(document, 'root')
	}

	events = {
		'click .site-logo': 'pubes'
	}
	
	pubes(e) {
		e.preventDefault()
		log('logo', this)
	}
}

class Spleen extends Base {
	constructor(document) {
		super(document, 'spleen')
	}

	events = {
		'click .menu-btn':  function(e) {
			e.preventDefault()
			log('menu', this)
		}
	}
}


document.addEventListener('DOMContentLoaded', function () {
	const r = new Root().initialize()
	const x = new Spleen().initialize()

	r.listener.on('thing', () => {
		log('thing happened')
	})

	setTimeout(() => {

		r.on('state:changed', ({prev, next}) => {
			log(prev, next)
		})

		x.setState({a: 'a'})
		r.setState({a: 'b'})
		x.setState({a: 'a'}, 'root')

		x.listener.trigger('thing')
		x.trigger('thing')
		
		r.destroy()
		x.destroy()
	}, 1000)
})