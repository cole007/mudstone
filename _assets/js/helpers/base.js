import Concert from 'concert'
import Viewport from './viewport'
import { events } from './events'
// import $ from 'jquery'

const viewport = new Viewport()
viewport.watch()
/**
 * Base class, all behaviours should extend from this class
 * @class
 */
export default class Base {
	constructor(el) {
		this.$tag = $(el)
		// instance events
		Object.assign(this, Concert)
		// global events
		this.events = events
		this.viewport = viewport
		// bind methods
		this._addEvents = this._addEvents.bind(this)
		this._removeEvents = this._removeEvents.bind(this)
		this._setEvents = this._setEvents.bind(this)
		this._pages = this._pages.bind(this)
		this.destroy = this.destroy.bind(this)

		if(typeof this.actions === 'function') {
			this._actions = this.actions()
			this._addEvents()
		}
	}

	_pages() {
		this.events.on('page:change', () => {
			this._removeEvents()
			this.destroy()
		})
	}

	_setEvents(evt) {
		const _this = this

		this._actions.forEach((action) => {
			const input = action.split(':')
			const fn = input[1].trim(' ')
			const parts = input[0].split(' ')
			const event = parts.shift()
			const selector = parts.join(' ').trim(' ')
			_this.$tag[evt](event, selector, _this[fn].bind(_this))
		})
	}

	_addEvents() {
		this._setEvents('on')
	}

	_removeEvents() {
		this._setEvents('off')
	}

	destroy() {

	}

}

/*
export class Thing extends Base {
	constructor(el) {
		super(el)
	}

	actions() {
		return [
			'click .menu__item > a : clickHandle',
			'mouseover .logo : clickHandle'
		]
	}

	clickHandle(e) {
		e.preventDefault()
	}
}
*/
