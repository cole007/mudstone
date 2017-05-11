import Base from '../helpers/base'

export class Spleen extends Base {
	constructor(document) {
		super(document, 'spleen')
	}

	events = {
		'click .menu-btn':  function(e) {
			e.preventDefault()
			log('menu', this)
		}
	}
}