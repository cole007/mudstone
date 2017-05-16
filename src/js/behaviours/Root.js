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

		this.listener.trigger('page:change')
	}


	onLeave(resolve) {
		log('onLeave root')
		setTimeout(() => {
			log('Resolved root')
			resolve()
		}, 5000)
	}
}