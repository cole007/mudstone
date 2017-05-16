import Listener from '../core/listener'
import { BaseTransition, Pjax } from 'barba.js'

const HideShowTransition = BaseTransition.extend({
	start: function () {
		log('start')
		this.next()
	},


	finish: function () {
		log('finish')
		this.done()
	}
})

const x = HideShowTransition.extend({
	start: function() {
		this.loader.beforeLeave().then(() => {
			log('done')
			this.next()
		})
	},

	next() {
		log('next')
		this.newContainerLoading.then(this.finish.bind(this))
	}
})

export default class TransitionManager {
	constructor() {
		this.listener = new Listener()
		log('TransitionManager')

	}

	initialize() {
		log('initialize')
	}

	mount(loader) {
		const _this = this
		Pjax.getTransition = function() {
			//log('getTransitio', this)
			return _this.transition(this.History.prevStatus().namespace, this.History.currentStatus().namespace, loader)
		}
	}

	transition(from, to, loader) {
		return x.extend({loader})
	}
}