import Base from '../core'

export class B extends Base {
	constructor(el) {
		super(el)
		log('init B')
	}

	destroy() {
		log('destroy B')
	}

	mounted() {
		log('mount B')
	}
}