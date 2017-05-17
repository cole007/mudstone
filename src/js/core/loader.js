import Listener from './listener'
import { Pjax } from 'barba.js'
import { closest } from '../utils/dom'
import * as views from '../views'

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

	get container() {
		return document.querySelector(`.${Pjax.Dom.containerClass}`)
	}

	gatherBehaviours(nodes) {
		const { behaviours } = this

		return [].concat.apply([], nodes.map((node) => {
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
		}))
	}

	start(context = this.context) {
		this.all = this.gatherBehaviours(this.getNodes(context))
		this.all.forEach(behaviour => behaviour.initialize())		
		this.local = this.all.filter(({$el}) => closest($el, this.containerClass))
		setTimeout(() => {
			this.created()
		})
		return this
	}

	update(context) {
		this.local = this.gatherBehaviours(this.getNodes(context))
		this.local.forEach(behaviour => behaviour.initialize())
		setTimeout(() => {
			this.updated()
		})
		return this
	}

	watch(funcs) {
		this.barba = true
		funcs.forEach((func) => func.mount(this))
		for(let key in views) {
			views[key].init()
		}
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
		this.gatherBehaviours(this.getNodes(this.container))
			.filter(behaviour => typeof behaviour.onBeforeEnter === 'function')
			.map((behaviour) => behaviour.onBeforeEnter(to, from))
		return this
	}

	afterEnter(to, from) {
		this.gatherBehaviours(this.getNodes(this.container))
			.filter(behaviour => typeof behaviour.onAfterEnter === 'function')
			.map((behaviour) => behaviour.onAfterEnter(to, from))
		return this
	}

	beforeLeave(from, to) {
		const promises = this.local.filter(behaviour => typeof behaviour.onBeforeLeave === 'function')
																.map((behaviour) => {
																	return new Promise(behaviour.onBeforeLeave.bind(behaviour, from, to))
																})
		return Promise.all(promises)
	}

	afterLeave(to, from) {
		const promises = this.local.filter(behaviour => typeof behaviour.onAfterLeave === 'function')
																.map((behaviour) => {
																	return new Promise(behaviour.onAfterLeave.bind(behaviour, from, to))
																})

		return Promise.all(promises)
	}

	unmount() {
		this.local = this.local.reduce((acc, curr) => {
			curr.destroy === 'function' && curr.destroy()
			return acc
		}, [])
		return this
	}

	created() {
		this.all.forEach(behaviour => behaviour.mounted())
	}
 
	updated() {
		this.local.forEach(behaviour => behaviour.mounted())
		return this
	}
}