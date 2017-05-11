import Base from '../core'

export class Root extends Base {
	constructor(document) {
		super(document, 'root')
		log('hi')
	}

	events = {
		'click button': 'onClick'
	}
	
	onClick(e) {
		e.preventDefault()

		this.listener.trigger('page:change')
	}

	onLeave(resolve) {
		resolve()
	}
}