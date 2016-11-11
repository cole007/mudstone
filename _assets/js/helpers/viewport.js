import Concert from 'concert'
import debounce from 'lodash.debounce'

export default class Viewport {
	constructor(opts = {}) {
		this.window = window
		this.current = this.query()
		const { width, height } = this.getDimensions()
		this.width = width
		this.height = height
		this.currentWidth = width
		this.delay = opts.delay || 300
		// the raf handler
		this._resize = this._resize.bind(this)
		this.getDimensions = this.getDimensions.bind(this)
		this.handle = debounce(this._resize, this.delay)
		// bind this into methods
		this.watch = this.watch.bind(this)
		this.checkForBreakpointChange = this.checkForBreakpointChange.bind(this)
		this.destroy = this.destroy.bind(this)
		// merge Concert methods with this
		Object.assign(this, Concert)
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
			width: window.innerWidth ||  document.documentElement.clientWidth || document.getElementsByTagName('body')[0].clientWidth,
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
		window.addEventListener('resize', this.handle)
		return this
	}

	_resize() {
		const { width, height } = this.getDimensions()
		this.width = width
		this.height = height
		this.breakpoint = this.query()
		this.trigger('resize', {width, height, breakpoint: this.breakpoint})
		this.checkForBreakpointChange()
	}

	/*
		@method checkForBreakpointChange()
		Check for breakpoint changes
		return null
	*/

	checkForBreakpointChange() {
		if(this.current !== this.breakpoint) {
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