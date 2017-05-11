import Base from '../helpers/base'

export class Test extends Base {
	constructor(document) {
		super(document, 'test')
	}

	events = {
		'click .site-logo': 'pubes'
	}
	
	pubes(e) {
		e.preventDefault()
		log('logo', this)
	}
}