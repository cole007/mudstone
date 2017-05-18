import Delegate from 'dom-delegate'
import Concert from 'concert'
import uniqueId from 'lodash.uniqueid'
import isObject from 'lodash.isobject'
import Listener from './listener'
import Store from './store'
/*
	Base Class, 
*/
export default class Base extends Concert {

	constructor(el = document, name, state = {}) {
		super()
		this.store = new Store()
		this.listener = new Listener()
		this.$delegate = new Delegate(el)
		this.$el = el
		this.delegate = this.delegate.bind(this)
		this.undelegate = this.undelegate.bind(this)
		this.initialize = this.initialize.bind(this)
		this.delegateEvents = this.delegateEvents.bind(this)
		this.unDelegateEvents = this.unDelegateEvents.bind(this)
		this.cid = name || uniqueId(`${this.constructor.name}:`)
		this.setState(state, this.cid, false)
		return this
	}

	setState(obj, name = this.cid, trigger = true) {
		if(!isObject(obj)) {
			throw new Error('setState expects an object')
		}
		const { state } = this.store
		const prev = state[name]
		const next = {...state[name], ...obj}
		trigger && this.trigger('state:update', ({ prev }))
		this.store.state = {[name]: next}
		trigger && this.trigger('state:changed', ({ prev, next }))
		
		return this
	}
	
	getState(name = this.cid) {
		return this.store.state[name]
	}

	get state() {
		return this.store.state[this.cid]
	}
	
	delegateEvents() {
		const events = this.events
		if(!events) return this
		for(let key in events) {
			const eventKey = events[key]
			const method = typeof eventKey === 'function' ? eventKey : this[eventKey]
			const parts = key.split(' ')
			this.delegate(parts[0], parts[1], method.bind(this))
		}
		return this
	}

	unDelegateEvents() {
		const events = this.events
		if(!events) return this
		for(let key in events) {
			const eventKey = events[key]
			const method = typeof eventKey === 'function' ? eventKey : this[eventKey]
			const parts = key.split(' ')
			this.undelegate(parts[0], parts[1], method.bind(this))
		}
		return this
	}
	
	delegate(eventName, selector, listener) {
		this.$delegate.on(eventName, selector, listener)
		return this
	}

	undelegate(eventName, selector, listener) {
		this.$delegate.off(eventName, selector, this[listener])
		return this
	}
	
	initialize() {
		this.delegateEvents()
		return this
	}

	destroy() {
		this.unmount()
		this.unDelegateEvents()
		return this
	}

	refresh() {
		this.unDelegateEvents()
		this.delegateEvents()
		return this
	}

	mounted() {}

	unmount() {}

	render() {}
}