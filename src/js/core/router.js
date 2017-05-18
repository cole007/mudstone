import Listener from '../core/listener'
import { Dispatcher, Pjax, HistoryManager, BaseTransition } from 'barba.js'
import pathToRegexp from 'path-to-regexp'

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

export default class RouteManager {
	constructor(routes) {
		this.routes = routes
		this.listener = new Listener()
		this.clicked = false
		this.container = document.querySelector(`.${Pjax.Dom.containerClass}`)
	}

	currentRoute() {
		return {
			path: window.location.pathname,
			namespace: Pjax.Dom.getNamespace(this.container)
		}
	}

	getRoute(href) {
		const route = this.routes.find(({path}) => path === href)
		return route ? route : {path: '*', namespace: null}
	}

	match(pathname) {
		const tokens = pathToRegexp(pathname)

		HistoryManager.routes = {
			from: this.currentRoute(),
			to: this.getRoute(pathname)
		}
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

		Dispatcher.on('linkClicked', (HTMLElement) => {
			this.clicked = true
			const { pathname } = HTMLElement
			const path = pathname.split('.').shift()
			this.match(pathname)
		})

		Dispatcher.on('initStateChange', (/*currentStatus*/) => {})

		Dispatcher.on('newPageReady', (/*currentStatus, oldStatus, container, newContainer*/) => {})

		Dispatcher.on('transitionCompleted', (/*currentStatus, prevStatus*/) => {
			if(this.clicked) {
				const { from, to } = HistoryManager.routes
				loader.unmount()
					.beforeEnter(from, to)
					.update(this.container, false)
					.globals()
					.afterEnter(from, to)
			}
		})
	}
}