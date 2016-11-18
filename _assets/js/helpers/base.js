import Viewport from './viewport'
import { events } from './events'
// import $ from 'jquery'

const viewport = new Viewport()
viewport.watch()

/*
// Example
export class Thing extends Base {
	constructor(el) {
		super(el)
	}

	actions() {
		return [
			'click .menu__item : clickHandle'
		]
	}

	clickHandle(e) {
		e.preventDefault()
	}
}
*/


/**
 * Base class, all behaviours should extend from this class
 * @class
 */
export default class Base {
	constructor(el) {
		this.$tag = $(el)
		this.events = events
		this.viewport = viewport
		// bind methods
		this._addEvents = this._addEvents.bind(this)
		this._removeEvents = this._removeEvents.bind(this)
		this._setEvents = this._setEvents.bind(this)
		this._pages = this._pages.bind(this)
		this._destroy = this._destroy.bind(this)

		if(typeof this.actions === 'function') {
			this._actions = this.actions()
			if(Array.isArray(this._actions)) {
				this._addEvents()
			} else {
				log(`actions method in ${this.constructor.name} must return an array, see base.js for example`)
			}
		}

		this._pages()
	}

	_pages() {
		this.events.on('page:change', () => {
			this._removeEvents()
			this.destroy()
		})
	}

	_setEvents(evt) {
		this._actions.forEach((action) => {
			const input = action.split(':')
			const fn = input[1].trim(' ')
			const parts = input[0].split(' ')
			const event = parts.shift()
			const selector = parts.join(' ').trim(' ')

			if(typeof this[fn] === 'function' && typeof event === 'string' && typeof selector === 'string') {
				this.$tag[evt](event, selector, this[fn].bind(this))
			} else {
				log(`actions array in ${this.constructor.name} is incorrect, see base.js for example`)
			}
		})
	}

	_addEvents() {
		this._setEvents('on')
	}

	_removeEvents() {
		this._setEvents('off')
	}

	_destroy() {

	}

}
