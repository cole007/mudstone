import Base from '../core'

export class A extends Base {
	constructor(el) {
		super(el)
		log('init A')
	}

	destroy() {
		log('destroy A')
	}

	mounted() {
		log('mount A')
	}
}