import Base from '../core'

// use the unmount() method to remove any events, 
// kill plugins etc
export class C extends Base {
	constructor(el) {
		super(el, 'C')
		log('init C')
	}

	mounted() {}

	unmount() {
		log('Unmount happened to C')
	}
}