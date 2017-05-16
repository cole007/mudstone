import Listener from './listener'
import { Pjax } from 'barba.js'
import { closest } from '../utils/dom'

export default class extends Listener {
	constructor(context, behaviours) {
		super()
		this.barba = false
		this.context = context
		this.behaviours = behaviours
		this.history()
	}

	containerClass = `.${Pjax.Dom.containerClass}`

	history() {
		this.on('page:exit', this.destroyBehaviour)
		this.on('page:change', () => {
			this.start(document.querySelector(this.containerClass))
		})
	}

	getNodes(context = document) {
		return [...context.querySelectorAll('*[data-behaviour]')]
	}


	initializeBehaviour(nodes) {
		const { behaviours } = this
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

		this.scoped = [].concat.apply([], this.scoped)
		this.local = this.scoped.filter(({$el}) => closest($el, this.containerClass))
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
		this.initializeBehaviour(this.getNodes(context))
		this.scoped.forEach(behaviour => behaviour.initialize())		
		setTimeout(() => {
			this.mounted()
		})
		return this
	}


	watch(funcs) {
		this.barba = true
		funcs.forEach((funcs) => funcs.mount(this))
		Pjax.start()
		return this
	}

	beforeLeave() {
		const promises = this.scoped.filter(behaviour => {
			if(typeof behaviour.onLeave === 'function') {
				return new Promise(function(resolve) {
					behaviour.onLeave(resolve)
				})
			}
		})

		return Promise.all(promises)
	}

	unmount() {
		this.local = this.local.reduce((acc, curr) => {
			if(typeof curr.destory === 'function') {
				curr.destory()
			}
			return acc
		}, [])
	}
 
	mounted() {
		this.scoped.forEach(behaviour => behaviour.mounted())
	}
}