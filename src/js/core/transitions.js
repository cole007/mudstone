import Listener from '../core/listener'
import {
	BaseTransition,
	Pjax
} from 'barba.js'



const transition = BaseTransition.extend({
	start: function () {
		this.loader.beforeLeave().then(() => {
			this.next()
		})
	},
	next() {
		log('next')
		this.newContainerLoading.then(this.finish.bind(this))
	},

	finish: function () {
		log('finish')
		this.done()
	}
})

export default class TransitionManager {
	constructor() {
		this.listener = new Listener()
	}

	mount(loader) {
		const _this = this
		Pjax.getTransition = function () {
			return _this.transition(this.History.prevStatus().namespace, this.History.currentStatus().namespace, loader)
		}
	}

	transition(from, to, loader) {
		return transition.extend({
			from,
			to,
			loader
		})
	}
}