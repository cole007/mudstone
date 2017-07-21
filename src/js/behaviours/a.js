import Base from '../core'

// use the unmount() method to remove any events, 
// kill plugins etc
export class A extends Base {
	constructor(el) {
		super(el, 'A')
		log('init A')
	}

	mounted() {}

	unmount() {
		log('Unmount happened to A')
	}
}