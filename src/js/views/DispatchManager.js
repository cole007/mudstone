import Listener from '../core/listener'
import { Dispatcher } from 'barba.js'

export default class DispatchManager {
	constructor() {
		this.listener = new Listener()
		log('DispatchManager')
	}

	boot() {
		// Dispatcher.on('linkClicked', (HTMLElement, MouseEvent) => {
		// 	log(HTMLElement, MouseEvent)
		// })

		// Dispatcher.on('initStateChange', (currentStatus) => {
		// 	log(currentStatus)
		// })

		// Dispatcher.on('newPageReady', (currentStatus, oldStatus, container) => {
		// 	log(currentStatus, oldStatus, container)
		// })

		// Dispatcher.on('transitionCompleted', (currentStatus, prevStatus) => {
		// 	log(currentStatus, prevStatus)
		// })
	}


	mount(loader) {
		this.loader = loader
		this.boot()
	}
}