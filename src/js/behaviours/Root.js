import Base from '../core'

export class Root extends Base {
	constructor(document) {
		super(document, 'root')
	}

	events = {
		'click button': 'onClick'
	}
	
	onClick(e) {
		e.preventDefault()
	}


	onBeforeEnter() {
		log('onBeforeEnter: root')
	}

	onAfterEnter() {
		log('onAfterEnter: root')
	}

	onBeforeLeave(from, to, resolve) {
		setTimeout(() => {
			log('onBeforeLeave: root')
			resolve()
		}, 1000)
	}

	onAfterLeave(from, to, resolve) {
		setTimeout(() => {
			log('onAfterLeave: root')
			resolve()
		}, 1000)
	}
}