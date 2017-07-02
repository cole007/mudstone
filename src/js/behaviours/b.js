import Base from '../core'

export class B extends Base {
	constructor(el) {
		super(el, 'B')
		log('init B')
	}

	mounted() {}
}