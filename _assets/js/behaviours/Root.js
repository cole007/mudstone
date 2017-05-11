import Base from '../helpers/base'

export class Root extends Base {
	constructor(document) {
		super(document, 'root')
		log('hi')
	}

	events = {
		'click button': 'pubes'
	}
	
	pubes(e) {
		e.preventDefault()

		this.listener.trigger('page:change')
	}

	onLeave() {
		return Promise((resolve) => {
			resolve()
		})
	}
}