import Base from '../core'

export class A extends Base {
	constructor(el) {
		super(el, 'A')
		log('init A')
	}

	mounted() {}
}