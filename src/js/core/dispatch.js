import Listener from '../core/listener'
import { Dispatcher, Pjax } from 'barba.js'

export default class DispatchManager {
	constructor() {
		this.listener = new Listener()
		this.clicked = false
		this.container = document.querySelector(`.${Pjax.Dom.containerClass}`)
		log('DispatchManager')
	}

	mount(loader) {
		Dispatcher.on('linkClicked', (HTMLElement, MouseEvent) => {
			this.clicked = true
			//log(HTMLElement, MouseEvent)
		})

		Dispatcher.on('initStateChange', (currentStatus) => {
			//log(currentStatus)
		})

		Dispatcher.on('newPageReady', (currentStatus, oldStatus, container) => {
			this.clicked && loader.unmount()
			//log(currentStatus, oldStatus, container)
		})

		Dispatcher.on('transitionCompleted', (currentStatus, prevStatus) => {
			this.clicked && loader.start(this.container, false).globals()
			//log(currentStatus, prevStatus)
		})
	}
}