import raf from 'raf'

export default class Scroller {
	constructor(el) {
		this.tag = el
		this.lastPosition = -1
		this._loop = this._loop.bind(this)
		this.loop = this.loop.bind(this)
		this.destroy = this.destroy.bind(this)
		this.initialize = this.initialize.bind(this)
		this.state = false
	}

	_loop() {
		const loop = this._loop
		if(this.lastPosition === window.pageYOffset) {
			this.handle = raf(loop)
			return false
		} else {
			this.lastPosition = window.pageYOffset
			this.loop(window.pageYOffset)
			this.handle = raf(loop)
		}
	}

	loop() {}

	destroy() {
		this.state = false
		raf.cancel(this.handle)
	}

	initialize() {
		this.state = true
		this._loop()
		return this
	}
}