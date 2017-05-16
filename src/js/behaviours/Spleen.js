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

	onLeave(resolve) {
		log('onLeave')
		setTimeout(() => {
			log('spleen')
			resolve()
		}, 5000)
	}
}