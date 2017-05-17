import Base from '../core'

export class Spleen extends Base {
	constructor(document) {
		super(document, 'spleen')
	}

	events = {
		'click .menu-btn':  (e, elm) => {
			e.preventDefault()
			log('menu', this, elm)
		}
	}

	onBeforeEnter() {
		log('onBeforeEnter: spleen')
	}

	onAfterEnter() {
		log('onAfterEnter: spleen')
	}

	onBeforeLeave(from, to, resolve) {
		setTimeout(() => {
			log('onBeforeLeave: spleen')
			resolve()
		}, 1000)
	}

	onAfterLeave(from, to, resolve) {
		setTimeout(() => {
			log('onAfterLeave: spleen')
			resolve()
		}, 1000)
	}
}