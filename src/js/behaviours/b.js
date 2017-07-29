import Behaviour from '@/core'

// use the unmount() method to remove any events, 
// kill plugins etc
export class B extends Behaviour {
	constructor(el) {
		super(el, 'B')
		log('init B')
	}

	mounted() {}

	// unmount() {
	// 	log('Unmount happened to B')
	// }
}