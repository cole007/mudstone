import Base from '../core'

export class C extends Base {
	constructor(el) {
		super(el)
		log('init C')
	}

	destroy() {
		log('destroy C')
	}

	mounted() {
		log('mount C')
	}
}