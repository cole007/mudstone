import Concert from 'concert'
import raf from 'raf'

// Nice...
// https://developer.mozilla.org/en-US/docs/Web/Events/resize
(function() {
	const throttle = function(type, name, obj = window) {
		let running = false
		const func = function() {
			if (running) {
				return
			}
			running = true
			raf(function() {
				// this is very nice... custom events... fancy
				obj.dispatchEvent(new CustomEvent(name))
				running = false
			})
		}
		obj.addEventListener(type, func)
	}

	/* init - you can init any event */
	throttle('resize', 'smartresize')
})()

export default class Viewport {
	constructor(opts = {}) {
		this.window = window
		this.current = this.query()
		const {
			width,
			height
		} = this.getDimensions()
		this.width = width
		this.height = height
		this.currentWidth = width
		this.delay = opts.delay || 300
			// the raf handler
		this._resize = this._resize.bind(this)
		this.getDimensions = this.getDimensions.bind(this)
			// bind this into methods
		this.watch = this.watch.bind(this)
		this.checkForBreakpointChange = this.checkForBreakpointChange.bind(this)
		this.destroy = this.destroy.bind(this)
			// merge Concert methods with this
		Object.assign(this, Concert)

		// for the at method
		this.do = this.on
	}

	/*
		@method query()
		return String
		body:before{ content }
	*/

	query() {
		return window.getComputedStyle(document.querySelector('body'), ':before').getPropertyValue('content').replace(/\"/g, '')
	}

	/*
		@method getDimensions()
		return Object
		{ width, height }
	*/
	getDimensions() {
		return {
			width: window.innerWidth || document.documentElement.clientWidth || document.getElementsByTagName('body')[0].clientWidth,
			height: window.innerHeight || document.documentElement.clientHeight || document.getElementsByTagName('body')[0].clientHeight
		}
	}

	/*
		@method watch()
		add resize event listener
		triggers 'resize' and 'change' events
		return null
	*/

	watch() {
		window.addEventListener('smartresize', this._resize)
		return this
	}

	at(query, pass, fail, watch = true) {
		let match = false
		const fn = () => {
			if(window.matchMedia(query).matches) {
				if(match !== 'pass') {
					pass()
					this.trigger(`pass:${query}`)
				}
				match = 'pass'
			} else {
				if(match !== 'fail') {
					this.trigger(`fail:${query}`)
					if(fail) fail()
				}
				match = 'fail'
			}
		}

		fn()
		watch && this.on('resize', fn)

		return this
	}

	when(query, pass, fail) {
		let failed = false
		const fn = () => {
			if(window.matchMedia(query).matches) {
				pass()
			} else {
				if(!failed) {
					this.trigger(`fail:${query}`)
					if(fail) fail()
				}
				failed = true
			}
		}
		this.on('resize', fn)

		return this
	}

	_resize() {
		const {
			width,
			height
		} = this.getDimensions()
		this.width = width
		this.height = height
		this.breakpoint = this.query()
		this.trigger('resize', {
			width,
			height,
			breakpoint: this.breakpoint
		})
		this.checkForBreakpointChange()
	}

	/*
		@method checkForBreakpointChange()
		Check for breakpoint changes
		return null
	*/

	checkForBreakpointChange() {
		if (this.current !== this.breakpoint) {
			const prev = this.current
			const current = this.breakpoint
			this.current = this.breakpoint
			this.trigger('change', this, current, prev)
		}
	}

	/*
		@method destroy()
		Cancel requestAnimationFrame
	*/

	destroy() {
		this.off('resize')
		this.off('change')
	}

	kill() {
		window.removeEventListener('resize', this.handle)
	}
}
