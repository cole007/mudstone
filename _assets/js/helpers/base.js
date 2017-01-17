import Viewport from './viewport'
import { events as listener } from './events'
// import $ from 'jquery'

const viewport = new Viewport()
viewport.watch()

/*
// Example
export class test extends Base {
	constructor(tag) {
		super(tag)
	}

	events = [
		'click button : clickHandle'
	]

	clickHandle(e) {
		log(e.currentTarget)
	}

}
*/


/**
 * Base class, all behaviours should extend from this class
 * @class
 */
//


export default class Base {
	constructor(tag = document, bindEvents = true, barba = true) {
		this.tag = tag
		this.$tag = $(tag)
		this.bindEvents = bindEvents
		this.barba = barba
		this.listen = listener
		this.viewport = viewport
		this._events = []
	}

	bindEventHandlers() {
		this._events = this.events.map((action) => {
			const input = action.split(':')
			const fn = input[1].trim(' ')
			const parts = input[0].split(' ')
			const event = parts.shift()
			const selector = parts.join(' ').trim(' ')
			return { event, selector, fn  }
		})
		return this
	}

	_addEvents() {
		this._events.forEach((instance) => {
			this.$tag.on(instance.event, instance.selector, this[instance.fn].bind(this))
		})
	}

	_removeEvents() {
		this._events.forEach((instance) => {
			this.$tag.off(instance.event, instance.selector)
		})
	}

	init() {
		if(this.events) {
			this.bindEventHandlers()
			log('bind')
		}

		if(this.barba && this.events) {

			this.listen.on('page:change', (...args) => {
				this._removeEvents()

				if(typeof this.pageTransiton === 'function') {
					this.pageTransiton(...args)
				}
			})
		}
		return this
	}

	render() {
		if(this.bindEvents && this.events) {
			this._addEvents()
		}
	}
}
