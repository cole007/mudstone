import Listener from '../core/listener'
import { BaseTransition, Pjax } from 'barba.js'


const transition = BaseTransition.extend({
	start: function () {
		const { from, to, loader } = this
		loader.beforeLeave(from, to).then(() => this.next())
	},

	next() {
		this.newContainerLoading.then(() => this.done())
	},

	done: function () {
		const { from, to, loader } = this
		this.oldContainer.parentNode.removeChild(this.oldContainer)
		loader.afterLeave(from, to).then(() => {
			this.newContainer.style.visibility = 'visible'
			this.deferred.resolve()
		})
	},
})

export default class TransitionManager {
	constructor() {
		this.listener = new Listener()
	}

	mount(loader) {
		Pjax.getTransition = function () {
			const { from, to } = this.History.routes
			return transition.extend({
				from,
				to,
				loader
			})
		}
	}
}