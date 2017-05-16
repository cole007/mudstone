import Listener from './listener'
import { Pjax } from 'barba.js'
import { closest } from '../utils/dom'

export default class extends Listener {
	constructor(context, behaviours) {
		super()
		this.barba = false
		this.context = context
		this.behaviours = behaviours
	}

	containerClass = `.${Pjax.Dom.containerClass}`

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

	start(context = this.context, onLoad = true) {
		this.initializeBehaviour(this.getNodes(context))
		const array = onLoad ? this.scoped : this.local
		array.forEach(behaviour => behaviour.initialize())		
		setTimeout(() => {
			this.mounted()
		})
		return this
	}

	watch(funcs) {
		this.barba = true
		funcs.forEach((func) => func.mount(this))
		Pjax.start()
		return this
	}

	setup(funcs) {
		this.globalFuncs = funcs
		return this
	}

	globals() {
		this.globalFuncs.forEach((func) => func())
		return this
	}

	beforeEnter(to, from) {
		return this.local.filter(behaviour => typeof behaviour.onEnter === 'function')
											.map((behaviour) => behaviour.onEnter.bind(behaviour, to, from))
	}

	beforeLeave() {
		const promises = this.local.filter(behaviour => typeof behaviour.onLeave === 'function')
																.map((behaviour) => {
																	return new Promise(behaviour.onLeave)
																})
		return Promise.all(promises)
	}

	unmount() {
		this.local = this.local.reduce((acc, curr) => {
			log('unmount', curr)
			if(typeof curr.destroy === 'function') {
				curr.destroy()
			}
			return acc
		}, [])

		return this
	}
 
	mounted() {
		this.scoped.forEach(behaviour => behaviour.mounted())

		return this
	}
}