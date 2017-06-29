import Base from '../core'

export class C extends Base {
	constructor(el) {
		super(el, 'C')
		log('init C')
	}

	mounted() {}
}