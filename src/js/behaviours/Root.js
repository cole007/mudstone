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
		log('onLeave')
		setTimeout(() => {
			log('r')
			resolve()
		}, 5000)
	}
}