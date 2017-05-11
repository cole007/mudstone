import Delegate from 'dom-delegate'
import Concert from 'concert'
import uniqueId from 'lodash.uniqueid'
import isObject from 'lodash.isobject'


/*
	Global Event Bus
	Returns a single instance
*/
let _listenerInstance = null
export class Listener extends Concert {
	constructor() {
		super()
		if(!_listenerInstance){
			_listenerInstance = this
		}
		return _listenerInstance
	}
}

/*
	A global state object thinger
	Returns a single instance
*/
let _storeInstance = null
export class Store {
	constructor() {
		if(!_storeInstance){
			_storeInstance = this
		}
		this._cid = uniqueId('root::')
		return _storeInstance
	}

	_state = {}

	set state(newState) {
		const oldState = this._state
		const nextState = this._state = {...oldState, ...newState}
		this._state = nextState
	}

	get state() {
		return this._state
	}

	reset(name) {
		this._state[name] = {}
	}

	destroy() {
		_listenerInstance = null
		this._state = {}
	}
}

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
		log('hello')
		this.delegateEvents()
		return this
	}

	destroy() {
		this.unDelegateEvents()
		return this
	}

	refresh() {
		this.unDelegateEvents()
		this.delegateEvents()
		return this
	}

	mounted() {}

	render() {}
}

export class Loader extends Listener {
	constructor(context, behaviours) {
		super()
		this.context = context
		this.behaviours = behaviours
		this.nodes = []
		this.scoped = []
		this.history()
	}

	history() {
		this.on('page:exit', this.destroyBehaviour)
		this.on('page:change', this.start)
	}

	getNodes(context = document) {
		this.nodes = [...context.querySelectorAll('*[data-behaviour]')]
		return this
	}

	initializeBehaviour() {
		const { nodes, behaviours } = this
		this.scoped = nodes.map((node) => {
			const behaviours = node.getAttribute('data-behaviour').split(' ')
			return {
				node,
				behaviours
			}
		})
		.map((obj) => {
			return obj.behaviours.map((behaviourName) => {
				return new behaviours[behaviourName](obj.node)
			})
		})
		return this
	}

	destroyBehaviour() {
		this.behaviours.forEach(behaviour => {
			if(typeof behaviour.destory === 'function') {
				behaviour.destory()
			}
		})
	}

	start(context = this.context) {
		this.getNodes(context)
		this.initializeBehaviour()
		this.scoped.forEach(node => {
			node.forEach(behaviour => {
				behaviour.initialize()
			})
		})
		
		setTimeout(() => {
			this.mounted()
		})
	}

	beforeLeave() {
		const promises = []
		this.scoped.forEach(node => {
			node.forEach(behaviour => {
				if(typeof behaviour.onLeave === 'function') {
					promises.push(behaviour)
				}
			})
		})
		return new Promise.all(promises)
	}
 
	mounted() {
		this.scoped.forEach(node => {
			node.forEach(behaviour => {
				behaviour.mounted()
			})
		})
	}
}