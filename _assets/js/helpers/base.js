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

class Model {
	constructor() {
		this._model = []
	}

	setState(obj) {
		if(!obj.name || !obj.data) {
			log('setState require an object with a name and data property')
			return
		}
		const o = this._model[obj.name]
		this._model[obj.name] = {...o, ...obj}
	}

	getState(name) {
		return this._model[name].data
	}
}

const model = new Model()


export default class Base {
	constructor(tag = document, opts = { bindEvents: true, barba: false }) {
		this.tag = tag
		this.$tag = $(tag)
		this.bindEvents = opts.bindEvents
		this.barba = opts.barba
		this.listen = listener
		this.viewport = viewport
		this.__events = []
		this._addEvents = this._addEvents.bind(this)
		this._removeEvents = this._removeEvents.bind(this)

		this.model = model
	}


	_bindEventHandlers() {
		this.__events = this.events.map((action) => {
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
		this.__events.forEach((instance) => {
			this.$tag.on(instance.event, instance.selector, this[instance.fn].bind(this))
		})
		return this
	}

	_removeEvent(event, selector) {
		this.$tag.off(event, selector)
		return this
	}

	_removeEvents() {
		this.__events.forEach((instance) => {
			this.$tag.off(instance.event, instance.selector)
		})
		return this
	}

	_init() {

		if(this.events) {
			this._bindEventHandlers()
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

		return this
	}
}
