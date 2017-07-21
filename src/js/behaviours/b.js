import Base from '../core'

// use the unmount() method to remove any events, 
// kill plugins etc
export class B extends Base {
	constructor(el) {
		super(el, 'B')
		log('init B')
	}

	mounted() {}

	unmount() {
		log('Unmount happened to B')
	}
}