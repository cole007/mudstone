import Concert from 'concert'

/*

	const viewport = new Viewport()

	// these two properties will always return the correct dimensions
	viewport.width / viewport.height

	// all the resize events have custom detail property with the current width/height

	Normal resize event
	viewport.on('resize', (e) => log(e.detail.width))

	viewport.at(mediaquery, success, fail, watch = true)
	mediaquery: '(max-width: 46.25em)'
	success: a function that is called once the mediaquery is active,
					this function is only called once per change
	fail: as above, but for the opposite
	watch: where to watch for window resize events

	viewport.when(mediaquery, success, fail)
	mediaquery: as above
	success: a function that is called once the mediaquery is active (throttled)
	fail: same as the at fail function

})


*/


export default class Viewport extends Concert {
	constructor(watch = false) {
		super()
		this.dispatch = this.dispatch.bind(this)
			// bind this into methods
		this.watch = this.watch.bind(this)
		// this.checkForBreakpointChange = this.checkForBreakpointChange.bind(this)
		this.destroy = this.destroy.bind(this)
			// merge Concert methods with this

		watch && this.watch()
	}

	get query() {
		return window.getComputedStyle(document.querySelector('body'), ':before').getPropertyValue('content').replace(/\"/g, '')
	}

	get width() {
		return window.innerWidth || document.documentElement.clientWidth || document.getElementsByTagName('body')[0].clientWidth
	}

	get height() {
		return window.innerHeight || document.documentElement.clientHeight || document.getElementsByTagName('body')[0].clientHeight
	}

	watch() {
		this.previous = this.query
		window.addEventListener('smartresize', this.dispatch)
		return this
	}

	dispatch(e) {
		const { detail } = e
		this.trigger('resize', detail)
		if(this.current !== this.query) {
			this.trigger('change', {
				detail,
				previous: this.previous,
				current: this.query
			})
			this.previous = this.query
		}
	}

	at(query, pass, fail, watch = true) {
		let match = false
		const fn = (detail = {}) => {
			if(window.matchMedia(query).matches) {
				if(match !== 'pass') {
					if(typeof pass === 'function') pass(detail)
					this.trigger(`pass:at:${query}`, detail)
				}
				match = 'pass'
			} else {
				if(match !== 'fail') {
					this.trigger(`fail:at:${query}`, detail)
					if(typeof fail === 'function') fail(detail)
				}
				match = 'fail'
			}
		}

		fn({
			width: this.width,
			height: this.height
		})
		watch && this.on('resize', fn)

		return this
	}

	when(query, pass, fail) {
		let failed = false
		const fn = (detail) => {
			if(window.matchMedia(query).matches) {
				if(typeof pass === 'function') pass(detail)
				this.trigger(`pass:when:${query}`, detail)
				failed = false
			} else {
				if(!failed) {
					this.trigger(`fail:when:${query}`, detail)
					if(typeof fail === 'function') fail(detail)
				}
				failed = true
			}
		}
		this.on('resize', fn)

		return this
	}

	destroy() {
		this.off('resize')
		this.off('change')
	}

	kill() {
		this.destroy()
		window.removeEventListener('smartresize', this.handle)
	}
}
