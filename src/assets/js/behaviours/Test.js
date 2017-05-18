import Base from '../core'

export class Test extends Base {
	constructor(document) {
		super(document, 'test')
	}

	events = {
		'click .site-logo': 'onClick'
	}
	
	onClick(e, elm) {
		e.preventDefault()
		log('Test', this, elm)
	}
}